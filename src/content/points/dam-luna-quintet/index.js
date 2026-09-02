import step1 from './01-position.svg'
import step2 from './02-aim.svg'
import step3 from './03-throw.svg'
import step4 from './04-result.svg'
import step5 from './05-effect.svg'

export default {
  id: 'dam-luna-quintet',
  map: 'dam',
  operator: 'luna',
  name: '五图示例·多步点',
  summary: '演示每行 3 张滚动（5 张）',
  video: {
    url: 'https://www.bilibili.com/video/BV1xe411w7Az/?t=9',
    bvid: 'BV1xe411w7Az',
    start: 9,
  },
  steps: [
    { name: '站位', alt: '站位', image: step1 },
    { name: '瞄准点', alt: '瞄准点示意', image: step2 },
    { name: '投掷动作', alt: '投掷动作', image: step3 },
    { name: '落点', alt: '落点效果', image: step4 },
    { name: '效果确认', alt: '效果确认', image: step5 },
  ],
}
