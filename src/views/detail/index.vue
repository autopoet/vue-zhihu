<script setup>
import { computed, reactive } from 'vue'
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()

// 获取路由中的 ID (通过 route.params.id)
const postId = computed(() => route.params.id)

// 返回上一页
const goBack = () => {
  router.back()
}

// 模拟的详情数据库 (使用 reactive 让内部状态变动可被监测)
const mockDb = reactive({
  '1': {
    title: 'Vue 3 的 Composition API 相比 Options API 有哪些优势？',
    author: '艾希',
    updatedTime: '2 小时前',
    isFavorite: false,
    isLiked: false,
    content: `
      <p>Composition API 是 Vue 3 的核心特性之一。它的出现主要是为了解决 Options API 在大型组件开发中的痛点。</p>
      <h3>1. 逻辑复用更简单</h3>
      <p>在 Options API 中，我们通常使用 mixins 来复用逻辑，但 mixins 存在命名冲突和来源不明的问题。Composition API 通过组合函数（Composables）让代码逻辑的拆解和复用变得非常直观。</p>
      <h3>2. 更好的代码组织</h3>
      <p>在一个大型组件里，属于同一个功能的代码（如搜索、分页）往往被拆散在 data、methods、computed 中。Composition API 允许你按功能组织代码，将相关的逻辑放在一起。</p>
    `,
    upvoteCount: 1540,
    commentCount: 89
  },
  '2': {
    title: '如何评价 2024 年的各种前端框架？',
    author: '开发者小王',
    updatedTime: '5 小时前',
    isFavorite: false,
    isLiked: false,
    content: `
      <p>前端框架的竞争已经进入了下半场，性能不再是唯一指标。现在的开发者更看重 DX（开发体验）、SSR（服务端渲染）的支持程度以及整个生态系统的成熟度。</p>
      <h3>React 的统治地位</h3>
      <p>React 依然凭借庞大的生态系统占据领先地位，特别是 Next.js 的流行让它几乎成了全栈开发的代名词。</p>
      <h3>Vue 的极致体验</h3>
      <p>Vue 3 的生态已经完全成熟，对于国内开发者来说，它的中文文档和更温和的学习曲线依然是巨大的优势。</p>
    `,
    upvoteCount: 856,
    commentCount: 42
  },
  '3': {
    title: '深入浅出 TypeScript 装饰器',
    author: '前端精选',
    updatedTime: '昨天',
    isFavorite: false,
    isLiked: false,
    content: `
      <p>装饰器是 TS 中一个非常强大的特性，虽然它还处于实验性阶段，但在很多框架（如 Nest.js）中已经被广泛使用。</p>
      <h3>装饰器的工作原理</h3>
      <p>它本质上是一个函数，可以注入到类、方法、属性上，在不修改原始代码的情况下增加额外的功能。</p>
    `,
    upvoteCount: 612,
    commentCount: 15
  }
})

// 根据当前 ID 从数据库中获取数据
const detailData = computed(() => {
  return mockDb[postId.value] || { title: '未找到内容', content: '<p>内容已失联...</p>', author: '未知', updatedTime: '未知' }
})

// 切换收藏状态
const toggleFavorite = (item) => {
  item.isFavorite = !item.isFavorite
}

// 切换喜欢状态
const toggleLike = (item) => {
  item.isLiked = !item.isLiked
}
</script>

<template>
  <div class="detail-container">
    <header class="detail-header">
      <button class="back-btn" @click="goBack">
        <svg viewBox="0 0 24 24" class="icon"><path fill="currentColor" d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"/></svg>
        返回
      </button>
    </header>

    <main class="detail-main">
      <h1 class="detail-title">{{ detailData.title }}</h1>

      <div class="author-info">
        <div class="avatar"></div>
        <div class="meta">
          <span class="author-name">{{ detailData.author }}</span>
          <span class="time">发布于 {{ detailData.updatedTime }}</span>
        </div>
      </div>

      <div class="content markdownStyle" v-html="detailData.content"></div>

      <footer class="detail-footer">
        <div class="footer-actions">
          <div class="upvote-group">
            <button class="upvote-btn">
              <span class="arrow-up">▲</span>
              赞同 {{ detailData.upvoteCount }}
            </button>
          </div>

          <div class="other-actions">
            <button class="action-btn">
              <svg class="btn-icon" viewBox="0 0 24 24"><path fill="currentColor" d="M12 2C6.477 2 2 5.582 2 10c0 1.81.742 3.477 1.986 4.793-.162 1.353-.87 2.946-1.554 3.753a.5.5 0 0 0 .584.767c1.78-.9 3.864-1.574 5.253-1.895C9.434 17.79 10.686 18 12 18c5.523 0 10-3.582 10-8s-4.477-8-10-8Z"/></svg>
              {{ detailData.commentCount }} 条评论
            </button>
            <button class="action-btn">
              <svg class="btn-icon" viewBox="0 0 24 24"><path fill="currentColor" d="M16 5l-1.42 1.42L16.16 8H9a5 5 0 0 0 0 10h2v-2H9a3 3 0 0 1 0-6h7.16l-1.58 1.58L16 13l4-4-4-4z"/></svg>
              分享
            </button>
            <button
              class="action-btn"
              :class="{ 'is-favorite': detailData.isFavorite }"
              @click="toggleFavorite(detailData)"
            >
              <svg class="btn-icon" viewBox="0 0 24 24"><path fill="currentColor" d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>
              {{ detailData.isFavorite ? '已收藏' : '收藏' }}
            </button>
            <button
              class="action-btn"
              :class="{ 'is-liked': detailData.isLiked }"
              @click="toggleLike(detailData)"
            >
              <svg class="btn-icon" viewBox="0 0 24 24"><path fill="currentColor" d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>
              {{ detailData.isLiked ? '已喜欢' : '喜欢' }}
            </button>
          </div>
        </div>
      </footer>
    </main>
  </div>
</template>

<style scoped>
.detail-container {
  max-width: 1000px;
  margin: 0 auto;
  background: #fff;
  min-height: 100vh;
}

.detail-header {
  padding: 10px 20px;
  border-bottom: 1px solid #ebebeb;
  position: sticky;
  top: 0;
  background: #fff;
  z-index: 10;
}

.back-btn {
  display: flex;
  align-items: center;
  gap: 5px;
  border: none;
  background: none;
  color: #8590a6;
  cursor: pointer;
  font-size: 14px;
}

.back-btn:hover {
  color: #1751d0;
}

.icon {
  width: 20px;
  height: 20px;
}

.detail-main {
  padding: 40px 20px;
}

.detail-title {
  font-size: 24px;
  font-weight: 600;
  margin-bottom: 24px;
  line-height: 1.4;
}

.author-info {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 30px;
}

.avatar {
  width: 38px;
  height: 38px;
  background: #eee;
  border-radius: 2px;
}

.author-name {
  font-weight: 600;
  display: block;
}

.time {
  font-size: 14px;
  color: #8590a6;
}

.content {
  line-height: 1.8;
  color: #1a1a1a;
  font-size: 16px;
}

/* 深度选择器强制修改 v-html 内部样式 */
:deep(h3) {
  margin: 1.5em 0 0.5em;
  font-size: 20px;
}

:deep(p) {
  margin-bottom: 1.2em;
}

.detail-footer {
  margin-top: 50px;
  padding-top: 20px;
  border-top: 1px solid #ebebeb;
}

.footer-actions {
  display: flex;
  align-items: center;
  gap: 20px;
}

.upvote-group {
  display: flex;
}

.upvote-btn {
  background: rgba(0, 102, 255, 0.1);
  color: #0066ff;
  border: none;
  padding: 8px 16px;
  border-radius: 3px;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 4px;
}

.arrow-up {
  font-size: 12px;
}

/* 辅操作按钮区域 */
.other-actions {
  display: flex;
  gap: 20px;
}

.action-btn {
  background: none;
  border: none;
  color: #8590a6;
  font-size: 14px;
  cursor: pointer;
  padding: 4px 0;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  gap: 4px;
}

.action-btn:hover {
  color: #76839b;
}

.btn-icon {
  width: 18px;
  height: 18px;
  flex-shrink: 0;
}

/* 状态颜色 */
.action-btn.is-favorite {
  color: #f7ba2a;
  font-weight: 600;
}

.action-btn.is-liked {
  color: #f56c6c;
  font-weight: 600;
}

.action-btn:active {
  transform: scale(0.9);
}

/* --- 自适应逻辑开始 --- */

@media screen and (max-width: 768px) {
  .detail-main {
    padding: 20px 15px; /* 减小文章内边距 */
  }

  .detail-title {
    font-size: 20px; /* 缩小标题，防止文字由于太长而换行严重 */
    margin-bottom: 16px;
  }

  .content {
    font-size: 15px; /* 稍微缩小文字，适合手机阅读 */
  }

  /* 悬浮操作栏（可选）：手机端点击收藏分享通常比较拥挤，我们调整一下间距 */
  .footer-actions {
    flex-wrap: wrap; /* 如果按钮太多，允许自动换行 */
    gap: 12px;
  }

  .other-actions {
    gap: 12px;
  }

  .action-btn {
    font-size: 13px; /* 按钮文字调小 */
  }
}
</style>
