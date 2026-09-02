<script setup>
/**
 * 紧凑点位列表。每项只展示名称与一句话用途，突出扫描效率。
 * 按点位类别分组显示，组顺序遵循 CATEGORIES 配置。
 */
import { computed } from 'vue'
import { CATEGORIES, findCategory } from '../../content/catalog'

const props = defineProps({
  points: { type: Array, required: true },
  selectedId: { type: String, default: null },
})

const emit = defineEmits(['select'])

/** 按类别分组，组顺序按 CATEGORIES 定义，未知类别排最后。 */
const groups = computed(() => {
  const order = new Map(CATEGORIES.map((c, i) => [c.id, i]))
  const map = new Map()
  for (const p of props.points) {
    if (!map.has(p.category)) map.set(p.category, [])
    map.get(p.category).push(p)
  }
  const entries = [...map.entries()]
  entries.sort((a, b) => {
    const ia = order.get(a[0]) ?? Number.MAX_SAFE_INTEGER
    const ib = order.get(b[0]) ?? Number.MAX_SAFE_INTEGER
    return ia - ib
  })
  const labelled = entries.map(([id, items]) => ({
    category: id,
    name: findCategory(id)?.name ?? id,
    items,
  }))
  // 仅在有类别时保留空首组？此处保持所有组。
  return labelled
})

function select(id) {
  emit('select', id)
}
</script>

<template>
  <div v-if="points.length === 0" class="pointlist__empty">暂无匹配点位</div>

  <div v-else class="pointlist">
    <section
      v-for="g in groups"
      :key="g.category"
      class="pointlist__group"
    >
      <h3 class="pointlist__group-title">{{ g.name }} <span class="pointlist__group-count">{{ g.items.length }}</span></h3>
      <ul class="pointlist__list">
        <li v-for="p in g.items" :key="p.id" class="pointlist__item">
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
    </section>
  </div>
</template>
