import step1 from './01-combined.png'

export default {
  id: 'space-luna-corridor-end-box',
  map: 'space',
  operator: 'luna',
  name: '走廊尽头箱后',
  description: '电箭反弹，蓄力',
  throwables: ['electric-arrow'],
  sort: 2,
  video: {
    url: 'https://www.bilibili.com/video/BV1FjFSzdE4Y?t=73',
    bvid: 'BV1FjFSzdE4Y',
    start: 73,
  },
  steps: [
    { name: '站位与瞄准', alt: '瞄准灰条偏右的白色墙，反弹蓄力', image: step1 },
  ],
}
