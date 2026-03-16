<p align="center">
  <img src="./src/assets/logo.svg" width="128" height="128" alt="CampusHub Logo" />
</p>

<h1 align="center">校赛通 — 高校开发者竞赛组队与协作平台</h1>

<p align="center">
  <strong>面向高校学子的竞赛组队与经验分享一站式交流平台</strong>
</p>

<p align="center">
  <a href="https://vuejs.org/">
    <img src="https://img.shields.io/badge/Vue-3.5+-42b883?style=for-the-badge&logo=vue.js" alt="Vue 3" />
  </a>
  <a href="https://vitejs.dev/">
    <img src="https://img.shields.io/badge/Vite-6.x-646cff?style=for-the-badge&logo=vite" alt="Vite" />
  </a>
  <a href="https://pinia.vuejs.org/">
    <img src="https://img.shields.io/badge/Pinia-Latest-ffe467?style=for-the-badge&logo=pinia" alt="Pinia" />
  </a>
</p>

---

## 为什么发起这个项目？

在大学校园中，真正的技术人才往往散落在各个角落。我们常面临“技术孤岛”的困局：开发者找不到能理解产品的设计者，而竞赛新手不知该去何处寻找可靠的成长路径。

CampusHub 旨在建立一个去中心化的技术爱好者集结地。通过数字化的实力展示与透明的组队机制，它打破了传统贴吧、群聊等低效的信息分发模式。我希望通过这个平台，让每一次竞赛组队不再是低效率的“随机抽样”，而是基于技术深度与互补性的精准碰撞。

## 项目实现过程

这个项目对我来说不仅是一个工具，更是一个练手前端新技术的实验场。在开发过程中，我遇到了不少坑，也因此学到了很多：

### 1. 从 ECharts 到自研 Bento 布局

最开始我想用 ECharts 做一个花哨的雷达图来展示能力，但在实现过程中发现三方库虽然强大，但样式很难完全按照我的想法定制，而且为了这么一个功能引入一个巨大的库有点“杀鸡焉用宰牛刀”。
于是我决定**弃用 ECharts**，转而利用原生 CSS Grid 和 Flexbox 布局实现了一套 **Bento Layout (便当盒布局)**。这样不仅页面更轻量级，视觉上也更有那种现代感和模块化的美感。

### 2. 为什么非要用 Web Worker？

在做个人主页那个“活跃矩阵”（类似 GitHub 绿格子）时，我写了一个循环来生成并处理一整年 300 多天的数据。虽然现代浏览器很快，但在主线程处理这么多逻辑时，还是能感觉到页面切换有一瞬间的卡顿。
为了解决这个“不爽”的点，我专门去学了 **Web Worker**。现在，这些复杂的随机数据生成和清洗逻辑都被丢到了独立线程，主线程只负责渲染。虽然数据量还没到千万级，但这种“物理隔离”带来的丝滑感让我很着迷。

### 3. 精致的暗色模式体验

我不想做一个只是简单黑白反转的“夜间模式”。我参考了 GitHub 和一些优秀开源项目的色彩体系，搞了一套基于 CSS 原生变量（CSS Variables）驱动的 **UI Token 系统**。
我通过监听 `prefers-color-scheme` 实现了自动跟随系统主题，并且给玻璃拟物（Glassmorphism）效果做了多层叠加优化，确保在深色模式下页面依然有不错的层级感和透明度效果。

### 4. 状态管理的进化

项目初期我是用最基础的组件传参（Props & Emits），但随着页面变多（比如用户信息在 Header、侧边栏和设置页都要同步），维护起来简直是灾难。这也是我决定系统学习并引入 **Pinia** 的契机。现在，登录状态和全局通知逻辑都变得清爽多了。

## 我的技术清单

* **框架核心**: Vue 3.5 (用了最新的 Composition API，代码写起来顺滑多了)
* **状态管理**: Pinia (解决多页面同步用户数据的痛点)
* **性能黑科技**: Web Workers API (把耗时的数据处理丢到后台)
* **工程化**: Vite 6.0 + pnpm (速度真的很快)
* **动效**: CSS View Transitions (实现页面切换时的那种高级原生感)
* **视觉风格**: 原生 CSS + 玻璃拟物 + 模块化 Bento 设计

## 项目结构

```bash
├── src/
│   ├── api/            # 接口请求封装
│   ├── assets/         # 静态资源、Logo 与样式变量
│   ├── components/     # 核心 Bento 模块与可复用组件
│   ├── layouts/        # 多套主题布局模式
│   ├── stores/         # Pinia 模块化状态
│   ├── views/          # 核心业务页面
│   └── workers/        # 高密集运算 Data Worker
├── public/             # 公共资源
└── package.json        # 项目依赖与运行脚本
```

## 开发启动

```bash
# 获取集结号
git clone https://github.com/autopoet/campushub.git

# 装备依赖
pnpm install

# 核心同步
pnpm dev
```

---

<p align="center">
  保持热爱，持续进化。
</p>
