import step1 from './01-position.png'
import step2 from './02-aim.png'

export default {
  id: 'space-luna-float-stair-gap-hold',
  map: 'space',
  operator: 'luna',
  name: '楼梯口',
  description: '蓄力反弹',
  throwables: ['electric-arrow'],
  sort: 6,
  video: {
    url: 'https://www.bilibili.com/video/BV1FjFSzdE4Y?t=134',
    bvid: 'BV1FjFSzdE4Y',
    start: 134,
  },
  steps: [
    { name: '站位', alt: '破楼梯口直架的站位', image: step1 },
    { name: '瞄准位置', alt: '破楼梯口直架的瞄准位置', image: step2 },
  ],
}
