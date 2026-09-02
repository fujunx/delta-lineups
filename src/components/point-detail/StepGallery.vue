<script setup>
/**
 * 有序步骤图：展示当前点位的全部有序步骤图。缩略图使用完整画面，不裁剪。
 * 只渲染图片列表本身，标题/计数由使用方（PointDetail）提供。
 */
defineProps({
  steps: { type: Array, default: () => [] },
})

const emit = defineEmits(['open'])
</script>

<template>
  <ol v-if="steps.length" class="steps">
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
          loading="lazy"
          @error="(e) => { e.target.closest('.steps__item').classList.add('is-broken') }"
        />
        <span class="steps__label">{{ String(i + 1).padStart(2, '0') }} {{ step.name }}</span>
      </button>
    </li>
  </ol>
  <p v-else class="steps__empty">暂无步骤图</p>
</template>
