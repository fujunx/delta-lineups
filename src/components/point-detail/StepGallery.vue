<script setup>
/**
 * 有序步骤图栏：展示当前点位的全部有序步骤图。缩略图使用完整画面，不裁剪。
 */
defineProps({
  steps: { type: Array, default: () => [] },
})

const emit = defineEmits(['open'])
</script>

<template>
  <div class="steppgallery">
    <h2 class="panel__title">有序步骤图</h2>

    <p v-if="steps.length === 0" class="steppgallery__empty">暂无步骤图</p>

    <ol v-else class="steps">
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
  </div>
</template>
