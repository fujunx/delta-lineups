import step1 from './01-float.png'

export default {
  id: 'space-luna-float-grass',
  map: 'space',
  operator: 'luna',
  name: '浮力射草',
  description: '先PEEK一下前点有没有人',
  throwable: 'detect-arrow',
  sort: 1,
  steps: [
    { name: '浮力方向', alt: '瞄准门口那棵草', image: step1 },
  ],
}
