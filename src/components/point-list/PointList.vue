<script setup>
/**
 * 紧凑点位列表。每项只展示名称与一句话用途，突出扫描效率。
 * 用 @keydown.enter / .space 支持键盘选中。
 */
defineProps({
  points: { type: Array, required: true },
  selectedId: { type: String, default: null },
})

const emit = defineEmits(['select'])

function select(id) {
  emit('select', id)
}
</script>

<template>
  <ul class="pointlist" :class="{ 'pointlist--empty': points.length === 0 }">
    <li v-for="p in points" :key="p.id" class="pointlist__item">
      <button
        type="button"
        class="pointlist__button"
        :class="{ 'is-selected': p.id === selectedId }"
        :aria-pressed="p.id === selectedId"
        @click="select(p.id)"
      >
        <span class="pointlist__name">{{ p.name }}</span>
        <span class="pointlist__summary">{{ p.summary }}</span>
      </button>
    </li>
  </ul>
</template>
