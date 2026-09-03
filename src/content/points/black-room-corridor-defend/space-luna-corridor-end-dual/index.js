import step1 from './01-electric.png'
import step2 from './02-grenade.png'

export default {
  id: 'space-luna-corridor-end-dual',
  map: 'space',
  operator: 'luna',
  name: '走廊尽头直架位',
  description: '电箭反弹，点射；手雷2.4秒丢',
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
  ],
}
