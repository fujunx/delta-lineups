<script setup>
/**
 * 核心“战术工作台”视图。
 * 布局：顶部筛选栏，下方固定两栏（点位列表 / 图片）。
 * 任何分辨率下都保持两栏，宽度不足时压缩右栏图片区域。
 * 视频不在网站内播放，仅提供跳转到 B 站的入口。
 */
import { computed } from 'vue'
import { useLineupQuery } from '../composables/useLineupQuery'
import { findMap, findOperator } from '../content/catalog'
import FilterBar from '../components/filters/FilterBar.vue'
import PointList from '../components/point-list/PointList.vue'
import PointDetail from '../components/point-detail/PointDetail.vue'

const {
  mapOptions,
  operatorOptions,
  draftMap,
  draftOperator,
  currentPoints,
  currentPoint,
  appliedMap,
  appliedOperator,
  selectedPointId,
  commitQuery,
  applySelection,
} = useLineupQuery()

const mapName = computed(() => findMap(appliedMap.value)?.name ?? '')
const operatorName = computed(() => findOperator(appliedOperator.value)?.name ?? '')

function selectPoint(id) {
  applySelection(id)
}
</script>

<template>
  <div class="workspace">
    <FilterBar
      v-model:map="draftMap"
      v-model:operator="draftOperator"
      :map-options="mapOptions"
      :operator-options="operatorOptions"
      :result-count="currentPoints.length"
      @query="commitQuery"
    />

    <main class="workspace__body">
      <aside class="workspace__list panel">
        <h2 class="panel__title">点位列表</h2>
        <PointList
          :points="currentPoints"
          :selected-id="selectedPointId"
          @select="selectPoint"
        />
      </aside>

      <section class="workspace__detail panel">
        <PointDetail
          :point="currentPoint"
          :map-name="mapName"
          :operator-name="operatorName"
        />
      </section>
    </main>
  </div>
</template>
