/**
 * 点位内容注册与查询。
 *
 * 通过 Vite 自动发现 src/content/points/<category>/<point-id>/index.js 下所有内容模块，
 * 避免把几十个点位堆在单个数据文件中。每个点位拥有独立目录和内容配置，
 * 目录层级的第一层为点位类别（见 catalog.js CATEGORIES）。
 */
import { findMap, findOperator, findCategory } from './catalog'

const modules = import.meta.glob('./points/*/*/index.js', { eager: true })

/**
 * 从模块路径解析类别与点位 ID。
 * 路径形如 ./points/<category>/<point-id>/index.js
 */
function parsePointPath(dir) {
  const parts = dir.split('/')
  return { category: parts[2], id: parts[3] }
}

const points = Object.entries(modules)
  .map(([dir, mod]) => {
    const point = mod.default
    const { category } = parsePointPath(dir)
    return point ? { ...point, category } : null
  })
  .filter(Boolean)

/* ---------------------------------- 查询 ---------------------------------- */

/** 按地图 + 干员过滤点位。 */
export function getPoints({ map, operator }) {
  return points.filter((p) => p.map === map && p.operator === operator)
}

/** 按稳定 ID 查找单个点位。 */
export function getPointById(id) {
  return points.find((p) => p.id === id) ?? null
}

/** 全量点位（主要用于调试 / 校验）。 */
export function allPoints() {
  return points
}

/** 判断某地图与干员是否存在合法组合内的点位。 */
export function hasPoints({ map, operator }) {
  return getPoints({ map, operator }).length > 0
}

/* ---------------------------------- 校验 ---------------------------------- */

/** 校验点位对象是否满足必填字段与关联有效性，返回错误列表。 */
export function validatePoint(point) {
  const errors = []
  if (!point || typeof point !== 'object') return ['点位对象缺失或格式无效']

  const requiredStrings = ['id', 'map', 'operator', 'name', 'summary']
  for (const key of requiredStrings) {
    if (typeof point[key] !== 'string' || !point[key].trim()) {
      errors.push(`缺少必填字符串字段: ${key}`)
    }
  }

  if (!findMap(point.map)) errors.push(`未知地图: ${point.map}`)
  if (!findOperator(point.operator)) errors.push(`未知干员: ${point.operator}`)
  if (!findCategory(point.category)) errors.push(`未知点位类别: ${point.category}`)

  const video = point.video
  if (!video) {
    errors.push('缺少视频信息: video')
  } else if (typeof video.url !== 'string' || !video.url.trim()) {
    errors.push('缺少视频地址: video.url')
  } else if (!video.bvid) {
    errors.push('B 站链接无法解析出 BV 号')
  }

  if (!Array.isArray(point.steps) || point.steps.length < 1 || point.steps.length > 4) {
    errors.push('步骤图数量必须在 1~4 张')
  } else {
    point.steps.forEach((s, i) => {
      if (!s || typeof s.image !== 'string' || !s.image) {
        errors.push(`第 ${i + 1} 张步骤图缺少 image`)
      }
    })
  }

  return errors
}

/** 对全量点位做一次整体校验，返回 { valid, errors } 与总结。 */
export function validateAll() {
  const results = points.map((p) => ({ id: p.id, errors: validatePoint(p) }))
  const invalid = results.filter((r) => r.errors.length > 0)
  return {
    valid: invalid.length === 0,
    count: points.length,
    invalid,
  }
}
