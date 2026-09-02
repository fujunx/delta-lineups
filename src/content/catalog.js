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
  { id: 'defend', name: '总裁防守' },
  { id: 'attack', name: '进攻总裁' },
]

/** 根据 id 查找点位类别，找不到返回 null。 */
export function findCategory(id) {
  return CATEGORIES.find((c) => c.id === id) ?? null
}
