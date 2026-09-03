<script setup>
/**
 * 道具 2 字标签：按道具配色渲染，贴在点位名称前方。
 */
import { computed } from 'vue'
import { findThrowable } from '../content/catalog'

const props = defineProps({
  throwable: { type: String, default: '' },
})

const th = computed(() => findThrowable(props.throwable))

const style = computed(() => {
  const c = th.value?.color
  if (!c) return null
  return {
    color: c,
    borderColor: c,
    backgroundColor: `${c}22`,
  }
})
</script>

<template>
  <span v-if="th" class="ptag" :style="style" :title="th.name">{{ th.short }}</span>
</template>
