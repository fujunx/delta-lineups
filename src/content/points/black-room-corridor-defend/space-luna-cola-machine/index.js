import step1 from './01-combined.png'

export default {
  id: 'space-luna-cola-machine',
  map: 'space',
  operator: 'luna',
  name: '可乐机',
  description: '蓄力不反弹',
  throwables: ['electric-arrow'],
  sort: 3,
  video: {
    url: 'https://www.bilibili.com/video/BV1FjFSzdE4Y?t=87',
    bvid: 'BV1FjFSzdE4Y',
    start: 87,
  },
  steps: [
    { name: '站位与瞄准', alt: '瞄准白色的石头，蓄力拉满直接射', image: step1 },
  ],
}
