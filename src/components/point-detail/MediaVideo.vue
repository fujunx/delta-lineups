<script setup>
/**
 * 视频组件。
 * 默认处理 B 站链接：未点击时展示预览海报（优先取 video.poster，缺省取点位第一张步骤图），
 * 仅在用户点击播放后加载嵌入播放器，避免首屏同时请求多个播放器。
 * 解析 BV 号与开始秒数 t。嵌入播放器不保证支持 t，失败时以“在 B 站打开”的原始链接为准。
 * 内容模型允许未来把个别高频点位替换为本地 MP4（local 字段），首期不要求同时维护两个版本。
 */
import { ref, computed } from 'vue'
import { parseBilibili, buildEmbedUrl, buildExternalUrl } from '../../utils/bilibili'

const props = defineProps({
  /** B 站原始地址。 */
  url: { type: String, required: true },
  /** 可选的本地视频地址（本地 MP4），存在时优先使用。 */
  local: { type: String, default: '' },
  /** 预览海报地址，缺省为空。 */
  poster: { type: String, default: '' },
})

const parsed = computed(() => parseBilibili(props.url))
const embedUrl = computed(() => buildEmbedUrl(parsed.value))
const externalUrl = computed(() => buildExternalUrl(parsed.value))

const isLocal = computed(() => Boolean(props.local))

/** 是否已加载嵌入播放器。 */
const loaded = ref(false)
/** 嵌入播放器加载失败标记。 */
const loadFailed = ref(false)

function loadPlayer() {
  if (!parsed.value.bvid) {
    loadFailed.value = true
    return
  }
  loadFailed.value = false
  loaded.value = true
}
</script>

<template>
  <div class="mediavideo">
    <video
      v-if="isLocal"
      class="mediavideo__frame"
      :src="local"
      controls
      playsinline
      preload="metadata"
      :poster="poster || undefined"
    ></video>

    <iframe
      v-else-if="loaded"
      :src="embedUrl"
      class="mediavideo__frame"
      title="B 站播放器"
      scrolling="no"
      frameborder="no"
      allow="autoplay; fullscreen"
      allowfullscreen
      @error="loadFailed = true"
    ></iframe>

    <div v-else class="mediavideo__placeholder">
      <img
        v-if="poster"
        class="mediavideo__poster"
        :src="poster"
        alt="视频预览图"
        loading="lazy"
        @error="(e) => { e.target.style.visibility = 'hidden' }"
      />
      <div class="mediavideo__shade" aria-hidden="true"></div>

      <div class="mediavideo__overlay">
        <button
          v-if="parsed.bvid"
          type="button"
          class="mediavideo__play"
          aria-label="播放视频"
          @click="loadPlayer"
        >
          <span class="mediavideo__playicon" aria-hidden="true">▶</span>
          <span class="mediavideo__playtext">
            播放{{ parsed.start > 0 ? `（${parsed.start}s）` : '' }}
          </span>
        </button>
      </div>

      <div class="mediavideo__footer">
        <span v-if="parsed.bvid" class="mediavideo__meta">BV：{{ parsed.bvid }}</span>
      </div>
    </div>

    <p v-if="loadFailed && loaded" class="mediavideo__error">
      播放器加载失败，请尝试
      <a :href="externalUrl" target="_blank" rel="noopener noreferrer">在 B 站打开</a>。
    </p>
    <p v-else-if="!isLocal && !parsed.bvid" class="mediavideo__error">
      该地址无法解析为有效的 B 站视频。
    </p>
  </div>
</template>
