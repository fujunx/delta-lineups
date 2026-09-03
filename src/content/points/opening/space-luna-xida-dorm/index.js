import step1 from './01-position.png'
import step2 from './02-aim.png'

export default {
  id: 'space-luna-xida-dorm',
  map: 'space',
  operator: 'luna',
  name: '西大炸宿舍',
  description: '',
  throwables: ['grenade'],
  sort: 5,
  steps: [
    { name: '站位', alt: '踩上箭头与黄条中间的地块时抬头', image: step1 },
    { name: '瞄准位置', alt: '一直跑不停丢2个雷，往上两层楼的高度', image: step2 },
  ],
}
