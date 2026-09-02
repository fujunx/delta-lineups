import step1 from './01-position.svg'
import step2 from './02-aim.svg'
import step3 from './03-result.svg'

export default {
  id: 'dam-luna-elevator',
  map: 'dam',
  operator: 'luna',
  name: '电梯间火点',
  summary: '预热电梯间，逼对方绕路',
  video: {
    url: 'https://www.bilibili.com/video/BV1M44y1x7aR/?t=11',
    bvid: 'BV1M44y1x7aR',
    start: 11,
  },
  steps: [
    { name: '站位', alt: '电梯间火点的站位', image: step1 },
    { name: '瞄准点', alt: '瞄准点示意', image: step2 },
    { name: '落点', alt: '落点效果', image: step3 },
  ],
}
