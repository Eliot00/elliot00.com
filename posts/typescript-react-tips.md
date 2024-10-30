---
title: "关于TypeScript结合React开发的一些技巧"
tags: ["React", "TypeScript"]
series: "随笔"
createdAt: "2022-03-12T08:11:20.213926+00:00"
publishedAt: "2022-03-19T11:15:36.359039+00:00"
updatedAt: "2024-10-30T17:04:29.174052+08:00"
summary: "这篇文章介绍了作者在前端项目中使用 TypeScript 与 React 的一些经验。文章首先推荐使用 TypeScript 的自动推断功能，这样可以减少一些类型标注的工作。然后介绍了一些 TypeScript 的工具类型，如 Omit 和 Pick，这些工具类型可以帮助我们重用类型定义，避免重复工作。接着，文章讨论了在 TypeScript 中引入不明确性的问题，并推荐使用 declare 全局声明和声明合并来解决这个问题。此外，文章还介绍了 useRef 的类型，以及如何使用类型收窄和条件渲染来实现更简洁的代码。最后，文章给出了如何解决项目中大量的条件渲染问题的一些建议，例如使用组件工厂或组合。"
---

TypeScript是JavaScript的超集，为JS带来了静态类型支持，这可以帮助我们写出更清晰可靠的接口，带来更好的IDE提示。在前端项目中使用TypeScript与React的组合已经有一段时间了，是时候写一篇博客总结分享一下。下面就列举一些个人觉得在做项目中有帮助的点。

## 利用自动推断

`TypeScript`具有一定的推断类型的能力，一些情况下可以让程序员偷个懒，少写点类型。

```typescript
// 无需标注变量类型
const foo = '123' // string
const bar = 123 // number
const baz = str.match(/[A-Z]/) // RefExpMatchArray | null
```

将箭头函数传递给组件props时，如果props具有类型，箭头函数就不需要标注类型:

```tsx
type FieldProps = {
  onChange: (value: number) => void
}

<Field onChange={value => setValue(value)} />
```

另外，千万不要忘记TS/JS中**函数可是一等公民**，例如需要写一个给数字隔三位加上分隔符的函数，发现有一个`Intl`模块可以帮上忙：

```typescript
// 并不需要这要做
function numberWithDelimiter(raw: number): string {
  return new Intl.NumberFormat('en-US').format(raw)
}

// 只要一个简单的赋值就行，numberWithDelimiter类型与format方法完全一致
const numberWithDelimiter = new Intl.NumberFormat('en-US').format
```

## 工具类型

如果在项目中引用了一些第三方组件，在所有使用的地方有一些共同的属性，例如`<Input type="number" .../>`，所有的`type`都要固定为number，我们一般要抽取一个组件出来：

```tsx
type MyInputProps = {
  value: number
  onChange: (value: number) => void
}

const MyInput: React.FC<MyInputProps> = props => {
  return <Input type="number {...props} />
}
```

这在本质上就是写一个*偏函数*，但是如果引用的第三方库有完备的类型声明，这样写就把第三方库原有的类型重写了一遍，可以这样声明组件props类型来节省代码：

```typescript
import type { InputProps } from 'lib'

type MyInputProps = Omit<InputProps, "type">
```

`Omit`是TS的一个**工具类型**，作用就像其名称显示地那样，从一个类型中，剔除一些属性。在上述例子里，使用Omit避免了重复声明第三方已有的类型。TS还有很多有用的[工具类型](https://www.typescriptlang.org/docs/handbook/utility-types.html)，如`Pick`从已有类型中提取部分属性组成新类型，`NonNullable`剔除`null`与`undefined`，`Parameters`和`ReturnType`获取函数参数与返回值类型等，可以根据需要灵活运用。


## 适当引入一些不明确性

> Explicit is better than implicit.

以上这句话出自*The Zen of Python*，那具体什么是`explicit`什么是`implicit`呢？以`Ant Design Pro`为例，其提供了一种注入全局变量的功能：

```typescript
export default defineConfig({
  define: {
    API_URL: 'https://api-test.xxx.com', // API地址
    API_SECRET_KEY: 'XXXXXXXXXXXXXXXX', // API调用密钥
  },
});
```

这样定义的变量无需`import`就可以直接使用，如果团队所有开发者都熟悉这个特性倒也没事，但是如果团队加入了新成员，看到某处代码使用了这种全局变量并且IDE还无法跳转到定义处，想必是要怀疑人生了。相比之下我更喜欢在需要处明确声明要引入的内容。

但是，在`TypeScript`也存在一些可以容忍的不明确的性质。

### declare全局声明

在`TypeScript`发展的早期，很多流行的库都是仅使用`JavaScript`而没有类型声明的，当时就出现了"d.ts"为后缀的类型定义文件，可以为JS代码增加类型。TS自身就带了一些声明文件，如浏览器全局对象`window`的声明：

```typescript
// typescript/lib/lib.dom.d.ts
declare var window: Window & typeof globalThis;
```

这个也可以用于为自己的代码声明类型，我习惯这样使用：

```typescript
// API.d.ts
declare namespace API {
  export type Production = {
    ...
  }
}

// 需要使用的地方无需import
function getProduction(): API.Production
```

虽然没有明确的import，但是IDE的跳转定义可以正常工作，并且由于只是类型定义，不至于产生意想不到的运行时错误，省去一个import语句我觉得是利大于弊的。可以将所有的接口响应值都封装在一个模块里，如果后端使用了`OpenAPI`这类工具，还可以借助一些像[openapi-typescript](https://www.npmjs.com/package/openapi-typescript)这样的插件直接为接口导出一份类型文件。

### 声明合并

通常我更乐意用`type`来声明类型，但有时`interface`一个比较“脏”的特性却可以派上用场。

```typescript
interface User {
  name: string
}

interface User {
  age: number
}

// 同名是合法的，同名interface会被合并，等价于
interface User {
  name: string
  age: number
}
```

`interface`的这个特性，与[module augmentation](https://www.typescriptlang.org/docs/handbook/declaration-merging.html#module-augmentation)功能一起，可以帮助库开发者为用户提供更好的可扩展性。例如[MUI](https://mui.com)要自定义主题配置：

```tsx
import * as React from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Button from '@mui/material/Button';

const theme = createTheme({
  palette: {
    neutral: {
      main: '#64748B',
      contrastText: '#fff',
    },
  },
});

declare module '@mui/material/styles' {
  interface Palette {
    neutral: Palette['primary'];
  }

  // allow configuration using `createTheme`
  interface PaletteOptions {
    neutral?: PaletteOptions['primary'];
  }
}

// Update the Button's color prop options
declare module '@mui/material/Button' {
  interface ButtonPropsColorOverrides {
    neutral: true;
  }
}

export default function CustomColor() {
  return (
    <ThemeProvider theme={theme}>
      <Button color="neutral" variant="contained">
        neutral
      </Button>
    </ThemeProvider>
  );
}
```

这样就扩充了MUI原有的类型定义，`neutral`成了合法的`color`值。

## useRef的类型

`useRef`在React的文档中描述为：

> useRef 返回一个可变的 ref 对象，其 .current属性被初始化为传入的参数（initialValue）。返回的 ref 对象在组件的整个生命周期内持续存在。

`useRef`或`createRef`常被误解为用于获取子组件的DOM节点，但其实它的参数可以是任意对象，由于即使组件重新渲染，`useRef`返回的ref对象保存的也仍然是对同一个对象的引用，所以可以用来处理一些复杂的闭包场景。

当`TypeScript`与`useRef`结合到一起，如果尝试给其返回对象的current赋值，有时会出现一个难以理解的类型错误：`Cannot assign to current because it is a read-only.`，这就很奇怪了，为什么current是不可变的？

值得一提的是，React本身在开发环境是有类型检查的，但是用的不是`TypeScript`，而是Facebook自家的`FlowJS`。查看`useRef`的[源码](https://github.com/facebook/react/blob/42f15b324f50d0fd98322c21646ac3013e30344a/packages/react/src/ReactHooks.js#L96)，它的类型就是一个普通的泛型函数：`T => { current: T }`，但是我们开发React应用时是用到`TypeScript`做静态类型检查的，实际上依赖了`@types/react`这个库，查看源码，可以发现在这里`useRef`确实用到了重载：

```typescript
function useRef<T>(initialValue: T): MutableRefObject<T>;
function useRef<T>(initialValue: T|null): RefObject<T>;
function useRef<T = undefined>(): MutableRefObject<T | undefined>;
```

从类型名称大概可以看出来了，如果返回值是`MutableRefObject<T>`应该是不会报错的，事实也确实如此。`RefObject`内的`current`属性是`readonly`的。要避免这个错误，可以这样使用`useRef`：

```typescript
const ref = useRef<number | null>(null);
```

如果使用`useRef<sometype>(null)`，那么`sometype`就匹配上了泛型`T`，参数与`T | null`匹配，整个调用就匹配上了`useRef<T>(initialValue: T | null): RefObject<T>`，而如果使用`useRef<sometype | null>(null)`，那么就是联合类型`sometype | null`匹配上泛型参数`T`，参数`initialValue`也就是`T`类型，函数调用就匹配上了`useRef<T>(initialValue: T): MutableRefObject<T>`。在`Rust`社区里，有时候我们把这叫做*「类型配平」*，这种操作确实有点像化学方程式配平:)

**题外话**: 这个[issue](https://github.com/DefinitelyTyped/DefinitelyTyped/issues/31065)里包含了有关`@types/react`为什么要这样标注`useRef`类型的讨论。

## 类型收窄与条件渲染

`类型收窄`这个名词也许不是很常见，但是很可能你已经在不知不觉中使用过，最常见的应该是这样一个非空判断：

```tsx
function Foo() {
  const data: string[] | undefined = useRequest()

  if (!data) {
    // data: undefined
    return 'Not found'
  }
  // data: string[]

  return (
    <ul>
      {data.map(item => <li key={item}>{item}</li>)}
    </ul>
  )
}
```

`data`原本的类型是`string[] | undefined`，这是一个联合类型，但进入`if`分支，data的类型就只是`undefined`，类型变“窄”了，由于在这个分支内最终使用了`return`，离开这个分支后，`data`的类型变成了`string[]`，可以放心的使用`map`方法。类型收窄通常是很直观的，比如在上面的例子里，如果程序会执行到`if (!data)`分支内，那么`data`必然不可能是`string[]`类型；同样地，进入`if`分支后就直接`return`，那么如果`data`是`undefined`，必然不会执行后续代码，反之可知在`if`之后的`data`就一定是`string[]`类型了。像`instanceof`、`in`、`switch`等操作都可以将类型由较宽泛的收缩到较窄的。另外，如果`if`分支内没有`return`，那么`data`的类型只在`if`语句块内收窄，后面就不能安全地使用`map`了，在这里只有`return`将函数返回，才算杜绝了后续`data`类型为`null`的可能，同理，如果用`throw`抛出异常也能让分支后的`data`类型收窄。

只是举个这样的例子，可能会让人感觉类型收窄似乎是个很多余的概念，即使是使用`JavaScript`不也一样是这么判断是否为空嘛，其实相比之下，`TypeScript`的类型收窄还是带来了一些好处的，首先它保证了静态的类型检查，不能使用当前类型上没有的方法，同时也提供了较好的IDE自动补全支持，在例子中最后的`data`类型被推断为`string[]`，IDE可以自动补全相关的`map`方法，`map`的回调函数参数`item`也会被相应地推断为`string`类型，可以放心对其使用`startWith`等原型方法。

接下来看看一个更接近真实项目代码的例子，现在有一个租房系统的后台应用，页面固定布局如图：

![layout](https://elliot-blog.oss-cn-shanghai.aliyuncs.com/layout.drawio.png)

但是在业务流程中，有三种登录角色，分别是Admin、Landlord、Tenant，理所当然这三种角色登录后台后看到的UI细节并不相同。

```typescript
// 假设这是后端的数据模型
type Admin = {
  id: number
  email: string
  password: string
}

type Landlord = {
  id: number
  name?: string
  email: string
  password: string
  avatar?: string
}

type Tenant = {
  id: number
  name?: string
  email: string
  password: string
  avatar?: string
  phoneNumber: string
}

// 获取当前登录用户
type User = Admin | Landlord | Tenant
function currentUser(): User {
}
```

在前端如何方便的根据不同角色渲染不同内容呢？可以为每个角色类型加上一个*标签*：

```tsx
type Admin = {
  ...
  role: 'Admin'
}

type Landlord = {
  ...
  role: 'Landlord'
}

type Tenant = {
  ...
  role: 'Tenant'
}

const Header: React.FC = () => {
  const user = useUser() // type: User

  switch (user.role) {
    case 'Tenant':
      // 合法，此处user类型收窄为Tenant
      return <div>{user.phoneNumber}</div>
    case 'Landlord':
      return ...
    case 'Admin':
      return ...
    default:
      const exhausted: never = user
      return null
  }
}
```

这里的`role`并不是字符串类型，而是一个*字面量类型*，在`switch`语句里，这样一个附加字段就可以帮助我们将`User`类型收窄到更加具体的类型，从而根据角色改变组件的渲染。

在最后我用了一个`const exhausted: never = user`，这是一个小技巧，我之前[有篇博客](https://elliot00.com/posts/typescript-mutex-param)提到用`never`来实现互斥参数，`never`在TS里是`bottom type`，为了节省篇幅简单点说就是除了`never`自身外任何值都不能赋值给`never`，由于前面所有的`case`已经包含了`user`所有可能的情况并且都还有`return`，所以`default`内的代码不会被执行，`user`的类型在这里被收窄为`never`类型，这时候这个赋值是合法的。但是如果有人添加了一种新的角色类型`CustomerService`到联合类型`User`上，`user`就不能被收窄到`never`类型，这里就会产生一个类型错误，提示需要在`switch`语句中添加`case`以包含所有情况。这样就可以达到*穷尽性检查*的目的。

## 如何解决太多的条件渲染

要是项目里有很多

```typescript
user?.role === 'Admin' ? (user.status === 'active' ? <Component1 /> : <Comp2 />) : null
```

这样的代码，在多人维护的情况下很可能出现越来越多的重复判断、嵌套判断，这样的代码会让人阅读起来很头疼，维护起来更加头疼。如果一个项目里存在大量的条件渲染，如何保持代码的整洁呢？

### 组件工厂？

```tsx
// 在接口上定义组件类型
interface User {
  Toolbar: React.FC
}

function Page() {
  const user = userUser()

  return (
    <Layout toolbar={<user.Toolbar />}>
      <Main />
    </Layout>
  )
}
```

### 组合？

也许有时候我们并不需要在所有地方都判断状态，例如这个用户角色的问题，可以将这个状态与路由绑定，将页面组件拆分成很多个小部件：

```tsx
type ContainerProps = {
  navbar: React.ReactNode
  extra?: React.ReactNode
}

const Container: React.FC<ContainerProps> = ({ navbar, extra, children }) => {
  return (
    <>
      <Header>
        {navbar}
        {extra}
      </Header>
      <Body>{children}</Body>
      <Footer />
    </>

// Admin page
<Container navbar={<AdminNavbar />} extra={<OnlyAdmin />}>
  <Main />
</Container>

// Landlord page
<Container navbar={<LandlordNavbar />}>
  <Landlord />
</Container>
```

在路由组件中我们根据角色将渲染不同的页面组件，这些组件中相同的地方可以提取到一个公共的容器，将有差异的地方通过`props`传递，某些页面独有的元素可以定义成可选属性，`undefined`和`null`都是合法的JSX元素，但是不会被渲染。我个人更喜欢这样声明式的写法。

## 非空断言操作符

> 更新于2024/10/30

如果有时因为一些第三方库的限制，出现某个值类型可能为空，但在业务上可以保证其不会为空的情况，可以使用非空断言操作符来简化代码：

```typescript
validate(data) // data不会为空，但类型仍为string | null

// 不用非空断言操作符的情况
useData(data as string)

// 使用非空断言操作符 `!`
useData(data!)

// 也可以与点操作符结合
data!.title
```
