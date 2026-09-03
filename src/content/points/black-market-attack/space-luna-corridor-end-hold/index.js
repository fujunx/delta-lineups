import step1 from './01-position.png'
import step2 from './02-aim.png'

export default {
  id: 'space-luna-corridor-end-hold',
  map: 'space',
  operator: 'luna',
  name: '走廊尽头直架位',
  description: '',
  throwables: ['grenade'],
  sort: 3,
  video: {
    url: 'https://www.bilibili.com/video/BV1QnFnzbEYr?t=52',
    bvid: 'BV1QnFnzbEYr',
    start: 52,
  },
  steps: [
    { name: '站位', alt: '走廊尽头直架位的站位', image: step1 },
    { name: '瞄准位置', alt: '走廊尽头直架位的瞄准位置', image: step2 },
  ],
}
