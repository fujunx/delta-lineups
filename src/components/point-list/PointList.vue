<script setup>
/**
 * 紧凑点位列表。每项只展示名称与道具标签，突出扫描效率。
 * 按点位类别分组显示，组顺序遵循 CATEGORIES 配置；点击类别标题可折叠/展开该组。
 */
import { computed, reactive } from 'vue'
import { CATEGORIES, findCategory } from '../../content/catalog'
import ThrowableTags from '../ThrowableTags.vue'

const props = defineProps({
  points: { type: Array, required: true },
  selectedId: { type: String, default: null },
})

const emit = defineEmits(['select'])

/**
 * 记录各类别是否折叠。默认只展开「开局」，其它类别折叠。
 * 用户点击后可各自切换展开/收起。
 */
const collapsed = reactive({})
for (const c of CATEGORIES) {
  if (c.id !== 'opening') collapsed[c.id] = true
}

function toggle(category) {
  collapsed[category] = !collapsed[category]
}

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
  return entries.map(([id, items]) => ({
    category: id,
    name: findCategory(id)?.name ?? id,
    items,
  }))
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
      <button
        type="button"
        class="pointlist__group-button"
        :aria-expanded="!collapsed[g.category]"
        @click="toggle(g.category)"
      >
        <span class="pointlist__chevron" :class="{ 'is-open': !collapsed[g.category] }" aria-hidden="true">▸</span>
        <span class="pointlist__group-name">{{ g.name }}</span>
        <span class="pointlist__group-count">{{ g.items.length }}</span>
      </button>

      <ul v-show="!collapsed[g.category]" class="pointlist__list">
        <li v-for="p in g.items" :key="p.id" class="pointlist__item">
          <button
            type="button"
            class="pointlist__button"
            :class="{ 'is-selected': p.id === selectedId }"
            :aria-pressed="p.id === selectedId"
            @click="select(p.id)"
          >
            <span class="pointlist__toptitle">
              <ThrowableTags :throwables="p.throwables" />
              <span class="pointlist__name">{{ p.name }}</span>
            </span>
          </button>
        </li>
      </ul>
    </section>
  </div>
</template>
