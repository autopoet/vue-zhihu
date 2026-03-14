# CampusHub

<p align="center">
  <img src="https://api.dicebear.com/7.x/notionists/svg?seed=Oliver&glassesProbability=100" width="120" height="120" alt="CampusHub Logo" style="border-radius: 50%; border: 4px solid #646cff;" />
</p>

<p align="center">
  <strong>面向高校学子的竞赛组队与经验分享一站式极客平台</strong>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Vue-3.5+-42b883?style=for-the-badge&logo=vue.js" alt="Vue 3" />
  <img src="https://img.shields.io/badge/Vite-6.x-646cff?style=for-the-badge&logo=vite" alt="Vite" />
  <img src="https://img.shields.io/badge/Pinia-Latest-ffe467?style=for-the-badge&logo=pinia" alt="Pinia" />
  <img src="https://img.shields.io/badge/Tailwind-UI-38bdf8?style=for-the-badge&logo=tailwindcss" alt="Tailwind" />
</p>

---

## 项目愿景

**CampusHub** 不仅仅是一个简单的网页，它是一个专为高校极客打造的**数字化指挥中心**。我们旨在通过极致的交互设计与底层性能优化，打破校园内的技术信息孤岛，连接每一个有志于挑战竞赛、打磨产品的灵魂。

## 核心黑科技 (Technical Highlights)

- **玻璃拟态 UI (Glassmorphism & Bento Design)**：全站采用深层次的玻璃拟态设计，个人中心引入创新的 **Bento Grid**（便签盒布局）看板，告别传统的生硬列表，提供沉浸式的数据可视化体验。
- **Web Worker 性能怪兽**：针对耗时的密集型数据计算（如活跃热力矩阵渲染），通过独立的 **Web Worker** 线程异步处理，确保 UI 渲染始终维持在 60FPS。
- **极客进化论 (Evolution System)**：创新的“个人身份”成长系统。采用 **Notionists** 风格的简约视觉形象，配合“成长内核”时间轴与“荣誉勋章墙”，记录每一位极客的进化轨迹。
- **响应式暗黑模式**：内置精准的主题感知引擎，通过 `MutationObserver` 监控系统/用户偏好，实现无刷新、无闪烁的全局主题丝滑切换。
- **极致轻量化**：摒弃繁重的第三方图表库，采用**纯 CSS 驱动**的动态进度条与数据看板，大幅减少首屏加载体积。

## 技术栈矩阵

| 维度 | 技术方案 |
| --- | --- |
| **核心框架** | Vue 3.5+ (Composition API + `<script setup>`) |
| **状态中心** | Pinia (模块化持久化存储) |
| **布局引擎** | Vite 6.x + 响应式 Grid/Flex 现代布局 |
| **动效方案** | CSS Cubic-Bezier 贝塞尔曲线 + Transition API |
| **离线计算** | JavaScript Web Workers API |
| **设计语言** | Glassmorphism 2.0 + Design Tokens |

## 快速启动

### 1. 环境准备

- **Node.js**: >= 20.x
- **Package Manager**: pnpm (推荐)

### 2. 获取代码并安装

```bash
git clone https://github.com/your-username/campushub.git
cd campushub
pnpm install
```

### 3. 开发环境运行

```bash
pnpm dev
```

## 项目模块概览

```text
src/
├── components/
│   ├── layout/     # 全局 MainLayout 容器与主题感知引擎
│   └── ui/         # GeekToast 全局通知、骨架屏、Bento 卡片
├── views/
│   ├── profile/    # 极客档案中心 (雷达废除，Bento 接管)
│   ├── recruit/    # 招募大厅 (流式渲染列表)
│   └── detail/     # 内容详情 (类型驱动路由 & ID 映射缓存)
├── workers/        # 离线数据处理器 (CPU Bound Task)
└── stores/         # 用户状态与持久化配置
```

---

## 开源协议

MIT License. Designed with ❤️ for the Geek Community.
