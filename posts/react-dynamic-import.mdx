---
title: "Ant Design Pro页面内切换组件问题"
tags: ["React"]
series: "随笔"
createdAt: "2020-09-12T03:59:22.374+00:00"
publishedAt: "2020-12-19T05:41:43.845714+00:00"
summary: "这篇文章主要讨论了在`Ant Design Pro`中使用`Tab`组件切换不同详情内容的实现方法。作者首先介绍了遇到的问题，然后提出了几种可能的解决方案，最终采用结合`React`的`Suspense`和`React.lazy`实现动态引入子组件的方法。文章还讨论了在工程实践中权衡项目进度与代码优化的重要性。"
---

## 目的

最近在项目中要使用`Ant Design Pro`，页面布局大致如图：

![layout](https://i.loli.net/2020/09/12/N8V6mHXoBpKTkfD.png)

在详情页中需要显示非常复杂的数据，想要的效果是点击主要内容区域的`tab`可以切换到对应的详情内容。

## 问题

我们在每个页面中都使用了框架提供的`PageHeaderWrapper`这个组件，如上图的*详情*，*规则*这两个`tab`，但是可能是因为我们使用的版本比较老，一直没搜到这个组件相关`API`的信息，只了解到可以通过向`PageHeaderWrapper`提供`tabList`这个`props`来显示`Tab`，`tabActiveKey`设置激活的`Tab`，同时有`onTabChange`这个回调。

现在点击切换`Tab`已经可以实现，但是**如何让内页面主要内容随着Tab切换而改变呢**？我对前端还不够熟悉，对`Ant Design Pro`的路由了解也不深，大概想到这么几个办法：

1. 在框架规定的`config.js`中配置路由，添加多个路由，Tab下包含Link，点击切换到对应页面
2. 维护一个`state`，不同的详情组件都放在`PageHeaderWrapper`中，切换Tab改变组件的`display`属性
3. 直接用`state`维护子组件，切换Tab改变`state`，实现子组件的切换

由于要切换显示的详情内容其实都来自同一个`API`一次提供的数据，如`cloth/1`，这里面可能包含了很复杂的数据，只是为了在视觉显示上区分开来，如果采用方法1,似乎就要有三个不同的页面，每个页面都要单独请求一次后端数据，方法2和3思路差不多，都是通过`state`来动态改变显示效果，但是总觉得实现起来不够优雅，会给后期维护带来麻烦。主要还是对前端了解不够深。

## 最终解决方案

参考了[一篇文章](https://tuohuang.info/ant-design-tab-navigation.html#.X1w9vnUzbeQ)，感觉我可以结合思路2、3与`React`的[Suspense](https://reactjs.org/docs/code-splitting.html#route-based-code-splitting)来做。

```jsx
import React, { Suspense } from 'react';

const OtherComponent = React.lazy(() => import('./OtherComponent'));

function MyComponent() {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <OtherComponent />
      </Suspense>
    </div>
  );
}
```

如上，可以借助`React.lazy`实现动态引入，并将这种*“懒加载”*的组件包裹在`Suspense`中渲染，最终我的实现方法大致如下：

```jsx
// 省略多余代码，将tab切换后的key值塞入state中
const handleTabChange = key => {
    this.setState({activeKey: key})
}

render() {
    // 省略
    const { activeKey } = this.state
    const Child = React.lazy(() => import(`./${activeKey}`))
    return (
    	<PageHeaderWrapper ......>
            <Suspense fallback={<div>Loading...</div>}>
            	<Child data={data} />
            </Suspense>
        </PageHeaderWrapper>
	)
}
```

以上是大致的实现，主要就是根据切换tab后的`key`值，动态引入对应的子组件并渲染。主要就是为了将不同的模块分离开，提高复用性吧。当然我的做法可能有问题，毕竟对`React`和`Ant Design Pro`了解还不够深入，权当抛砖引玉了。

## 思考

在实践的过程中，经常有可能只是要写个简单的功能，我们会随意写个函数，最终随着功能的复杂化，可能我们的代码量越来越大，有时候就会见到“超级文件”、“超级函数”这样的代码，给维护和复用带来很多困难。其实对于工程实践中的问题，我们常常听到很多名词，诸如面向对象、函数式编程、模块化编程、TDD，以及语言层面，例如`JavaScript`的超集`TypeScript`，`Python`中的类型注解，`Rust`的**所有权**等等，很多东西在项目前期往往看不到好处，反而让程序员觉得浪费时间，但是也许在后期这些东西能避免很多问题。但是也常有人说，不要**过早优化**，如何权衡或者说掌握好项目进度与代码优化的之间的平衡，这是个值得思考的问题。
