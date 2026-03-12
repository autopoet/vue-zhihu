<script setup>
defineOptions({
  name: 'LayoutMenu'
})

import { ref, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()

const useMenus = ref([
  {
    url: '/home/index',
    name: '首页'
  },
  {
    url: '/home/explore',
    name: '竞赛大厅' // 将发现修改为大厅
  }
])

// 根据当前路由动态设置激活的菜单项
const activeIndex = computed(() => {
  const path = route.path
  // 如果当前路径以 /home/index 开头，则激活首页菜单
  if (path.startsWith('/home/index')) {
    return '/home/index'
  }
  return path
})

const handleSelect = (key) => {
  console.log('选择了菜单:', key)
  router.push(key)
}
</script>

<template>
  <div class="menu-container">
    <div class="logo" @click="handleSelect('/home/index')">
      <!-- 更有意义的 CampusHub 图标：结合了“学院风(六边形)”与“枢纽/连接(节点)”的设计 -->
      <svg class="brand-icon" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        <!-- 外层六边形 (代表校园边界) -->
        <path d="M20 2L35.5885 11V29L20 38L4.41154 29V11L20 2Z" fill="url(#brand_grad)" fill-opacity="0.1" stroke="url(#brand_grad)" stroke-width="2"/>
        <!-- 内层核心节点 (代表技术枢纽) -->
        <circle cx="20" cy="20" r="6" fill="url(#brand_grad)"/>
        <!-- 放射状连接线 -->
        <path d="M20 14V4M20 36V26M10 26L4.5 29M30 14L35.5 11M10 14L4.5 11M30 26L35.5 29" stroke="url(#brand_grad)" stroke-width="2" stroke-linecap="round"/>
        <defs>
          <linearGradient id="brand_grad" x1="4" y1="2" x2="35.5" y2="38" gradientUnits="userSpaceOnUse">
            <stop stop-color="#3B82F6"/>
            <stop offset="1" stop-color="#8B5CF6"/>
          </linearGradient>
        </defs>
      </svg>
      <span class="logo-text">CampusHub</span>
    </div>
    <nav class="custom-menu">
      <div
        v-for="item in useMenus"
        :key="item.url"
        class="menu-item"
        :class="{ active: activeIndex === item.url }"
        @click="handleSelect(item.url)"
      >
        {{ item.name }}
      </div>
    </nav>
  </div>
</template>

<style scoped>
.menu-container {
  display: flex;
  align-items: center;
  height: 60px;
}

.logo {
  cursor: pointer;
  margin-right: 32px;
  display: flex;
  align-items: center;
  gap: 8px;
}

.brand-icon {
  width: 28px;
  height: 28px;
  transition: transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

.logo:hover .brand-icon {
  transform: rotate(-10deg) scale(1.1);
}

.logo-text {
  font-size: 20px;
  font-weight: 800;
  color: var(--color-fg-default);
  letter-spacing: -1px;
  background: linear-gradient(135deg, var(--color-accent-fg), #8b5cf6);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.custom-menu {
  display: flex;
  align-items: center;
}

.menu-item {
  font-size: 14px;
  font-weight: 500;
  color: var(--color-fg-muted);
  height: 60px;
  line-height: 60px;
  padding: 0 16px;
  cursor: pointer;
  position: relative;
  transition: all 0.2s;
}

.menu-item:hover {
  color: var(--color-fg-default);
}

.menu-item.active {
  color: var(--color-fg-default);
  font-weight: 600;
}

.menu-item.active::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 12px;
  right: 12px;
  height: 2px;
  background-color: var(--color-accent-fg);
  box-shadow: 0 0 10px var(--color-accent-fg);
}
</style>
