import step1 from './01-position.svg'
import step2 from './02-aim.svg'
import step3 from './03-throw.svg'
import step4 from './04-result.svg'

export default {
  id: 'dam-vlong-rooftop',
  map: 'dam',
  operator: 'vlong',
  name: '顶楼燃烧瓶',
  summary: '开局烧顶楼，抢开局压制',
  video: {
    url: 'https://www.bilibili.com/video/BV1ti4y187sB/?t=5',
    bvid: 'BV1ti4y187sB',
    start: 5,
  },
  steps: [
    { name: '站位', alt: '顶楼燃烧瓶的站位', image: step1 },
    { name: '瞄准点', alt: '瞄准点示意', image: step2 },
    { name: '投掷动作', alt: '投掷动作', image: step3 },
    { name: '落点', alt: '落点效果', image: step4 },
  ],
}
