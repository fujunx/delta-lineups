import step1 from './01-electric.png'
import step2 from './02-position.png'
import step3 from './03-aim.png'

export default {
  id: 'space-luna-corridor-glass-grenade',
  map: 'space',
  operator: 'luna',
  name: '玻璃拐角',
  description: '电箭跳跃点射；手雷2秒丢',
  throwables: ['electric-arrow', 'grenade'],
  sort: 3,
  steps: [
    {
      name: '电箭',
      alt: '站在缺口前，跳跃点射一根电箭',
      image: step1,
      video: { url: 'https://www.bilibili.com/video/BV1WW6eBKEuz?t=71', bvid: 'BV1WW6eBKEuz', start: 71 },
    },
    {
      name: '手雷 · 站位',
      alt: '玻璃拐角（手雷）的站位',
      image: step2,
      video: { url: 'https://www.bilibili.com/video/BV14KcxzMEYi?t=48', bvid: 'BV14KcxzMEYi', start: 48 },
    },
    {
      name: '手雷 · 瞄准',
      alt: '玻璃拐角（手雷）的瞄准位置',
      image: step3,
      video: { url: 'https://www.bilibili.com/video/BV14KcxzMEYi?t=48', bvid: 'BV14KcxzMEYi', start: 48 },
    },
  ],
}
