import step1 from './01-black-market.png'

export default {
  id: 'space-luna-black-h',
  map: 'space',
  operator: 'luna',
  name: '黑市射H',
  description: '先PEEK一下前点有没有人',
  throwables: ['detect-arrow'],
  sort: 2,
  steps: [
    { name: '黑市方向', alt: '瞄准字母H上面一点点', image: step1 },
  ],
}
