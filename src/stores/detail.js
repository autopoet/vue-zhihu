import { ref } from 'vue'
import { defineStore } from 'pinia'

/**
 * 详情页状态机 (Detail Store)
 *
 * 核心职责：
 * 1. 管理详情页的完整数据生命周期
 * 2. 通过模块 ID (type_id) 隔离不同帖子的数据空间
 * 3. 提供 forceReset() 供路由守卫在页面切换时强制清空缓存
 *
 * 解决的问题：
 * SPA 中动态路由 (/detail/:type/:id) 的组件实例会被 Vue Router 就地复用，
 * 导致从帖子 A 切换到帖子 B 时，A 的数据残留在 Store 中污染 B 的展示。
 */
export const useDetailStore = defineStore('detail', () => {

  // =============== 状态定义 ===============

  /** 当前加载的模块 ID（格式: "type_id"，如 "recruit_1"） */
  const currentModuleId = ref(null)

  /** 帖子详情数据 */
  const detailData = ref(null)

  /** 收藏状态（独立管理，支持即时响应） */
  const isFavorite = ref(false)

  /** 申请入队状态：'none' | 'reviewing' | 'approved' */
  const applyStatus = ref('none')

  /** 数据加载中标记 */
  const isLoading = ref(false)

  /** 申请弹窗可见性 */
  const showApplyModal = ref(false)

  /** 申请表单 - 优势描述 */
  const advantageText = ref('')

  /** 申请表单 - 错误信息 */
  const errorMessage = ref('')

  // =============== 模拟数据库（等效后端 API 返回） ===============

  const mockDb = {
    'recruit_1': {
      type: 'recruit',
      title: '蓝桥杯 Web 应用开发国赛组队，缺一后端！',
      author: '前端小牛',
      avatar: '/avatar.jpg',
      updatedTime: '2 小时前',
      status: '招募中',
      isFavorite: false,
      content: `
        <p>目前我们队伍有一个前端和一个UI，准备报名今年的蓝桥杯Web赛道。前端技术栈是Vue3+Pinia，UI用Figma。</p>
        <h3>我们需要的队友</h3>
        <p>现在急需一名熟悉 Node.js 或者 Java SpringBoot 的后端大佬加入。</p>
        <h3>时间与要求</h3>
        <p>比赛期间一周最好能抽出10小时一起交流，如果有微服务经验或者搞过大屏可视化优先。</p>
      `,
      tags: ['Web开发', '蓝桥杯', '寻找后端'],
      views: 1256,
      commentCount: 8
    },
    'share_1': {
      type: 'share',
      title: '计算机设计大赛国一经验贴：如何写好一份漂亮的答辩PPT？',
      author: '架构师老张',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=老张',
      updatedTime: '5 小时前',
      isFavorite: false,
      content: `
        <p>很多人代码写得好，但是在计设答辩环节吃了大亏。答辩只有不到10分钟，评委根本没时间看你的每一行代码。</p>
        <h3>核心要素</h3>
        <p>你需要在一开始就抛出项目解决的市场痛点、商业价值，然后用架构图展示技术难点。本文分享了我们队伍去年拿国一使用的PPT模板与演讲逐字稿。</p>
      `,
      tags: ['答辩技巧', 'PPT模板', '干货分享'],
      views: 1205,
      commentCount: 120
    },
    'share_2': {
      type: 'share',
      title: 'Vue3 性能调优指南：从 500ms 到 50ms 的极致首屏加载',
      author: '前端架构师阿飞',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=阿飞',
      updatedTime: '昨天 19:20',
      isFavorite: true,
      content: `
        <p>在这篇文章中，我们将深入探讨 Vue3 渲染引擎背后的机制，了解什么是 Block Tree 以及如何利用 keep-alive 和异步组件切割代码体积。</p>
        <h3>性能瓶颈排查</h3>
        <p>我将结合大厂的真实落地案例，一步步带你排查性能瓶颈。附送自动化检测脚本。</p>
      `,
      tags: ['Vue3', '性能优化', '前端架构'],
      views: 342,
      commentCount: 42
    },
    'share_5': {
      type: 'share',
      title: '国赛备战必备：美赛/国赛历年优秀论文核心排版格式与工具推荐',
      author: '数学建模大佬',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=建模',
      updatedTime: '3 天前',
      isFavorite: true,
      content: `
        <p>数学建模比赛，排版占了印象分的很大比重。还在用 Word 痛苦地对齐公式？强烈推荐队伍里的排版手学习 LaTeX（Overleaf）。</p>
        <h3>资源推荐</h3>
        <p>我打包了 3 套我们拿过美赛 M 奖和国赛一等奖的现成 LaTeX 模板，直接填内容就能出神作。</p>
      `,
      tags: ['LaTeX', '排版工具', '历年真题'],
      views: 2310,
      commentCount: 456
    },
    'recruit_2': {
      type: 'recruit',
      title: '大创国家级立项，做校园闲置物品流转系统，求移动端开发人员',
      author: '极客实验室',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=极客',
      updatedTime: '昨天 14:30',
      status: '招募中',
      isFavorite: true,
      content: `
        <p>我们的大创项目已经成功拿到国家级立项，目前预算充足。系统主要做校园内的二手闲置流转，结合智能推荐算法。后端基础搭建已完成。</p>
        <h3>招募方向：大前端</h3>
        <p>现求一两名熟悉 Uni-app 或 鸿蒙系统开发的同学，一起将系统落地。</p>
      `,
      tags: ['大创', '资金充裕', 'APP开发'],
      views: 342,
      commentCount: 23
    },
    'recruit_3': {
      type: 'recruit',
      title: 'Kaggle 数据挖掘竞赛：信用卡欺诈检测，求求带带！',
      author: '算法练习生',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=算法',
      updatedTime: '昨天 09:15',
      status: '招募中',
      isFavorite: true,
      content: `
        <p>本人目前大三，熟悉基础的机器学习算法（XGBoost, Random Forest），想找几个小伙伴一起打这周末结束的 Kaggle 新手赛。</p>
        <h3>我们的目标</h3>
        <p>不求拿到名次，但求完整走一遍特征工程、模型搭建和调参的流程。如果你对数据敏感，欢迎加入！</p>
      `,
      tags: ['Python', 'Pandas', 'Sklearn'],
      views: 890,
      commentCount: 12
    },
    'recruit_5': {
      type: 'recruit',
      title: '想做一个极致优雅的番茄钟 App，我已经画好了图，就差程序员了',
      author: '野生设计师',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=设计',
      updatedTime: '3 天前',
      status: '已满员',
      isFavorite: false,
      content: `
        <p>发现市面上的番茄钟都太丑了，或者广告太多。我自己用 Figma 构思了一套玻璃拟物化风格（Glassmorphism）的 UI 界面。</p>
        <h3>项目现状</h3>
        <p>目前 UI 设计已全部完成，导出图稿已就绪。正在寻找 iOS 独立开发的老哥合作共同打造一款出圈的产品。</p>
      `,
      tags: ['SwiftUI', 'Figma', '独立开发'],
      views: 108,
      commentCount: 15
    }
  }

  // =============== 核心 Action：按模块 ID 加载数据 ===============

  /**
   * 通过模块 ID (type_id) 加载对应数据
   * 实现数据空间隔离：每个 moduleId 对应唯一的数据切片
   */
  function loadByModuleId(type, id) {
    const moduleId = `${type}_${id}`

    // 同一模块命中缓存，跳过重复加载
    if (currentModuleId.value === moduleId && detailData.value) {
      console.log(`⚡ [DetailStore] 缓存命中，跳过加载 | moduleId: ${moduleId}`)
      return
    }

    console.log(`📦 [DetailStore] 加载模块数据 | moduleId: ${moduleId}`)
    isLoading.value = true
    currentModuleId.value = moduleId

    // 模拟异步请求（实际项目中替换为 axios/fetch API 调用）
    const data = mockDb[moduleId]
    if (data) {
      detailData.value = { ...data }
      isFavorite.value = data.isFavorite || false
    } else {
      detailData.value = {
        title: '未找到内容',
        content: '<p>这篇帖子已经被吸入赛博黑洞...</p>',
        author: 'System',
        updatedTime: '未知',
        type: 'unknown',
        tags: []
      }
      isFavorite.value = false
    }

    // 从 localStorage 恢复申请状态（按模块 ID 隔离存储）
    const savedStatus = localStorage.getItem(`apply_status_post_${moduleId}`)
    applyStatus.value = savedStatus || 'none'

    isLoading.value = false
  }

  // =============== 核心 Action：强制状态重置 ===============

  /**
   * 由 Vue Router 全局守卫调用
   * 在路由切换时清空所有缓存，斩断跨页面的数据碰撞隐患
   */
  function forceReset() {
    console.log(`🔄 [DetailStore] 强制重置 | 被清除模块: ${currentModuleId.value}`)
    currentModuleId.value = null
    detailData.value = null
    isFavorite.value = false
    applyStatus.value = 'none'
    isLoading.value = false
    showApplyModal.value = false
    advantageText.value = ''
    errorMessage.value = ''
  }

  // =============== 业务 Actions ===============

  function toggleFavorite() {
    if (!detailData.value || detailData.value.type === 'unknown') return
    isFavorite.value = !isFavorite.value
  }

  function openApply() {
    if (applyStatus.value !== 'none') return
    advantageText.value = ''
    errorMessage.value = ''
    showApplyModal.value = true
  }

  function closeApply() {
    showApplyModal.value = false
  }

  function submitApplication() {
    if (advantageText.value.trim().length < 5) {
      errorMessage.value = '请至少输入5个字来描述你的优势'
      return false
    }
    applyStatus.value = 'reviewing'
    localStorage.setItem(`apply_status_post_${currentModuleId.value}`, 'reviewing')
    return true
  }

  return {
    // State
    currentModuleId,
    detailData,
    isFavorite,
    applyStatus,
    isLoading,
    showApplyModal,
    advantageText,
    errorMessage,
    // Actions
    loadByModuleId,
    forceReset,
    toggleFavorite,
    openApply,
    closeApply,
    submitApplication
  }
})
