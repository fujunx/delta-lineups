import step1 from './01-grenade.png'
import step2 from './02-electric.png'
import step3 from './03-balcony.png'

export default {
  id: 'space-luna-sand-gap',
  map: 'space',
  operator: 'luna',
  name: '沙地缺口',
  description: '瞄准柱子的阴面；电箭点射；手雷2秒丢',
  throwables: ['electric-arrow', 'grenade'],
  sort: 1,
  steps: [
    {
      name: '手雷（会议室门口）',
      alt: '会议室门口站位/瞄准点（手雷），掐到2秒钟出手',
      image: step1,
      video: { url: 'https://www.bilibili.com/video/BV1xCFPzzEbk?t=23', bvid: 'BV1xCFPzzEbk', start: 23 },
    },
    {
      name: '电箭（会议室门口）',
      alt: '会议室门口站位/瞄准点（电箭），点射，开不开反弹都行',
      image: step2,
      video: { url: 'https://www.bilibili.com/video/BV1xCFPzzEbk?t=23', bvid: 'BV1xCFPzzEbk', start: 23 },
    },
    {
      name: '电箭（阳台）',
      alt: '沙地缺口 阳台站位（电箭），不开反弹出手',
      image: step3,
      video: { url: 'https://www.bilibili.com/video/BV1xCFPzzEbk?t=50.0', bvid: 'BV1xCFPzzEbk', start: 50 },
    },
  ],
}
