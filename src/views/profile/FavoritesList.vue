<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import FeedCard from '@/components/ui/FeedCard.vue'

const router = useRouter()
const isLoading = ref(true)

const goToDetail = (item) => {
  router.push(`/home/detail/${item.type}/${item.id}`)
}

// 模拟已收藏的数据
const favoritesList = ref([])

onMounted(() => {
  setTimeout(() => {
    favoritesList.value = [
      {
        id: 3,
        type: 'recruit',
        author: '算法练习生',
        action: '发起组队招募',
        title: ' Kaggle 数据挖掘竞赛：信用卡欺诈检测，求求带带！',
        excerpt: '本人目前大三，熟悉基础的机器学习算法（XGBoost, Random Forest），想找几个小伙伴一起打这周末结束的 Kaggle 新手赛...',
        competition: 'Kaggle',
        tags: ['Python', 'Pandas', 'Sklearn'],
        status: '招募中',
        updatedTime: '昨天 09:15',
        isFavorite: true,
        commentCount: 12,
      },
      {
        id: 2,
        type: 'share',
        author: '前端架构师阿飞',
        action: '发布了技术长文',
        title: 'Vue3 性能调优指南：从 500ms 到 50ms 的极致首屏加载',
        excerpt: '在这篇文章中，我们将深入探讨 Vue3 渲染引擎背后的机制，了解什么是 Block Tree 以及如何利用 keep-alive 和异步组件切割代码体积...',
        competition: '日常分享',
        tags: ['Vue3', '性能优化', '前端架构'],
        commentCount: 342,
        updatedTime: '昨天 19:20',
        isFavorite: true,
      },
      {
        id: 5,
        type: 'share',
        author: '数学建模大佬',
        action: '分享了备考资料',
        title: '国赛备战必备：美赛/国赛历年优秀论文核心排版格式与工具推荐',
        excerpt: '数学建模比赛，排版占了印象分的很大比重。还在用 Word 痛苦地对齐公式？强烈推荐队伍里的排版手学习 LaTeX...',
        competition: '数学建模',
        tags: ['LaTeX', '排版工具', '历年真题'],
        commentCount: 456,
        updatedTime: '3 天前',
        isFavorite: true,
      }
    ]
    isLoading.value = false
  }, 600)
})

const removeFavorite = (item, index) => {
  // 模拟取消收藏动画
  const el = document.getElementById(`fav-item-${item.id}`)
  if (el) {
    el.style.transform = 'translateX(100%)'
    el.style.opacity = '0'
    setTimeout(() => {
      favoritesList.value.splice(index, 1)
    }, 300)
  }
}
</script>

<template>
  <div class="favorites-page">
    <div class="page-header">
      <h1 class="page-title">我的收藏夹</h1>
      <p class="page-desc">这里存放着你沿途收集的技术灵感与组队契机</p>
    </div>

    <div class="favorites-content" v-if="!isLoading">
      <TransitionGroup name="list" tag="div" class="feed-list" v-if="favoritesList.length > 0">
        <div 
          v-for="(item, index) in favoritesList" 
          :key="item.id" 
          :id="`fav-item-${item.id}`"
          class="favorite-item-wrapper"
        >
          <FeedCard
            :author="item.author"
            :action="item.action"
            :time="item.updatedTime"
            @click="goToDetail(item)"
          >
            <template #title>
              <h2 class="feed-title">{{ item.title }}</h2>
              <span v-if="item.status" class="status-badge" :class="item.status === '招募中' ? 'bg-green' : 'bg-gray'">
                {{ item.status }}
              </span>
            </template>
            <template #content>
              <p class="feed-excerpt">{{ item.excerpt }}</p>
            </template>
            <template #tags>
              <span class="tech-tag" v-if="item.competition">{{ item.competition }}</span>
              <span class="tech-tag" v-for="tag in item.tags" :key="tag">{{ tag }}</span>
            </template>
            <template #stats>
              <span class="stat-item"><svg viewBox="0 0 24 24" class="icon"><path fill="currentColor" d="M21.99 4c0-1.1-.89-2-1.99-2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h14l4 4-.01-18zM18 14H6v-2h12v2zm0-3H6V9h12v2zm0-3H6V6h12v2z"/></svg> {{ item.commentCount || 0 }}</span>
            </template>
          </FeedCard>
          
          <!-- 悬浮取消收藏按钮 -->
          <button class="remove-btn" @click.stop="removeFavorite(item, index)" title="取消收藏">
             <svg viewBox="0 0 24 24" width="20" height="20"><path fill="currentColor" d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>
             <span>取消</span>
          </button>
        </div>
      </TransitionGroup>

      <!-- 空状态设计 -->
      <div v-else class="empty-state">
        <div class="empty-icon-wrapper">
          <svg viewBox="0 0 24 24" class="empty-svg" width="64" height="64"><path fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path></svg>
        </div>
        <h3>你的收藏夹空空如也</h3>
        <p>去招募大厅或者干货分享区逛逛吧，遇到喜欢的内容点击心形按钮即可收藏。</p>
        <button class="gh-btn-primary" @click="router.push('/home/recruit')">去逛逛</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.favorites-page {
  max-width: 800px;
  margin: 0 auto;
  padding: 40px 20px;
}

.page-header {
  margin-bottom: 40px;
  text-align: center;
}

.page-title {
  font-size: 32px;
  font-weight: 800;
  color: var(--color-fg-default);
  margin-bottom: 12px;
  letter-spacing: -0.5px;
}

.page-desc {
  font-size: 16px;
  color: var(--color-fg-muted);
}

.feed-list {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.favorite-item-wrapper {
  position: relative;
  transition: transform 0.3s ease, opacity 0.3s ease;
}

/* 取消收藏按钮隐藏，hover时显示 */
.remove-btn {
  position: absolute;
  top: 16px;
  right: -60px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 4px;
  background: var(--color-canvas-subtle);
  border: 1px solid var(--color-border-default);
  color: #f43f5e;
  border-radius: 12px;
  padding: 12px;
  cursor: pointer;
  opacity: 0;
  transform: translateX(-10px);
  transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

.remove-btn span {
  font-size: 12px;
  font-weight: 600;
}

.favorite-item-wrapper:hover .remove-btn {
  opacity: 1;
  transform: translateX(0);
  right: -80px;
}

.remove-btn:hover {
  background: #fff1f2;
  border-color: #fda4af;
  transform: translateX(0) scale(1.1) !important;
}

[data-theme='dark'] .remove-btn:hover {
  background: rgba(244, 63, 94, 0.1);
  border-color: rgba(244, 63, 94, 0.3);
}

/* 列表动画 */
.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease;
}
.list-enter-from {
  opacity: 0;
  transform: translateY(30px);
}
.list-leave-to {
  opacity: 0;
  transform: translateX(100px);
}

/* 精密空状态 */
.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 80px 20px;
  background: var(--color-canvas-default);
  border: 1px dashed var(--color-border-muted);
  border-radius: 20px;
  text-align: center;
}

.empty-icon-wrapper {
  width: 120px;
  height: 120px;
  background: var(--color-canvas-subtle);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 24px;
  color: var(--color-fg-muted);
}

.empty-state h3 {
  font-size: 20px;
  font-weight: 700;
  color: var(--color-fg-default);
  margin-bottom: 12px;
}

.empty-state p {
  color: var(--color-fg-muted);
  max-width: 400px;
  line-height: 1.6;
  margin-bottom: 32px;
}

.gh-btn-primary {
  padding: 12px 32px;
  font-size: 16px;
  font-weight: 600;
  border-radius: 12px;
  background: linear-gradient(135deg, var(--color-accent-fg), #8b5cf6);
  color: #fff;
  border: none;
  cursor: pointer;
  transition: transform 0.2s, box-shadow 0.2s;
}

.gh-btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 16px -4px rgba(139, 92, 246, 0.4);
}

/* 卡片内部通用样式 */
.feed-title {
  font-size: 18px;
  font-weight: 700;
  color: var(--color-fg-default);
  line-height: 1.4;
  margin: 0 0 8px 0;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  transition: color 0.2s;
}

.feed-excerpt {
  font-size: 14px;
  color: var(--color-fg-muted);
  line-height: 1.6;
  margin: 0;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.status-badge {
  font-size: 12px;
  font-weight: 600;
  padding: 2px 8px;
  border-radius: 12px;
  margin-top: 8px;
  display: inline-block;
}

.bg-green { background: #dcfce7; color: #166534; }
.bg-gray { background: var(--color-canvas-subtle); color: var(--color-fg-muted); }
[data-theme='dark'] .bg-green { background: rgba(34, 197, 94, 0.2); color: #4ade80; }

.tech-tag {
  font-size: 12px;
  color: var(--color-accent-fg);
  background: var(--color-accent-subtle);
  padding: 4px 10px;
  border-radius: 12px;
  font-weight: 500;
  border: 1px solid rgba(9, 105, 218, 0.1);
}

.stat-item {
  color: var(--color-fg-muted);
  font-size: 13px;
  display: flex;
  align-items: center;
  gap: 4px;
}

.icon {
  width: 16px;
  height: 16px;
}

@media screen and (max-width: 768px) {
  .favorite-item-wrapper:hover .remove-btn {
    right: 16px; /* 移动端在内部显示 */
    background: var(--color-canvas-default);
    box-shadow: 0 4px 12px rgba(0,0,0,0.1);
  }
}
</style>
