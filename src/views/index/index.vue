<script setup>
defineOptions({
  name: 'IndexView'
})

import { ref, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import IndexRight from './indexright.vue'

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
  <div class="index-container">
    <div class="content-wrapper">
      <div class="content-card">
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
          <router-view></router-view>
        </div>
      </div>
      <div class="index-right">
        <IndexRight></IndexRight>
      </div>
    </div>
  </div>
</template>

<style scoped>
.index-container {
  padding: 20px 0;
}

.content-wrapper {
  max-width: 1000px;
  margin: 0 auto;
  padding: 0 20px;
  display: flex;
  gap: 20px;
}

.content-card {
  flex: 1;
  background-color: #fff;
  border-radius: 8px;
  padding: 20px;
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

.index-right {
  flex: 0 0 300px;
}

/* --- 自适应逻辑开始 --- */

/* 1. 当屏幕小于 1000px 时（小屏笔记本/平板） */
@media screen and (max-width: 1000px) {
  .content-wrapper {
    max-width: 100%; /* 取消固定宽度，改为充满屏幕 */
    padding: 0 10px; /* 缩小左右留白 */
  }

  .index-right {
    flex: 0 0 280px; /* 侧边栏稍微变窄一点 */
  }
}

/* 2. 当屏幕小于 768px 时（手机端） */
@media screen and (max-width: 768px) {
  .content-wrapper {
    flex-direction: column; /* 布局从水平排布变为垂直排布 */
    gap: 0;
  }

  .content-card {
    border-radius: 0; /* 手机端内容铺满，去掉圆角显得更大气 */
    padding: 15px;
  }

  .index-right {
    display: none; /* 手机端通常不需要显示复杂的侧边栏 */
  }

  .tab-nav {
    overflow-x: auto; /* 标签栏如果太多，支持水平滑动 */
    white-space: nowrap;
    padding-bottom: 5px;
  }

  /* 隐藏滚动条（美观考虑） */
  .tab-nav::-webkit-scrollbar {
    display: none;
  }
}
</style>
