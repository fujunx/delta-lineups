import step1 from './01-combined.png'

export default {
  id: 'space-luna-corridor-mid-box',
  map: 'space',
  operator: 'luna',
  name: '走廊中部箱后头皮位',
  description: '',
  throwables: ['grenade'],
  sort: 2,
  video: {
    url: 'https://www.bilibili.com/video/BV1QnFnzbEYr?t=30',
    bvid: 'BV1QnFnzbEYr',
    start: 30,
  },
  steps: [
    { name: '站位与瞄准', alt: '左探头，以箱子为准第3块玻璃，1.5秒丢', image: step1 },
  ],
}
