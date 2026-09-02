<script setup>
/**
 * 核心“战术工作台”视图。
 * 布局：顶部筛选栏，下方固定三栏（点位列表 / 视频区域 / 有序步骤图）。
 * 任何分辨率下都保持三栏，宽度不足时压缩中间的视频区域。
 */
import { computed, ref } from 'vue'
import { useLineupQuery } from '../composables/useLineupQuery'
import { findMap, findOperator } from '../content/catalog'
import FilterBar from '../components/filters/FilterBar.vue'
import PointList from '../components/point-list/PointList.vue'
import PointDetail from '../components/point-detail/PointDetail.vue'
import StepGallery from '../components/point-detail/StepGallery.vue'
import ImageViewer from '../components/image-viewer/ImageViewer.vue'

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

/** 当前打开的全屏图片索引，null 表示关闭。 */
const viewerIndex = ref(null)

function openViewer(i) {
  viewerIndex.value = i
}

function closeViewer() {
  viewerIndex.value = null
}

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

      <aside class="workspace__steps panel">
        <StepGallery :steps="currentPoint?.steps || []" @open="openViewer" />
      </aside>
    </main>

    <ImageViewer
      v-if="viewerIndex !== null"
      :images="currentPoint?.steps || []"
      :index="viewerIndex"
      @close="closeViewer"
      @update:index="(i) => (viewerIndex = i)"
    />
  </div>
</template>
