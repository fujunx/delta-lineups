/**
 * 查询工作台的核心状态逻辑。
 *
 * 区分两组筛选状态：
 * - draft（待查询条件）：用户当前在控件中选择的地图和干员。
 * - applied（已应用条件）：最近一次点击“查询”后实际展示的地图和干员。
 *
 * 仅当点击“查询”才把 draft 应用到结果列表。
 * URL Hash 表达：已应用地图、已应用干员、当前点位 ID，可刷新恢复 / 深链直达。
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
} from '../content/catalog'
import { getPoints, getPointById } from '../content'

export function useLineupQuery() {
  const router = useRouter()
  const route = useRoute()

  /** 待查询条件（控件绑定）。 */
  const draftMap = ref(DEFAULT_MAP)
  const draftOperator = ref(DEFAULT_OPERATOR)

  /** 已应用条件与当前选中点位。 */
  const appliedMap = ref(DEFAULT_MAP)
  const appliedOperator = ref(DEFAULT_OPERATOR)
  const selectedPointId = ref(null)

  /** 当前已应用条件下的结果。 */
  const currentPoints = computed(() =>
    getPoints({ map: appliedMap.value, operator: appliedOperator.value })
  )
  const currentPoint = computed(() => getPointById(selectedPointId.value))

  /** 依据 URL 解析并回退到合法默认值。未知地图/干员/点位一律回退，不抛错。 */
  function resolveFromRoute() {
    const qMap = route.query.map
    const qOp = route.query.op
    const qPoint = route.query.point

    const validMap = findMap(qMap) ? qMap : DEFAULT_MAP
    const validOp = findOperator(qOp) ? qOp : DEFAULT_OPERATOR
    const comboPoints = getPoints({ map: validMap, operator: validOp })
    const validPoint = comboPoints.some((p) => p.id === qPoint)
      ? qPoint
      : (comboPoints[0]?.id ?? null)

    appliedMap.value = validMap
    appliedOperator.value = validOp
    selectedPointId.value = validPoint
    draftMap.value = validMap
    draftOperator.value = validOp
  }

  /** 点击“查询”：应用 draft 到 URL。 */
  function commitQuery() {
    const first = currentPointIdFor(draftMap.value, draftOperator.value)
    router.push({
      query: {
        map: draftMap.value,
        op: draftOperator.value,
        point: first,
      },
    })
  }

  /** 选择某个点位：仅更新 URL 的 point，不触发整页跳转。 */
  function applySelection(pointId) {
    if (pointId === selectedPointId.value) return
    router.replace({
      query: {
        map: appliedMap.value,
        op: appliedOperator.value,
        point: pointId,
      },
    })
  }

  function currentPointIdFor(map, operator) {
    return getPoints({ map, operator })[0]?.id ?? null
  }

  /* 跟随 URL 变化（含前进/后退与深链粘贴）。 */
  watch(() => route.query, resolveFromRoute)

  /* 首次访问：解析默认值，并把合法状态写入 URL。 */
  onMounted(() => {
    resolveFromRoute()
    if (!route.query.map) {
      router.replace({
        query: {
          map: appliedMap.value,
          op: appliedOperator.value,
          point: selectedPointId.value,
        },
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
    selectedPointId,
    currentPoints,
    currentPoint,
    commitQuery,
    applySelection,
  }
}
