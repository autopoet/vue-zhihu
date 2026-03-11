<script setup>
import { ref, onMounted } from 'vue'

const props = defineProps({
  message: { type: String, required: true },
  type: { type: String, default: 'info' }, // 'success', 'error', 'info', 'warning'
  duration: { type: Number, default: 3000 },
  onClose: { type: Function, default: null }
})

const isVisible = ref(false)

onMounted(() => {
  // 挂载后立即触发动画
  setTimeout(() => isVisible.value = true, 10)
  
  if (props.duration > 0) {
    setTimeout(close, props.duration)
  }
})

const close = () => {
  isVisible.value = false
  setTimeout(() => {
    if (props.onClose) props.onClose()
  }, 300) // 等待 CSS 动画结束
}
</script>

<template>
  <transition name="toast-slide">
    <div v-show="isVisible" class="geek-toast" :class="`toast-${type}`">
      <div class="toast-icon">
        <svg v-if="type === 'success'" viewBox="0 0 24 24" class="icon"><path fill="currentColor" d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg>
        <svg v-else-if="type === 'error'" viewBox="0 0 24 24" class="icon"><path fill="currentColor" d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/></svg>
        <svg v-else-if="type === 'warning'" viewBox="0 0 24 24" class="icon"><path fill="currentColor" d="M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z"/></svg>
        <svg v-else viewBox="0 0 24 24" class="icon"><path fill="currentColor" d="M11 17h2v-6h-2v6zm1-15C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zM11 9h2V7h-2v2z"/></svg>
      </div>
      <div class="toast-content">{{ message }}</div>
      <button class="toast-close" @click="close">
        <svg viewBox="0 0 24 24" class="icon" width="16" height="16"><path fill="currentColor" d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/></svg>
      </button>
      <div class="toast-progress"></div>
    </div>
  </transition>
</template>

<style scoped>
.geek-toast {
  display: flex;
  align-items: center;
  position: fixed;
  top: 32px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 9999;
  padding: 12px 16px;
  border-radius: 12px;
  background: var(--color-canvas-default);
  box-shadow: 0 12px 32px rgba(0, 0, 0, 0.15);
  border: 1px solid var(--color-border-default);
  gap: 12px;
  min-width: 300px;
  max-width: 80vw;
  overflow: hidden;
  will-change: transform, opacity;
}

[data-theme='dark'] .geek-toast {
  box-shadow: 0 12px 32px rgba(0, 0, 0, 0.4);
}

.toast-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  flex-shrink: 0;
}

.icon {
  width: 18px;
  height: 18px;
}

.toast-content {
  flex-grow: 1;
  font-size: 14px;
  font-weight: 500;
  color: var(--color-fg-default);
}

.toast-close {
  background: none;
  border: none;
  color: var(--color-fg-muted);
  cursor: pointer;
  padding: 4px;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;
}

.toast-close:hover {
  background: var(--color-canvas-subtle);
  color: var(--color-fg-default);
}

/* 进度条动画 */
.toast-progress {
  position: absolute;
  bottom: 0;
  left: 0;
  height: 3px;
  width: 100%;
  background: var(--color-accent-fg);
  animation: shrink forwards linear;
}

@keyframes shrink {
  from { width: 100%; }
  to { width: 0%; }
}

/* 颜色主题 */
.toast-success .toast-icon { color: #2da44e; background: rgba(45, 164, 78, 0.1); }
.toast-success .toast-progress { background: #2da44e; }

.toast-error .toast-icon { color: #cf222e; background: rgba(207, 34, 46, 0.1); }
.toast-error .toast-progress { background: #cf222e; }

.toast-warning .toast-icon { color: #bf8700; background: rgba(212, 167, 44, 0.1); }
.toast-warning .toast-progress { background: #bf8700; }

.toast-info .toast-icon { color: #0969da; background: rgba(9, 105, 218, 0.1); }
.toast-info .toast-progress { background: #0969da; }

/* 进出场动画 */
.toast-slide-enter-active,
.toast-slide-leave-active {
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

.toast-slide-enter-from {
  opacity: 0;
  transform: translate(-50%, -40px) scale(0.9);
}

.toast-slide-leave-to {
  opacity: 0;
  transform: translate(-50%, -40px) scale(0.9);
}
</style>
