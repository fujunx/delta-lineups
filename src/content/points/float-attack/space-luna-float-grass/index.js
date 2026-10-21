import step1 from './01-float.png'

export default {
  id: 'space-luna-float-grass',
  map: 'space',
  operator: 'luna',
  name: '总裁外探测箭（射草）',
  description: '先PEEK一下前点有没有人',
  throwables: ['detect-arrow'],
  sort: 3,
  steps: [
    {
      name: '浮力方向',
      alt: '右侧边缘对齐第一个小金突起，蓄力拉满射出',
      image: step1,
    },
  ],
}
