import step1 from './01-position.png'
import step2 from './02-aim.png'

export default {
  id: 'space-luna-laoda-eryuan',
  map: 'space',
  operator: 'luna',
  name: '牢大电二员',
  summary: '看二员是否过点',
  video: {
    url: 'https://www.bilibili.com/video/BV1ywRNBZEUH?t=75',
    bvid: 'BV1ywRNBZEUH',
    start: 75,
  },
  steps: [
    { name: '站位', alt: '抵住箱子夹角', image: step1 },
    { name: '瞄准位置', alt: '第三准星对准路灯左上角，跳跃点射', image: step2 },
  ],
}
