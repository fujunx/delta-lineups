import step1 from './01-position.png'
import step2 from './02-aim.png'

export default {
  id: 'space-luna-stair-blast',
  map: 'space',
  operator: 'luna',
  name: '楼梯拐角满炸',
  summary: '',
  throwable: 'grenade',
  sort: 1,
  video: {
    url: 'https://www.bilibili.com/video/BV1WW6eBKEuz?t=45.8',
    bvid: 'BV1WW6eBKEuz',
    start: 45.8,
  },
  steps: [
    { name: '站位', alt: '站在稍微靠后的位置', image: step1 },
    { name: '瞄准位置', alt: '抛物线左右平移进去，进去就不要动了，2秒丢出', image: step2 },
  ],
}
