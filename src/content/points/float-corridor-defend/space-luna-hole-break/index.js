import step1 from './01-position.png'
import step2 from './02-aim.png'

export default {
  id: 'space-luna-hole-break',
  map: 'space',
  operator: 'luna',
  name: '破洞直架',
  description: '反弹、点射',
  throwables: ['electric-arrow'],
  sort: 3,
  video: {
    url: 'https://www.bilibili.com/video/BV14KcxzMEYi?t=30',
    bvid: 'BV14KcxzMEYi',
    start: 30,
  },
  steps: [
    { name: '站位', alt: '破洞直架的站位', image: step1 },
    { name: '瞄准位置', alt: '破洞直架的瞄准位置', image: step2 },
  ],
}
