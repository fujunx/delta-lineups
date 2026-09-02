<script setup>
/**
 * 全屏图片查看器：支持上一张/下一张/关闭、滚轮缩放、拖拽平移。
 * 键盘：Esc 关闭、左右方向键切换。显示“当前 / 总数”，支持失败重载。
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
/** 当前索引对应的图片是否加载失败。 */
const failed = ref(false)

const current = computed(() => props.images[props.index] ?? null)
const total = computed(() => props.images.length)
const label = computed(() => `第 ${props.index + 1} 张，共 ${total.value} 张`)

function resetTransform() {
  scale.value = 1
  tx.value = 0
  ty.value = 0
  failed.value = false
}

function prev() {
  if (props.index > 0) emit('update:index', props.index - 1)
}

function next() {
  if (props.index < total.value - 1) emit('update:index', props.index + 1)
}

function close() {
  emit('close')
}

/* ---------- 键盘 ---------- */
function onKeydown(e) {
  if (e.key === 'Escape') close()
  else if (e.key === 'ArrowLeft') prev()
  else if (e.key === 'ArrowRight') next()
}

/* ---------- 滚轮缩放（以中心为基准，简化实现） ---------- */
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

watch(() => props.index, resetTransform)

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
      <span class="viewer__counter" aria-live="polite">{{ index + 1 }} / {{ total }}</span>
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

    <button
      v-if="index > 0"
      type="button"
      class="viewer__nav viewer__nav--prev"
      aria-label="上一张"
      @click="prev"
    >
      ‹
    </button>
    <button
      v-if="index < total - 1"
      type="button"
      class="viewer__nav viewer__nav--next"
      aria-label="下一张"
      @click="next"
    >
      ›
    </button>

    <footer class="viewer__bar viewer__bar--bottom">
      <span class="viewer__name">{{ current?.name || '' }}</span>
    </footer>
  </div>
</template>
