/**
 * 查询工作台的核心状态逻辑。
 *
 * 区分两组筛选状态：
 * - draft（待查询条件）：用户当前在控件中选择的地图和干员。
 * - applied（已应用条件）：最近一次点击“查询”后实际展示的地图和干员。
 *
 * 类别（一级菜单）：selectedCategory 为当前类别筛选；'all' 表示全部（列表按类别分组展示）。
 * 仅当点击“查询”才把 draft 应用到结果列表。
 * URL Hash 表达：已应用地图、已应用干员、当前类别、当前点位 ID，可刷新恢复 / 深链直达。
 */
import { ref, computed, watch, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import {
  MAPS,
  OPERATORS,
  DEFAULT_MAP,
  DEFAULT_OPERATOR,
  findMap,
  findOperator,
  findCategory,
} from '../content/catalog'
import { getPoints, getPointById } from '../content'

const CATEGORY_ALL = 'all'

export function useLineupQuery() {
  const router = useRouter()
  const route = useRoute()

  /** 待查询条件（控件绑定）。 */
  const draftMap = ref(DEFAULT_MAP)
  const draftOperator = ref(DEFAULT_OPERATOR)

  /** 已应用条件与当前选中点位/类别。 */
  const appliedMap = ref(DEFAULT_MAP)
  const appliedOperator = ref(DEFAULT_OPERATOR)
  const selectedPointId = ref(null)
  const selectedCategory = ref(CATEGORY_ALL)

  /** 当前地图/干员下、按类别过滤后的可见点位。 */
  const currentPoints = computed(() => {
    const base = getPoints({ map: appliedMap.value, operator: appliedOperator.value })
    if (selectedCategory.value === CATEGORY_ALL) return base
    return base.filter((p) => p.category === selectedCategory.value)
  })
  const currentPoint = computed(() => getPointById(selectedPointId.value))

  /** 依据 URL 解析并回退到合法默认值。未知地图/干员/类别/点位一律回退，不抛错。 */
  function resolveFromRoute() {
    const qMap = route.query.map
    const qOp = route.query.op
    const qCat = route.query.cat
    const qPoint = route.query.point

    const validMap = findMap(qMap) ? qMap : DEFAULT_MAP
    const validOp = findOperator(qOp) ? qOp : DEFAULT_OPERATOR
    const validCat = qCat === CATEGORY_ALL || findCategory(qCat) ? qCat : CATEGORY_ALL

    const comboPoints = getPoints({ map: validMap, operator: validOp })
    const visible = validCat === CATEGORY_ALL ? comboPoints : comboPoints.filter((p) => p.category === validCat)
    const validPoint = visible.some((p) => p.id === qPoint) ? qPoint : (visible[0]?.id ?? null)

    appliedMap.value = validMap
    appliedOperator.value = validOp
    selectedCategory.value = validCat
    selectedPointId.value = validPoint
    draftMap.value = validMap
    draftOperator.value = validOp
  }

  /** 点击“查询”：应用 draft 到 URL。 */
  function commitQuery() {
    router.push({
      query: buildQuery(draftMap.value, draftOperator.value, selectedCategory.value, currentPointIdFor(draftMap.value, draftOperator.value, selectedCategory.value)),
    })
  }

  /** 选择某个点位：仅更新 URL 的 point。 */
  function applySelection(pointId) {
    if (pointId === selectedPointId.value) return
    router.replace({
      query: buildQuery(appliedMap.value, appliedOperator.value, selectedCategory.value, pointId),
    })
  }

  /** 选择类别（一级菜单）：更新类别并保持点位的合法性。 */
  function selectCategory(category) {
    if (category === selectedCategory.value) return
    const comboPoints = getPoints({ map: appliedMap.value, operator: appliedOperator.value })
    const visible = category === CATEGORY_ALL ? comboPoints : comboPoints.filter((p) => p.category === category)
    const nextPoint = visible.some((p) => p.id === selectedPointId.value)
      ? selectedPointId.value
      : (visible[0]?.id ?? null)
    router.replace({
      query: buildQuery(appliedMap.value, appliedOperator.value, category, nextPoint),
    })
  }

  function currentPointIdFor(map, operator, category) {
    const base = getPoints({ map, operator })
    const visible = category === CATEGORY_ALL ? base : base.filter((p) => p.category === category)
    return visible[0]?.id ?? null
  }

  function buildQuery(map, operator, category, point) {
    return { map, op: operator, cat: category, point }
  }

  /* 跟随 URL 变化（含前进/后退与深链粘贴）。 */
  watch(() => route.query, resolveFromRoute)

  /* 首次访问：解析默认值，并把合法状态写入 URL。 */
  onMounted(() => {
    resolveFromRoute()
    if (!route.query.map) {
      router.replace({
        query: buildQuery(appliedMap.value, appliedOperator.value, selectedCategory.value, selectedPointId.value),
      })
    }
  })

  return {
    mapOptions: MAPS,
    operatorOptions: OPERATORS,
    draftMap,
    draftOperator,
    appliedMap,
    appliedOperator,
    selectedCategory,
    selectedPointId,
    currentPoints,
    currentPoint,
    commitQuery,
    applySelection,
    selectCategory,
  }
}
