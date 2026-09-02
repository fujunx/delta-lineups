<script setup>
/**
 * 点位详情（中间“视频栏”）：点位标题/标签/说明 + 视频。
 * 无点位或异常时显示明确空态。全屏图片查看器与步骤图由工作台统一管理。
 */
import { computed } from 'vue'
import { parseBilibili, buildExternalUrl } from '../../utils/bilibili'
import MediaVideo from './MediaVideo.vue'

const props = defineProps({
  point: { type: Object, default: null },
  mapName: { type: String, default: '' },
  operatorName: { type: String, default: '' },
})

/** “在 B 站打开”的原始链接（带开始秒数）。无有效 BV 号时为空。 */
const externalUrl = computed(() => {
  const url = props.point?.video?.url
  if (!url) return ''
  return buildExternalUrl(parseBilibili(url))
})
</script>

<template>
  <article class="detail" aria-live="polite">
    <template v-if="point">
      <header class="detail__head">
        <div class="detail__tags">
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
          class="detail__externallink"
          target="_blank"
          rel="noopener noreferrer"
        >
          在 B 站打开
        </a>
      </div>

      <MediaVideo
        :url="point.video?.url || ''"
        :local="point.video?.local || ''"
        :poster="point.video?.poster || point.steps?.[0]?.image || ''"
      />
    </template>

    <div v-else class="detail__empty">
      <p class="detail__empty-title">没有匹配点位</p>
      <p class="detail__empty-text">当前地图与干员暂时没有收录点位，请尝试其他组合。</p>
    </div>
  </article>
</template>
