import step1 from './01-position.png'
import step2 from './02-aim.png'

export default {
  id: 'space-luna-glass-corner-hold',
  map: 'space',
  operator: 'luna',
  name: '玻璃拐角直架',
  description: '',
  throwables: ['electric-arrow'],
  sort: 1,
  video: {
    url: 'https://www.bilibili.com/video/BV1QnFnzbEYr?t=13',
    bvid: 'BV1QnFnzbEYr',
    start: 13,
  },
  steps: [
    { name: '站位', alt: '趴下回头，稍微抵住扶手', image: step1 },
    { name: '瞄准位置', alt: '玻璃拐角直架的瞄准位置', image: step2 },
  ],
}
