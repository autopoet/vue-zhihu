<p align="center">
  <img src="./src/assets/logo.svg" width="128" height="128" alt="CampusHub Logo" />
</p>

<h1 align="center">CampusHub</h1>

<p align="center">
  <strong>面向高校学子的竞赛组队与经验分享一站式极客平台</strong>
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

CampusHub 旨在建立一个去中心化的极客集结地。通过数字化的实力展示与透明的组队机制，它打破了传统贴吧、群聊等低效的信息分发模式。我希望通过这个平台，让每一次竞赛组队不再是低效率的“随机抽样”，而是基于技术深度与互补性的精准碰撞。

## 核心亮点

### modular Bento 布局体系
摒弃了臃肿的第三方 UI 组件库，自主实现了一套符合现代极客审美的 Bento Layout 容器。通过模块化的数据面板设计，在保障高度交互性的同时，大幅压缩了 DOM 节点的冗余度，实现了轻量级与表现力的平衡。

### 多线程数据处理引擎
为应对复杂且高频的年度活跃度矩阵运算，系统集成了独立的 Web Worker 哨兵模块。通过将聚类算法、数据清洗等计算密集型任务移出 UI 主线程，从物理层面隔离了逻辑运算对视觉渲染的干扰，确保在任何极低性能设备下依然能提供流畅的滚动与反馈体验。

### 主题感知与 UI Token 体系
开发了一套完整的全局主题感知引擎。基于 CSS 原生变量驱动的 UI Token 系统，不仅支持毫秒级的暗色/亮色模式平滑切换，更通过监听系统层级的颜色偏好实现自适应调节。结合自定义的 Glassmorphism 2.0 视觉层，为用户提供了沉浸式的跨平台交互体验。

### 叙事性极客档案
不同于传统枯燥的静态个人主页，本项目通过“成长内核”时间轴与“动态荣誉勋章墙”构建了一套完整的技术成长叙事系统。它通过可视化的方式展示用户的技术进化路径，更直观地向潜在队友或用人单位展示核心竞争力。

## 技术矩阵

- 核心框架: Vue 3.5+ (Composition API)
- 状态管理: Pinia
- 逻辑异步: Web Workers API
- 构建加速: Vite 6.x
- 动画驱动: CSS View Transitions & Transition Group
- 视觉风格: Glassmorphism 2.0 & Bento Design

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
