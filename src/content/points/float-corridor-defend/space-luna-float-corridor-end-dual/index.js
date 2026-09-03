import step1 from './01-electric.png'
import step2 from './02-grenade.png'

export default {
  id: 'space-luna-float-corridor-end-dual',
  map: 'space',
  operator: 'luna',
  name: '走廊尽头直架',
  description: '电箭蓄力不反弹；手雷2秒丢',
  throwables: ['electric-arrow', 'grenade'],
  sort: 1,
  steps: [
    {
      name: '电箭',
      alt: '走廊尽头直架（电箭），蓄力不反弹',
      image: step1,
      video: { url: 'https://www.bilibili.com/video/BV14KcxzMEYi?t=66', bvid: 'BV14KcxzMEYi', start: 66 },
    },
    {
      name: '手雷',
      alt: '走廊尽头直架（手雷），2秒丢',
      image: step2,
      video: { url: 'https://www.bilibili.com/video/BV14KcxzMEYi?t=79', bvid: 'BV14KcxzMEYi', start: 79 },
    },
  ],
}
