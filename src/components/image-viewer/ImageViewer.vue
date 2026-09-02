<script setup>
/**
 * 全屏图片查看器。
 * 底部提供翻页器：上/下箭头 + “当前 / 总数”。翻到末尾继续翻会回到第一页（循环）。
 * 支持滚轮缩放、拖拽平移；键盘 Esc 关闭、左右方向键上下翻页。
 */
import { ref, computed, watch, onMounted, onBeforeUnmount } from 'vue'

const props = defineProps({
  images: { type: Array, required: true },
  index: { type: Number, default: 0 },
})

const emit = defineEmits(['close', 'update:index'])

const scale = ref(1)
const tx = ref(0)
const ty = ref(0)
const failed = ref(false)

const total = computed(() => props.images.length)
const current = computed(() => props.images[props.index] ?? null)

/** 循环翻页：越界时回到另一端。 */
function goPrev() {
  if (total.value === 0) return
  emit('update:index', (props.index - 1 + total.value) % total.value)
}
function goNext() {
  if (total.value === 0) return
  emit('update:index', (props.index + 1) % total.value)
}

function close() {
  emit('close')
}

function onKeydown(e) {
  if (e.key === 'Escape') close()
  else if (e.key === 'ArrowLeft') goPrev()
  else if (e.key === 'ArrowRight') goNext()
}

/* ---------- 滚轮缩放 ---------- */
function onWheel(e) {
  const delta = e.deltaY > 0 ? -0.1 : 0.1
  const next = Math.min(4, Math.max(1, scale.value + delta))
  scale.value = next
  tx.value = 0
  ty.value = 0
}

/* ---------- 拖拽平移 ---------- */
let dragging = false
let startX = 0
let startY = 0

function onPointerDown(e) {
  dragging = true
  startX = e.clientX - tx.value
  startY = e.clientY - ty.value
  e.currentTarget.setPointerCapture(e.pointerId)
}
function onPointerMove(e) {
  if (!dragging) return
  tx.value = e.clientX - startX
  ty.value = e.clientY - startY
}
function onPointerUp(e) {
  dragging = false
  if (e.currentTarget.hasPointerCapture?.(e.pointerId)) {
    e.currentTarget.releasePointerCapture(e.pointerId)
  }
}

watch(() => props.index, () => {
  scale.value = 1
  tx.value = 0
  ty.value = 0
  failed.value = false
})

onMounted(() => {
  window.addEventListener('keydown', onKeydown)
  document.body.style.overflow = 'hidden'
})
onBeforeUnmount(() => {
  window.removeEventListener('keydown', onKeydown)
  document.body.style.overflow = ''
})
</script>

<template>
  <div
    class="viewer"
    role="dialog"
    aria-modal="true"
    aria-label="图片预览"
    @click.self="close"
  >
    <header class="viewer__bar">
      <span class="viewer__name">{{ current?.name || '' }}</span>
      <button type="button" class="viewer__close btn" @click="close" aria-label="关闭预览">
        关闭
      </button>
    </header>

    <div class="viewer__stage" @wheel.prevent="onWheel">
      <img
        v-if="current && !failed"
        class="viewer__image"
        :src="current.image"
        :alt="current.alt || current.name"
        :style="{ transform: `translate(${tx}px, ${ty}px) scale(${scale})` }"
        draggable="false"
        @pointerdown="onPointerDown"
        @pointermove="onPointerMove"
        @pointerup="onPointerUp"
        @pointercancel="onPointerUp"
        @error="failed = true"
      />
      <div v-else-if="failed && current" class="viewer__error">
        <p>图片加载失败。</p>
        <button type="button" class="btn" @click="failed = false">重试</button>
      </div>
    </div>

    <footer class="viewer__pager">
      <button
        type="button"
        class="viewer__pagerbtn"
        aria-label="上一张"
        @click="goPrev"
      >
        ‹
      </button>
      <span class="viewer__counter" aria-live="polite">{{ index + 1 }} / {{ total }}</span>
      <button
        type="button"
        class="viewer__pagerbtn"
        aria-label="下一张"
        @click="goNext"
      >
        ›
      </button>
    </footer>
  </div>
</template>
