<script setup>
/**
 * 有序步骤图（右栏主体）。
 * 通过 ResizeObserver 测量容器可用宽高，动态计算单行高度，
 * 让当前点位的所有步骤图在一屏之内放下。
 * 只渲染图片列表本身，标题/计数由使用方（PointDetail）提供。
 */
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'

const props = defineProps({
  steps: { type: Array, default: () => [] },
})

const emit = defineEmits(['open'])

/** 容器测量结果。 */
const rootRef = ref(null)
const box = ref({ w: 0, h: 0 })
let ro = null

function update() {
  const el = rootRef.value
  if (!el) return
  box.value = { w: el.clientWidth, h: el.clientHeight }
}

onMounted(() => {
  update()
  if (typeof ResizeObserver !== 'undefined') {
    ro = new ResizeObserver(update)
    if (rootRef.value) ro.observe(rootRef.value)
  }
  window.addEventListener('resize', update)
})

onBeforeUnmount(() => {
  ro?.disconnect()
  window.removeEventListener('resize', update)
})

const ROW_GAP_RATIO = 0.12
/** 目标单行高度：同时受可用高度与“按宽度换算的高度”约束，保证一屏放下。 */
const rowHeight = computed(() => {
  const { w, h } = box.value
  const n = props.steps.length || 1
  if (!w || !h) return null
  const byWidth = (w * (1 - ROW_GAP_RATIO)) / n / (16 / 9)
  return Math.max(96, Math.min(h, byWidth))
})
</script>

<template>
  <div ref="rootRef" class="stepgallery">
    <ol
      v-if="steps.length"
      class="steps"
      :style="rowHeight ? { height: rowHeight + 'px' } : null"
    >
      <li
        v-for="(step, i) in steps"
        :key="step.image + i"
        class="steps__item"
      >
        <button
          type="button"
          class="steps__button"
          @click="emit('open', i)"
        >
          <img
            class="steps__thumb"
            :src="step.image"
            :alt="step.alt || step.name"
            @error="(e) => { e.target.closest('.steps__item').classList.add('is-broken') }"
          />
          <span class="steps__label">{{ String(i + 1).padStart(2, '0') }} · {{ step.name }}</span>
        </button>
      </li>
    </ol>
    <p v-else class="steps__empty">暂无步骤图</p>
  </div>
</template>
