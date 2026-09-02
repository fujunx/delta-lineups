// 生成演示点位的占位步骤图（SVG），仅用于验证内容加载与展示机制。
import { mkdirSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = join(fileURLToPath(new URL('.', import.meta.url)), '..', 'src', 'content', 'points')

const points = [
  {
    id: 'space-luna-mid-launch',
    label: '航天 · 露娜 · 发射点西大点火',
    steps: [
      { n: '01', name: '站位', f: '01-position.svg' },
      { n: '02', name: '瞄准点', f: '02-aim.svg' },
      { n: '03', name: '落点', f: '03-result.svg' },
    ],
  },
  {
    id: 'space-luna-corridor-smoke',
    label: '航天 · 露娜 · 走廊烟点',
    steps: [
      { n: '01', name: '站位', f: '01-position.svg' },
      { n: '02', name: '瞄准点', f: '02-aim.svg' },
      { n: '03', name: '落点', f: '03-result.svg' },
    ],
  },
  {
    id: 'dam-luna-elevator',
    label: '大坝 · 露娜 · 电梯间火点',
    steps: [
      { n: '01', name: '站位', f: '01-position.svg' },
      { n: '02', name: '瞄准点', f: '02-aim.svg' },
      { n: '03', name: '落点', f: '03-result.svg' },
    ],
  },
  {
    id: 'dam-vlong-rooftop',
    label: '大坝 · 威龙 · 顶楼燃烧瓶',
    steps: [
      { n: '01', name: '站位', f: '01-position.svg' },
      { n: '02', name: '瞄准点', f: '02-aim.svg' },
      { n: '03', name: '投掷动作', f: '03-throw.svg' },
      { n: '04', name: '落点', f: '04-result.svg' },
    ],
  },
]

for (const pt of points) {
  const dir = join(root, pt.id)
  mkdirSync(dir, { recursive: true })
  for (const s of pt.steps) {
    const ascii = s.f.replace(/\.svg$/, '')
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1920" height="1080" viewBox="0 0 1920 1080">
  <rect width="1920" height="1080" fill="#0f1115"/>
  <rect x="8" y="8" width="1904" height="1064" fill="none" stroke="#2a2f3a" stroke-width="2"/>
  <text x="60" y="120" fill="#6b7280" font-family="system-ui, sans-serif" font-size="34">DELTA LINEUPS // DEMO PLACEHOLDER</text>
  <text x="60" y="520" fill="#f5c518" font-family="system-ui, sans-serif" font-size="64" font-weight="700">${pt.label}</text>
  <text x="60" y="600" fill="#cbd5e1" font-family="system-ui, sans-serif" font-size="44">${s.n} · ${s.name}</text>
  <text x="60" y="960" fill="#47505c" font-family="system-ui, sans-serif" font-size="30">${ascii}.png → 占位图，待替换为真实截图</text>
</svg>
`
    writeFileSync(join(dir, s.f), svg, 'utf8')
  }
}

console.log(`Generated placeholder images for ${points.length} points.`)
