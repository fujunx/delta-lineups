<script setup>
/**
 * 一级菜单：点位类别切换。点选即按类别过滤点位列表。
 * 值为类别 id，或 'all' 表示全部（按类别分组展示）。
 */
import { CATEGORIES } from '../../content/catalog'

defineProps({
  modelValue: { type: String, default: 'all' },
})

const emit = defineEmits(['update:modelValue'])

function select(id) {
  emit('update:modelValue', id)
}
</script>

<template>
  <nav class="catmenu" aria-label="点位类别菜单">
    <button
      type="button"
      class="catmenu__item"
      :class="{ 'is-active': modelValue === 'all' }"
      @click="select('all')"
    >
      全部
    </button>
    <button
      v-for="c in CATEGORIES"
      :key="c.id"
      type="button"
      class="catmenu__item"
      :class="{ 'is-active': modelValue === c.id }"
      @click="select(c.id)"
    >
      {{ c.name }}
    </button>
  </nav>
</template>
