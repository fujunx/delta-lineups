/**
 * 地图与干员目录配置。
 *
 * 新增地图或干员只需在此追加一项，不应修改筛选组件结构。
 */
export const MAPS = [
  { id: 'dam', name: '大坝' },
  { id: 'space', name: '航天' },
]

export const OPERATORS = [
  { id: 'luna', name: '露娜' },
  { id: 'vlong', name: '威龙' },
]

/** 首次访问 / URL 无合法状态时的默认查询条件。 */
export const DEFAULT_MAP = 'space'
export const DEFAULT_OPERATOR = 'luna'

/** 根据 id 查找地图条目，找不到返回 null。 */
export function findMap(id) {
  return MAPS.find((m) => m.id === id) ?? null
}

/** 根据 id 查找干员条目，找不到返回 null。 */
export function findOperator(id) {
  return OPERATORS.find((o) => o.id === id) ?? null
}

/**
 * 创作者（UP 主）B 站空间快捷入口。
 * 仅作为跳转链接，帮助用户快速进入相应创作者主页查找点位。
 */
export const CREATORS = [
  {
    id: 'muxia-fps',
    name: '慕夏FPS-露娜教官',
    scope: '航天 露娜',
    url: 'https://space.bilibili.com/3546612506823300',
  },
  {
    id: 'qinlao-xiaomi',
    name: '勤捞小蜜',
    scope: '全地图通用',
    url: 'https://space.bilibili.com/3494372861545409',
  },
]

/**
 * 点位类别（场景/阶段分组）配置。
 * 内容目录按此分组：src/content/points/<category>/
 * 新增类别只需在此追加一项，并把对应点位移入对应目录。
 */
export const CATEGORIES = [
  { id: 'opening', name: '开局' },
  { id: 'control-tower-defend', name: '中控楼防守' },
  { id: 'float-attack', name: '浮力进攻总裁' },
  { id: 'float-corridor-defend', name: '浮力走廊防守' },
  { id: 'black-market-attack', name: '黑室进攻总裁' },
  { id: 'black-room-corridor-defend', name: '黑室走廊防守' },
]

/** 根据 id 查找点位类别，找不到返回 null。 */
export function findCategory(id) {
  return CATEGORIES.find((c) => c.id === id) ?? null
}

/**
 * 道具配置。每个点位必须填写道具（throwable）。
 * short：展示在名称前的 2 字标签；color：标签颜色（hex）。
 * 暂按露娜的道具维护；如后续其它干员引入道具，可在此追加。
 */
export const THROWABLES = [
  { id: 'electric-arrow', name: '电箭', short: '电箭', color: '#2563eb' }, // 雷电蓝
  { id: 'grenade', name: '手雷', short: '手雷', color: '#16a34a' },
  { id: 'detect-arrow', name: '探测箭', short: '探测', color: '#dc2626' },
]

/** 根据 id 查找道具，找不到返回 null。 */
export function findThrowable(id) {
  return THROWABLES.find((t) => t.id === id) ?? null
}
