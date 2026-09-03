import step1 from './01-position.png'
import step2 from './02-aim.png'

export default {
  id: 'space-luna-corridor-glass-grenade',
  map: 'space',
  operator: 'luna',
  name: '玻璃拐角',
  description: '2秒丢',
  throwables: ['grenade'],
  sort: 4,
  video: {
    url: 'https://www.bilibili.com/video/BV14KcxzMEYi?t=48',
    bvid: 'BV14KcxzMEYi',
    start: 48,
  },
  steps: [
    { name: '站位', alt: '玻璃拐角的站位', image: step1 },
    { name: '瞄准位置', alt: '玻璃拐角的瞄准位置', image: step2 },
  ],
}
