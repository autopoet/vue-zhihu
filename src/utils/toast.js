import { render, createVNode } from 'vue'
import GeekToast from '@/components/ui/GeekToast.vue'

let seed = 1

export const geekToast = (options) => {
  if (typeof options === 'string') {
    options = { message: options }
  }

  // 创建一个容器 div
  const container = document.createElement('div')
  // 给定唯一的 ID 以便后续管理（如果需要叠加显示的话，目前单例也罢）
  const id = `geek-toast-${seed++}`
  container.id = id
  document.body.appendChild(container)

  // 接收到关闭回调时卸载组件并移除 DOM
  const closeHandler = () => {
    if (options.onClose) {
      options.onClose()
    }
    render(null, container)
    container.remove()
  }

  // 创建虚拟节点并传入 Props
  const vnode = createVNode(GeekToast, {
    ...options,
    onClose: closeHandler
  })

  // 渲染 VNode 到真实的 DOM
  render(vnode, container)

  return {
    close: closeHandler
  }
}

['success', 'warning', 'info', 'error'].forEach(type => {
  geekToast[type] = (options) => {
    if (typeof options === 'string') {
      options = { message: options, type }
    } else {
      options.type = type
    }
    return geekToast(options)
  }
})
