import step1 from './01-position.svg'
import step2 from './02-result.svg'

export default {
  id: 'space-luna-pair',
  map: 'space',
  operator: 'luna',
  name: '双图示例·双控点',
  summary: '演示双图放大占满（2 张）',
  video: {
    url: 'https://www.bilibili.com/video/BV1Yz411K7ov/?t=6',
    bvid: 'BV1Yz411K7ov',
    start: 6,
  },
  steps: [
    { name: '站位', alt: '站位', image: step1 },
    { name: '落点', alt: '落点效果', image: step2 },
  ],
}
