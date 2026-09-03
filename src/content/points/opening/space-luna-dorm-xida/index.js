import step1 from './01-position.png'
import step2 from './02-aim.png'

export default {
  id: 'space-luna-dorm-xida',
  map: 'space',
  operator: 'luna',
  name: '宿舍电西大',
  summary: '看西大是否开卡',
  video: {
    url: 'https://www.bilibili.com/video/BV11jTWz5EQk?t=6',
    bvid: 'BV11jTWz5EQk',
    start: 6,
  },
  steps: [
    { name: '站位', alt: '宿舍电西大站位，贴着内侧角落', image: step1 },
    { name: '瞄准位置', alt: '第三准星瞄准黑色区域，蓄力射箭', image: step2 },
  ],
}
