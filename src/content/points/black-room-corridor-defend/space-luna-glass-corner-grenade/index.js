import step1 from './01-combined.png'

export default {
  id: 'space-luna-glass-corner-grenade',
  map: 'space',
  operator: 'luna',
  name: '玻璃拐角直架',
  description: '2秒丢',
  throwables: ['grenade'],
  sort: 4,
  video: {
    url: 'https://www.bilibili.com/video/BV1FjFSzdE4Y?t=94',
    bvid: 'BV1FjFSzdE4Y',
    start: 94,
  },
  steps: [
    { name: '站位与瞄准', alt: '抛物线延伸过去，掐两秒钟出手（拐角的满炸）', image: step1 },
  ],
}
