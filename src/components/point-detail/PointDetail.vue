<script setup>
/**
 * 点位详情（右栏“图片”区域）：点位标题/标签/说明 + 视频跳转入口 + 有序步骤图。
 * 网站内不播放视频，仅提供跳转到 B 站的公链入口。
 * 无点位或异常时显示明确空态。全屏图片查看器在此统一管理。
 */
import { computed, ref } from 'vue'
import { parseBilibili, buildExternalUrl } from '../../utils/bilibili'
import { findCategory } from '../../content/catalog'
import StepGallery from './StepGallery.vue'
import ImageViewer from '../image-viewer/ImageViewer.vue'

const props = defineProps({
  point: { type: Object, default: null },
  mapName: { type: String, default: '' },
  operatorName: { type: String, default: '' },
})

/** 解析当前点位的视频链接（便于跳转到 B 站）。 */
const videoInfo = computed(() => parseBilibili(props.point?.video?.url || ''))
const externalUrl = computed(() => buildExternalUrl(videoInfo.value))
const startSeconds = computed(() => videoInfo.value.start)
const categoryName = computed(() => findCategory(props.point?.category)?.name ?? '')

/** 当前打开的全屏图片索引，null 表示关闭。 */
const viewerIndex = ref(null)

function openViewer(i) {
  viewerIndex.value = i
}
function closeViewer() {
  viewerIndex.value = null
}
</script>

<template>
  <article class="detail" aria-live="polite">
    <template v-if="point">
      <header class="detail__head">
        <div class="detail__tags">
          <span class="tag">{{ categoryName }}</span>
          <span class="tag">{{ mapName }}</span>
          <span class="tag">{{ operatorName }}</span>
        </div>
        <h2 class="detail__title">{{ point.name }}</h2>
        <p class="detail__summary">{{ point.summary }}</p>
      </header>

      <div class="detail__videohead">
        <h3 class="detail__subtitle">视频</h3>
        <a
          v-if="externalUrl"
          :href="externalUrl"
          class="detail__externallink detail__externallink--primary"
          target="_blank"
          rel="noopener noreferrer"
        >
          <span class="detail__play" aria-hidden="true">▶</span>
          在 B 站打开{{ startSeconds > 0 ? `（${startSeconds}s）` : '' }}
        </a>
        <span v-else class="detail__unavailable">视频链接无效</span>
      </div>

      <div class="detail__stepshead">
        <h3 class="detail__subtitle">步骤图</h3>
        <span class="detail__count">{{ point.steps?.length || 0 }} 张</span>
      </div>
      <StepGallery :steps="point.steps" @open="openViewer" />

      <ImageViewer
        v-if="viewerIndex !== null"
        :images="point.steps"
        :index="viewerIndex"
        @close="closeViewer"
        @update:index="(i) => (viewerIndex = i)"
      />
    </template>

    <div v-else class="detail__empty">
      <p class="detail__empty-title">没有匹配点位</p>
      <p class="detail__empty-text">当前地图与干员暂时没有收录点位，请尝试其他组合。</p>
    </div>
  </article>
</template>
