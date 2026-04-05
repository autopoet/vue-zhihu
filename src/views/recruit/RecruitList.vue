<script setup>
import { ref, onMounted, onUnmounted, nextTick } from 'vue'
import { useRouter } from 'vue-router'
import FeedCard from '@/components/ui/FeedCard.vue'
import SkeletonCard from '@/components/ui/SkeletonCard.vue'
import { geekToast } from '@/utils/toast.js'
import { useMockStore } from '@/stores/mockStore'

const router = useRouter()
const loading = ref(true)
const isLoadingMore = ref(false)
const hasMore = ref(true)
const observerTarget = ref(null)
let observer = null

const store = useMockStore()

const goToDetail = (item) => {
  router.push(`/home/detail/${item.type}/${item.id}`)
}

const list = ref([])

onMounted(async () => {
  // 初始加载招募数据（使用 mockStore）
  await store.loadRecruitments()
  list.value = store.recruitments
  loading.value = false
  // 等待 DOM 渲染后再创建 IntersectionObserver
  nextTick(() => {
    setupObserver()
  })
})

onUnmounted(() => {
  if (observer) observer.disconnect()
})

const setupObserver = () => {
  observer = new IntersectionObserver(
    (entries) => {
      if (entries[0].isIntersecting && !isLoadingMore.value && hasMore.value) {
        loadMore()
      }
    },
    { threshold: 0.1, rootMargin: '0px 0px 200px 0px' }
  )
  if (observerTarget.value) {
    observer.observe(observerTarget.value)
  }
}

const loadMore = () => {
  if (isLoadingMore.value || !hasMore.value) return
  isLoadingMore.value = true
  setTimeout(() => {
    const currentLen = list.value.length
    const moreData = [
      // 这里可以继续使用 mock 数据，实际项目会调用后端分页接口
      {
        id: currentLen + 101,
        type: 'recruit',
        author: '代码补给站',
        action: '发布了新动态',
        title: `全栈开发：模拟面试系统 (深度迭代第 ${Math.floor(currentLen / 4)} 阶段)`,
        excerpt: '本项目旨在利用 AI 模拟大厂面试官进行真人对练。目前前端部分已完成 80%，急需一名熟悉后端 RAG 架构或者有大模型微调经验的同学加入。项目已获得校赛直通名额，诚邀硬核队友！',
        competition: '互联网+',
        requiredSkills: ['Python', 'LangChain', 'OpenAI'],
        status: '招募中',
        updatedTime: '刚刚',
        isFavorite: false,
        commentCount: 0,
        type_id: 'recruit'
      }
    ]
    list.value.push(...moreData)
    isLoadingMore.value = false
    if (list.value.length >= 19) {
      hasMore.value = false
      if (observer) observer.disconnect()
    }
  }, 1500)
}

const toggleFavorite = (item) => {
  item.isFavorite = !item.isFavorite
  if (item.isFavorite) {
    geekToast.success('已加入我的收藏夹')
  } else {
    geekToast.info('已取消收藏')
  }
}

const sharePost = () => {
  geekToast.success('招募分享链接已复制到剪贴板！')
}
</script>

<template>
  <div class="topstory-content">
    <div class="feed-list">
      <template v-if="loading">
        <SkeletonCard v-for="i in 3" :key="i" />
      </template>
      <template v-else>
        <FeedCard
          v-for="item in list"
          :key="item.id"
          :author="item.author"
          :action="item.action"
          :time="item.updatedTime"
          @click="goToDetail(item)"
        >
          <template #title>
            <h2 class="feed-title">
              {{ item.title }}
              <span class="status-tag" :class="item.status === '招募中' ? 'status-active' : 'status-full'">
                {{ item.status }}
              </span>
            </h2>
          </template>
          <template #tags>
            <span class="comp-tag" v-if="item.competition">{{ item.competition }}</span>
            <span v-for="(skill, index) in item.requiredSkills" :key="index" class="skill-tag">
              {{ skill }}
            </span>
          </template>
          <p class="excerpt">{{ item.excerpt }}</p>
          <template #footer>
            <div class="other-actions">
              <button class="action-btn" @click.stop>
                <svg class="btn-icon" viewBox="0 0 24 24"><path fill="currentColor" d="M12 2C6.477 2 2 5.582 2 10c0 1.81.742 3.477 1.986 4.793-.162 1.353-.87 2.946-1.554 3.753a.5.5 0 0 0 .584.767c1.78-.9 3.864-1.574 5.253-1.895C9.434 17.79 10.686 18 12 18c5.523 0 10-3.582 10-8s-4.477-8-10-8Z"/></svg>
                <span class="text-hide-mobile">{{ item.commentCount }} 条评论</span>
              </button>
              <button class="action-btn" @click.stop="sharePost(item)">
                <svg class="btn-icon" viewBox="0 0 24 24"><path fill="currentColor" d="M16 5l-1.42 1.42L16.16 8H9a5 5 0 0 0 0 10h2v-2H9a3 3 0 0 1 0-6h7.16l-1.58 1.58L16 13l4-4-4-4z"/></svg>
                <span class="text-hide-mobile">分享招募</span>
              </button>
              <button class="action-btn" :class="{ 'is-favorite': item.isFavorite }" @click.stop="toggleFavorite(item)">
                <svg class="btn-icon" viewBox="0 0 24 24"><path fill="currentColor" d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>
                <span class="text-hide-mobile">{{ item.isFavorite ? '已收藏' : '收藏' }}</span>
              </button>
            </div>
          </template>
        </FeedCard>
        <div ref="observerTarget" class="infinite-scroll-trigger">
          <div v-if="isLoadingMore" class="loading-state">
            <div class="spinner"></div>
            <span>正在加载更多招募...</span>
          </div>
          <div v-if="!hasMore && !loading" class="end-state">
            没有更多招募信息了，快去自己发布一个吧！
          </div>
        </div>
      </template>
    </div>
  </div>
</template>

<style scoped>
/* 保持原有样式不变 */
</style>
