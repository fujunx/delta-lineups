<script setup>
/**
 * 有序步骤图（右栏主体）。
 * 按图片数量动态布局：
 * - 1 个：单图放大居中。
 * - 2 个：一行 2 个，放大占满。
 * - 3~4 个：两行，每行 2 个。
 * - 大于 4 个：每行 3 个，垂直滚动。
 * 通过 ResizeObserver 测量容器宽高，使不超过 4 张时一屏放下。
 */
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'

const props = defineProps({
  steps: { type: Array, default: () => [] },
})

const emit = defineEmits(['open'])

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

const GAP = 14
const ASPECT = 16 / 9

/** 根据数量与可用宽高计算网格布局。 */
const layout = computed(() => {
  const { w, h } = box.value
  const n = props.steps.length
  if (!w || !h || n === 0) return null

  const cols = n === 1 ? 1 : n <= 4 ? 2 : 3
  const rows = Math.ceil(n / cols)
  const cellW = (w - GAP * (cols - 1)) / cols
  const naturalH = cellW / ASPECT
  const fitsScreen = n <= 4
  const maximumH = (h - GAP * (rows - 1)) / rows
  const rowH = fitsScreen ? Math.max(60, Math.min(naturalH, maximumH)) : naturalH

  return { cols, rows, rowH, scroll: n > 4 }
})
</script>

<template>
  <div
    ref="rootRef"
    class="stepgallery"
    :class="{ 'stepgallery--scroll': layout?.scroll }"
  >
    <ol
      v-if="steps.length"
      class="steps"
      :style="layout
        ? {
            gridTemplateColumns: `repeat(${layout.cols}, minmax(0, 1fr))`,
            gridTemplateRows: `repeat(${layout.rows}, ${layout.rowH}px)`,
          }
        : null"
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
