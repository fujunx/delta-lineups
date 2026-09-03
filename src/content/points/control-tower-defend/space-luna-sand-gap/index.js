import step1 from './01-grenade.png'
import step2 from './02-electric.png'

export default {
  id: 'space-luna-sand-gap',
  map: 'space',
  operator: 'luna',
  name: '沙地缺口',
  description: '会议室门口站位；瞄准柱子的阴面；电箭点射；手雷2秒丢',
  throwables: ['electric-arrow', 'grenade'],
  sort: 1,
  steps: [
    { name: '手雷', alt: '沙地缺口站位/瞄准点（手雷），掐到2秒钟出手', image: step1 },
    { name: '电箭', alt: '沙地缺口站位/瞄准点（电箭），点射，开不开反弹都行', image: step2 },
  ],
}
