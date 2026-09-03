import step1 from './01-position.png'
import step2 from './02-aim.png'

export default {
  id: 'space-luna-float-glass-corner',
  map: 'space',
  operator: 'luna',
  name: '玻璃拐角直架',
  description: '反弹，蓄力射出',
  throwables: ['electric-arrow'],
  sort: 1,
  video: {
    url: 'https://www.bilibili.com/video/BV1QnFnzbEYr?t=84',
    bvid: 'BV1QnFnzbEYr',
    start: 84,
  },
  steps: [
    { name: '站位', alt: '浮力进攻总裁 玻璃拐角直架的站位', image: step1 },
    { name: '瞄准位置', alt: '浮力进攻总裁 玻璃拐角直架的瞄准位置', image: step2 },
  ],
}
