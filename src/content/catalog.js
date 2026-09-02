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
