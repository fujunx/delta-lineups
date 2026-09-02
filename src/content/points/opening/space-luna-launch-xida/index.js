import step1 from './01-position.png'
import step2 from './02-aim.png'

export default {
  id: 'space-luna-launch-xida',
  map: 'space',
  operator: 'luna',
  name: '开局发射电西大',
  summary: '看西大是否开门',
  video: {
    url: 'https://www.bilibili.com/video/BV1ywRNBZEUH?t=40',
    bvid: 'BV1ywRNBZEUH',
    start: 40,
  },
  steps: [
    { name: '站位', alt: '发射电西大的站位，箱子夹角处抵住', image: step1 },
    { name: '瞄准位置', alt: '蓄力条右缺口对准集装箱角，蓄力拉满射出', image: step2 },
  ],
}
