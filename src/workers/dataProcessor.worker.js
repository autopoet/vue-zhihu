// dataProcessor.worker.js

self.onmessage = function (e) {
  const { action, payload } = e.data

  if (action === 'GENERATE_HEATMAP') {
    const { daysCount } = payload
    const days = []
    
    // 模拟非常耗时的密集型数据处理 (CPU Bound)
    // 这里为了演示 Web Worker 的多线程能力，增加一个刻意的虚拟延迟循环
    let dummyCompute = 0
    for(let j = 0; j < 5000000; j++) {
      dummyCompute += Math.random()
    }

    // 生成假数据 (例如过去一年 364 天)
    for(let i = 0; i < daysCount; i++) {
      // 随机活跃等级 0-4
      const level = Math.random() > 0.65 ? Math.floor(Math.random() * 4) + 1 : 0
      days.push({ id: i, level })
    }

    // 将结果发送回主线程
    self.postMessage({
      action: 'HEATMAP_READY',
      data: days
    })
  }
}
