import step1 from './01-combined.png'

export default {
  id: 'space-luna-break-corner',
  map: 'space',
  operator: 'luna',
  name: '玻璃拐角直架',
  description: '跳跃，点射（瞄准左上玻璃尽头）',
  throwables: ['electric-arrow'],
  sort: 4,
  video: {
    url: 'https://www.bilibili.com/video/BV1WW6eBKEuz?t=71',
    bvid: 'BV1WW6eBKEuz',
    start: 71,
  },
  steps: [
    { name: '站位与瞄准', alt: '站在缺口前，跳跃点射一根电箭', image: step1 },
  ],
}
