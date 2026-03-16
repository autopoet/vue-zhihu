<p align="center">
  <img src="./src/assets/logo.svg" width="128" height="128" alt="CampusHub Logo" />
</p>

<h1 align="center">校赛通 — 高校开发者竞赛组队与协作平台</h1>

<p align="center">
  <strong>高校竞赛组队与经验分享交流平台</strong>
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

在这个项目的开发过程中，我尝试将学习到的 Vue3 新特性应用到实际场景中，并针对一些开发中遇到的问题尝试了不同的解决方案：

### 1. 自研 Bento 布局替代三方库

初期曾考虑使用 ECharts 实现能力展示，但发现三方库的样式自定义成本较高，且会增加包体积。最终决定利用原生 **CSS Grid** 实现一套 **Bento Layout (便当盒布局)**，在保持页面轻量化的同时，实现了更自由的定制化效果。

### 2. 性能优化：Web Worker 异步计算

生成一整年的热力图数据比较耗时，直接在主线程跑会导致页面卡顿。我引入了 **Web Worker** 把这部分逻辑分流到后台处理，保证了 UI 操作的流畅。

### 3. 主题系统：原生 CSS 变量

没有用复杂的方案，直接基于 CSS 变量（Variables）构建主题颜色。配合 `prefers-color-scheme` 实现了自动切换，并微调了深色模式下的半透明视觉层级。

### 4. 状态管理从 Props 到 Pinia

随着项目规模扩大，多层级的组件通信导致维护成本大幅上升。通过引入 **Pinia** 统一管理用户信息和全局通知状态，规范了数据流向，解决了跨页面状态同步的问题。

## 我的技术清单

* **框架**: Vue 3.5 (Composition API)
* **状态管理**: Pinia (全局状态流)
* **性能**: Web Workers API (异步计算)
* **构建**: Vite 6.0 + pnpm
* **动效**: CSS View Transitions / Transition Group
* **视觉**: 模块化组件设计 + CSS 变量驱动

## 项目结构

```bash
├── src/
│   ├── api/            # 接口请求封装
│   ├── assets/         # 静态资源、Logo 与样式变量
│   ├── components/     # 核心组件
│   ├── layouts/        # 布局模式
│   ├── stores/         # 状态管理
│   ├── views/          # 业务页面
│   └── workers/        # 异步计算 Worker
├── public/             # 公共资源
└── package.json        # 项目配置
```

## 如何运行

```bash
# 获取代码
git clone https://github.com/autopoet/campushub.git

# 安装依赖
pnpm install

# 启动项目
pnpm dev
```

---

<p align="center">
CampusHub - 2026
</p>
