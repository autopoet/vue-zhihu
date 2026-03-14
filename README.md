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

在大学期间，我们常面临“信息不对称”的尴尬：你是写代码的顶级 Hacker，却找不到能把 PPT 讲出花的队友；你有满脑子的竞赛经验，却只能在过时的贴吧或零散的群聊里沉没。

**CampusHub** 的诞生就是为了打破这种僵局。我希望打造一个**属于大学生的数字化、极客化看板**，让每一位学子通过数据亮出实力，通过平台精准集结，让竞赛组队不再是“抽盲盒”，而是一场精准的技术碰撞。

## 核心亮点

- **进化的 Bento 仪表盘**：采用前沿的 Bento Layout 设计方案，将海量信息模块化，利用原生 CSS 实现轻量化交互，从根本上杜绝了第三方组件堆砌带来的首屏性能压力。
- **Web Worker 数据守候**：在复杂的竞赛热力图聚类运算中，建立独立的 **Web Worker** 数据哨兵，将繁重逻辑从 UI 主线程剥离。即便在处理大量年度活跃数据时，依然能保持丝滑的交互反馈。
- **全局动态感知引擎**：实现了一套基于本地持久化状态的主题引擎。通过 CSS 变量驱动的 UI Token 体系，支持毫秒级的亮暗切换过渡，并能自动感知操作系统的颜色偏好。
- **叙事化极客档案**：创新性地设计了“成长内核”时间轴与“荣誉勋章墙”，将传统的简历式展示转化为动态的“技术进化史”，极大增强了个人实力展示的叙事性与感染力。

## 技术矩阵

- **核心**: Vue 3.5+ (Composition API) & `<script setup>`
- **状态**: Pinia (模块化全局状态流域)
- **构建**: Vite 6.x (极致的 HMR 模块热加载体验)
- **底层**: JavaScript Web Workers API & CSS View Transitions
- **设计**: Glassmorphism 2.0 & Bento Design System

## 立即体验

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
