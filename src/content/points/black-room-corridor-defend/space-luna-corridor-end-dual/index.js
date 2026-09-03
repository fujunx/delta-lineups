import step1 from './01-electric.png'
import step2 from './02-grenade.png'
import step3 from './03-box.png'

export default {
  id: 'space-luna-corridor-end-dual',
  map: 'space',
  operator: 'luna',
  name: '走廊尽头直架位',
  description: '电箭反弹，点射；手雷2.4秒丢；箱后蓄力',
  throwables: ['electric-arrow', 'grenade'],
  sort: 1,
  video: {
    url: 'https://www.bilibili.com/video/BV1FjFSzdE4Y?t=37',
    bvid: 'BV1FjFSzdE4Y',
    start: 37,
  },
  steps: [
    { name: '电箭', alt: '左探头能看到灰色条就停，准星对准灰条夹角，反弹点射', image: step1 },
    { name: '手雷', alt: '走廊尽头直架位（手雷），2.4秒丢', image: step2 },
    {
      name: '走廊尽头箱后',
      alt: '瞄准灰条偏右的白色墙，反弹蓄力',
      image: step3,
      video: { url: 'https://www.bilibili.com/video/BV1FjFSzdE4Y?t=73', bvid: 'BV1FjFSzdE4Y', start: 73 },
    },
  ],
}
