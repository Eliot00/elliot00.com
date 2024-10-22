---
title: "给tauri做条件编译实现真全平台"
tags: ["前端", "JavaScript"]
series: "奇技淫巧"
createdAt: "2024-04-15T02:00:03.917491+00:00"
publishedAt: "2024-04-15T03:03:00.339568+00:00"
summary: "本文讲述了作者使用 unplugin-preprocessor-directives 插件解决了 Tauri 应用在特定硬件上无法启动以及跨平台打包问题。"
---

为了实现用Org文档来写公众号，我用Rust的tauri框架写了一个[Webview应用](https://github.com/Eliot00/mp-org)。本来这个简单的功能可以直接用网页来实现，但是当时我手头上没有服务器，正好也想试试tauri，于是就做成了使用webview的桌面应用。但是最近有用户发现在Apple M3 Max芯片上，这个本应该跨平台的webview应用无法启动。这种特定硬件上才有的问题实在是难以调试，转念一想，原本这个程序大部分代码就在前端，是不是可以打包出一份纯网页应用，这样就可以让无法使用桌面版的用户用网页版了。

tauri有一个`command`机制用于前端调用Rust，我的应用里有两处使用了这个机制去读取用户本地的文件，如果单独将现有的前端代码打包成网页应用发布必然会在运行时报错。那么有没有可能在面向浏览器build的时候，将这部分代码替换掉？首先想到的是类似Rust的**条件编译**机制：

```rust
// The function is only included in the build when compiling for macOS
#[cfg(target_os = "macos")]
fn foo() {
  // 调用mac平台特定API
}

#[cfg(target_os = "windows")]
fn foo() {
  // 调用windows特定API
}
```

看上去有两个同名函数似乎编译器应该报错，实际上Rust编译器会在编译时根据cfg标记来决定编译哪一个函数，包括第三方包也可以通过标记决定是否引入，在面向Windows平台编译的产物里就不会包含和macOS有关的功能。

当然，JavaScript并不是编译型语言，但是现代的前端框架都会用到像`webpack`、`vite`的这样的构建工具，如tauri就默认使用了vite，那么有没有办法通过某个环境变量来控制vite，在tauri打包时包含调用Rust的代码，而在面向浏览器打包时去除它们？正当我在考虑是否要花点时间造轮子给vite写个插件的时候，意外发现已经有人想到过并且实现了[这个插件](https://github.com/KeJunMao/unplugin-preprocessor-directives)。

首先在原有的tauri项目里安装并配置：

```javascript
// vite.config.js
// pnpm add unplugin-preprocessor-directives -D

import PreprocessorDirectives from 'unplugin-preprocessor-directives/vite'

export default defineConfig({
  plugins: [
    PreprocessorDirectives({ /* options */ }),
  ],
})
```

接着修改前端代码：

```typescript
// 插件根据环境变量判断是否需要打包这段代码
// #if TARGET_PLATFORM == 'desktop'
import { invoke } from "@tauri-apps/api/tauri";
// #endif

export function setThemeById(id: string, callback: (theme: string) => void) {
  // #if TARGET_PLATFORM == 'desktop'
  invoke<string>("get_theme_content", { themeId: id }).then(callback);
  // #endif
}
```

这个插件还支持`else`和`elif`标记，具体使用很来还是很灵活的，这里就不过多演示了。

修改下`package.json`，为打包命令加上环境变量，建议安装`cross-env`，避免在Windows下出错：

```json
{
  "scripts": {
    "dev": "cross-env TARGET_PLATFORM=desktop vite",
    "build": "cross-env TARGET_PLATFORM=desktop tsc && vite build",
    ...
  }
}
```

由于tauri应用开发预览和打包实际用的命令是`pnpm tauri dev`和`pnpm tauri build`，所以可以把`pnpm dev`和`pnpm build`留给打包Web应用，修改`src-tauri`内的`tauri.config.json`：

```json
{
  "build": {
    "beforeDevCommand": "pnpm dev:desktop",
    "beforeBuildCommand": "pnpm build:desktop",
    "devPath": "http://localhost:1420",
    "distDir": "../dist"
  },
  ...
}
```

再更改`package.json`：

```json
{
  "scripts": {
    "dev:desktop": "cross-env TARGET_PLATFORM=desktop vite",
    "dev": "cross-env TARGET_PLATFORM=browser vite",
    "build:desktop": "cross-env TARGET_PLATFORM=desktop tsc && vite build",
    "build": "cross-env TARGET_PLATFORM=browser tsc && vite build",
    ...
  }
}
```

启动桌面端，功能没变，Web端也运行正常，搞定！

## 后记

才发现Vercel的免费账户支持200个免费项目，干脆把网页端部署到Vercel了，地址：https://mp-org.vercel.app/
