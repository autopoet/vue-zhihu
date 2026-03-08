<script setup>
defineOptions({
  name: 'IndexLeft'
})

import { ref, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()

const tabs = ref([
  {
    url: '/home/index/interest',
    name: '关注'
  },
  {
    url: '/home/index/recommend',
    name: '推荐'
  },
  {
    url: '/home/index/hotlist',
    name: '热榜'
  },
  {
    url: '/home/index/video',
    name: '视频'
  }
])

const activeTab = computed(() => {
  return route.path
})

const handleTabClick = (url) => {
  router.push(url)
}
</script>

<template>
  <div class="index-left">
    <div class="tab-nav">
      <div
        v-for="tab in tabs"
        :key="tab.url"
        class="tab-item"
        :class="{ active: activeTab === tab.url }"
        @click="handleTabClick(tab.url)"
      >
        {{ tab.name }}
      </div>
    </div>
    <div class="content-area">
      <h2>首页左侧内容</h2>
    </div>
  </div>
</template>

<style scoped>
.index-left {
}

.tab-nav {
  display: flex;
  align-items: center;
  gap: 12px;
  padding-bottom: 12px;
  border-bottom: 1px solid #f0f0f0;
  margin-bottom: 24px;
}

.tab-item {
  font-size: 14px;
  font-weight: 500;
  color: #8590a6;
  height: 36px;
  line-height: 36px;
  padding: 0 14px;
  cursor: pointer;
  position: relative;
  white-space: nowrap;
  transition: all 0.25s ease;
  border-radius: 6px;
}

.tab-item:hover {
  color: #0066ff;
}

.tab-item.active {
  color: #0066ff;
  font-weight: 600;
}

.tab-item.active::after {
  content: '';
  position: absolute;
  bottom: -13px;
  left: 14px;
  right: 14px;
  height: 2px;
  background-color: #0066ff;
  border-radius: 1px 1px 0 0;
  animation: slideIn 0.25s ease;
}

@keyframes slideIn {
  from {
    transform: scaleX(0);
    opacity: 0;
  }
  to {
    transform: scaleX(1);
    opacity: 1;
  }
}

.content-area {
  padding: 20px 0;
}

.content-area h2 {
  font-size: 16px;
  color: #121212;
  margin-bottom: 16px;
  font-weight: 500;
}
</style>
