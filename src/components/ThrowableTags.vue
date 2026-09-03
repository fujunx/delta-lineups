<script setup>
/**
 * 道具 2 字标签组：一个点位可能有多个道具，依次渲染各自的彩色 2 字标签。
 */
import ThrowableTag from './ThrowableTag.vue'

defineProps({
  throwables: { type: Array, default: () => [] },
})
</script>

<template>
  <ThrowableTag v-for="t in throwables" :key="t" :throwable="t" />
</template>
