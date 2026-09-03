import step1 from './01-electric.png'
import step2 from './02-grenade.png'

export default {
  id: 'space-luna-glass-corner-grenade',
  map: 'space',
  operator: 'luna',
  name: '玻璃拐角',
  description: '电箭跳跃点射；手雷2秒丢',
  throwables: ['electric-arrow', 'grenade'],
  sort: 4,
  steps: [
    {
      name: '手雷',
      alt: '抛物线延伸过去，掐两秒钟出手（拐角的满炸）',
      image: step2,
      video: { url: 'https://www.bilibili.com/video/BV1FjFSzdE4Y?t=94', bvid: 'BV1FjFSzdE4Y', start: 94 },
    },
    {
      name: '电箭',
      alt: '站在缺口前，跳跃点射一根电箭',
      image: step1,
      video: { url: 'https://www.bilibili.com/video/BV1WW6eBKEuz?t=71', bvid: 'BV1WW6eBKEuz', start: 71 },
    },
  ],
}
