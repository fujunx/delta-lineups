import step1 from './01-combined.png'

export default {
  id: 'space-luna-float-corridor-end',
  map: 'space',
  operator: 'luna',
  name: '走廊尽头直架位',
  description: '1.5秒丢',
  throwables: ['grenade'],
  sort: 2,
  video: {
    url: 'https://www.bilibili.com/video/BV1QnFnzbEYr?t=98',
    bvid: 'BV1QnFnzbEYr',
    start: 98,
  },
  steps: [
    { name: '站位与瞄准', alt: '抛物线延伸过去，1.5秒丢', image: step1 },
  ],
}
