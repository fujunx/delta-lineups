import step1 from './01-position.svg'
import step2 from './02-aim.svg'
import step3 from './03-result.svg'

export default {
  id: 'space-luna-mid-launch',
  map: 'space',
  operator: 'luna',
  name: '发射点西大点火',
  summary: '开局发射点西大，封锁中路',
  video: {
    url: 'https://www.bilibili.com/video/BV12gA4z3ETZ/?t=7',
    bvid: 'BV12gA4z3ETZ',
    start: 7,
  },
  steps: [
    { name: '站位', alt: '发射点西大的站位', image: step1 },
    { name: '瞄准点', alt: '瞄准点示意', image: step2 },
    { name: '落点', alt: '落点效果', image: step3 },
  ],
}
