<script setup>
defineOptions({
  name: 'IndexRight'
})

// 模拟的创作中心数据
const creatorStats = [
  { label: '昨日阅读', value: '1,240' },
  { label: '昨日新增粉丝', value: '12' }
]

// 模拟的热议话题
const hotTopics = [
  { id: 1, title: '如何评价国产首款 3A 游戏《黑神话：悟空》？', hotValue: '1.2亿' },
  { id: 2, title: '当下年轻人为什么开始流行“特种兵式”旅游？', hotValue: '8500万' },
  { id: 3, title: '有哪些让你相见恨晚的 Vue 3 开发技巧？', hotValue: '4200万' }
]
</script>

<template>
  <div class="sidebar-container">
    <!-- 创作入口卡片 -->
    <div class="card creator-card">
      <div class="creator-header">
        <div class="creator-item">
          <div class="icon-box blue"><svg viewBox="0 0 24 24"><path fill="currentColor" d="M11 14h2v7.2a.8.8 0 0 1-1.6 0V14zm-4.3-1a1 1 0 0 1-.7-1.7l5.3-5.3a1 1 0 0 1 1.4 0l5.3 5.3a1 1 0 0 1-1.4 1.4L12 8.4l-4.6 4.6a1 1 0 0 1-.7.3z"/></svg></div>
          <span>写回答</span>
        </div>
        <div class="creator-item">
          <div class="icon-box orange"><svg viewBox="0 0 24 24"><path fill="currentColor" d="M21 15v3h-3v2h3v3h2v-3h3v-2h-3v-3h-2zm-2-4V7a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h8v-2H5V7h12v4h2zM7 9h8v2H7V9zm0 4h5v2H7v-2z"/></svg></div>
          <span>写文章</span>
        </div>
        <div class="creator-item">
          <div class="icon-box yellow"><svg viewBox="0 0 24 24"><path fill="currentColor" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 14h-2v-2h2v2zm0-4h-2V7h2v5z"/></svg></div>
          <span>写想法</span>
        </div>
      </div>
      <div class="creator-center">
        <div class="center-text">
          <span class="center-title">创作中心</span>
          <span class="level">Lv 3</span>
        </div>
        <div class="stats-row">
          <div v-for="stat in creatorStats" :key="stat.label" class="stat-item">
            <span class="stat-label">{{ stat.label }}</span>
            <span class="stat-value">{{ stat.value }}</span>
          </div>
        </div>
        <button class="entry-btn">进入创作中心 ></button>
      </div>
    </div>

    <!-- 热议话题卡片 -->
    <div class="card common-card">
      <div class="card-title">
        <svg class="title-icon" viewBox="0 0 24 24"><path fill="#f00" d="M17.66 11.2c-.23-.3-.51-.56-.77-.82-.67-.6-1.41-1.09-2.12-1.72C13.1 7.33 12.5 5.73 13 4c-2 1.35-3.59 4.03-3.67 6.44-.03.54.04 1.1.2 1.62-.36-.3-.67-.64-.91-1.03C7.47 9.1 7.15 8.12 7.12 7.08c-1.65 1.58-2.5 3.96-1.95 6.3.38 1.64 1.3 3.08 2.63 4.03.11.07.24.12.37.12.13 0 .26-.05.37-.12 1.05-.72 1.83-1.63 2.52-2.31.29-.29.57-.59.85-.89.28-.3.62-.63 1-.77s.88.01 1.25.12c1.4.43 2.05 1.7 1.93 2.87-.04.41-.17.82-.41 1.16-.07.11-.06.26.04.34.1.08.24.08.34-.01.91-.79 1.41-1.96 1.41-3.23.01-1.16-.4-2.22-1.15-3.03z"/></svg>
        知乎热议
      </div>
      <div class="topic-list">
        <div v-for="(topic, index) in hotTopics" :key="topic.id" class="topic-item">
          <span class="topic-index" :class="{ top: index < 3 }">{{ index + 1 }}</span>
          <div class="topic-info">
            <div class="topic-title">{{ topic.title }}</div>
            <div class="topic-hot">{{ topic.hotValue }} 热度</div>
          </div>
        </div>
      </div>
      <button class="more-btn">查看更多 ></button>
    </div>

    <!-- 页脚链接 -->
    <div class="footer-links">
      <div class="link-group">
        <span>刘看山</span>·<span>知乎指南</span>·<span>知乎协议</span>·<span>知乎隐私保护指引</span>
      </div>
      <div class="link-group">
        <span>应用</span>·<span>工作</span>·<span>申请开通机构号</span>
      </div>
      <div class="copyright">© 2026 知乎</div>
    </div>
  </div>
</template>

<style scoped>
.sidebar-container {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

/* 通用卡片样式 */
.card {
  background: #fff;
  border-radius: 4px;
  box-shadow: 0 1px 3px rgba(18, 18, 18, 0.1);
  overflow: hidden;
}

/* 创作卡片 */
.creator-header {
  display: flex;
  padding: 20px 10px;
  border-bottom: 1px solid #f0f2f7;
}

.creator-item {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  cursor: pointer;
}

.creator-item span {
  font-size: 14px;
  color: #444;
}

.icon-box {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.2s;
}

.creator-item:hover .icon-box {
  transform: translateY(-2px);
}

.icon-box svg {
  width: 24px;
  height: 24px;
}

.blue { background: rgba(0, 102, 255, 0.1); color: #0066ff; }
.orange { background: rgba(244, 164, 40, 0.1); color: #f4a428; }
.yellow { background: rgba(255, 193, 7, 0.1); color: #ffc107; }

.creator-center {
  padding: 16px;
}

.center-text {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
}

.center-title {
  font-weight: 600;
  color: #444;
}

.level {
  font-size: 12px;
  color: #0066ff;
  background: rgba(0, 102, 255, 0.05);
  padding: 2px 6px;
  border-radius: 4px;
}

.stats-row {
  display: flex;
  margin-bottom: 15px;
}

.stat-item {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.stat-label {
  font-size: 12px;
  color: #8590a6;
}

.stat-value {
  font-size: 18px;
  font-weight: 600;
  color: #121212;
}

.entry-btn {
  width: 100%;
  padding: 8px;
  border: 1px solid #0066ff;
  background: #fff;
  color: #0066ff;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  transition: all 0.2s;
}

.entry-btn:hover {
  background: rgba(0, 102, 255, 0.05);
}

/* 热议话题 */
.card-title {
  padding: 16px;
  font-weight: 600;
  border-bottom: 1px solid #f0f2f7;
  display: flex;
  align-items: center;
  gap: 8px;
}

.title-icon { width: 18px; height: 18px; }

.topic-list {
  padding: 8px 0;
}

.topic-item {
  display: flex;
  padding: 10px 16px;
  gap: 12px;
  cursor: pointer;
  transition: background 0.2s;
}

.topic-item:hover {
  background: #f6f6f6;
}

.topic-index {
  font-weight: 600;
  color: #8590a6;
  font-size: 14px;
  width: 14px;
}

.topic-index.top { color: #ff9607; }

.topic-title {
  font-size: 14px;
  color: #121212;
  margin-bottom: 4px;
  line-height: 1.4;
}

.topic-hot {
  font-size: 12px;
  color: #8590a6;
}

.more-btn {
  width: 100%;
  padding: 12px;
  border: none;
  background: none;
  color: #8590a6;
  font-size: 14px;
  cursor: pointer;
}

.more-btn:hover {
  color: #76839b;
}

/* 页脚 */
.footer-links {
  padding: 10px 5px;
  color: #8590a6;
  font-size: 13px;
}

.link-group {
  margin-bottom: 8px;
}

.link-group span {
  cursor: pointer;
  margin: 0 2px;
}

.link-group span:hover {
  color: #1751d0;
}

.copyright {
  margin-top: 10px;
}
</style>
