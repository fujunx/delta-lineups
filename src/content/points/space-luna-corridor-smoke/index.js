import step1 from './01-position.svg'
import step2 from './02-aim.svg'
import step3 from './03-result.svg'

export default {
  id: 'space-luna-corridor-smoke',
  map: 'space',
  operator: 'luna',
  name: '走廊烟点',
  summary: '封住走廊视线，安全转点',
  video: {
    url: 'https://www.bilibili.com/video/BV1uE411x7CE/?t=3',
    bvid: 'BV1uE411x7CE',
    start: 3,
  },
  steps: [
    { name: '站位', alt: '走廊烟点的站位', image: step1 },
    { name: '瞄准点', alt: '瞄准点示意', image: step2 },
    { name: '落点', alt: '落点效果', image: step3 },
  ],
}
