<script setup>
/**
 * 筛选栏：地图选择、干员选择、查询按钮、结果数量。
 * 控件绑定“待查询条件”，只有点击查询才应用到结果列表。
 */
const props = defineProps({
  mapOptions: { type: Array, required: true },
  operatorOptions: { type: Array, required: true },
  map: { type: String, required: true },
  operator: { type: String, required: true },
  resultCount: { type: Number, default: 0 },
  creators: { type: Array, default: () => [] },
})

const emit = defineEmits(['update:map', 'update:operator', 'query'])

function onMapChange(e) {
  emit('update:map', e.target.value)
}
function onOperatorChange(e) {
  emit('update:operator', e.target.value)
}
</script>

<template>
  <form
    class="filterbar"
    @submit.prevent="emit('query')"
    role="search"
    aria-label="筛选点位"
  >
    <div class="filterbar__brand" aria-hidden="true">
      <span class="filterbar__mark">Δ</span>
      <span class="filterbar__name">DELTA LINEUPS</span>
    </div>

    <label class="filterbar__field">
      <span class="filterbar__label">地图</span>
      <select
        class="filterbar__control"
        :value="map"
        @change="onMapChange"
      >
        <option v-for="m in mapOptions" :key="m.id" :value="m.id">
          {{ m.name }}
        </option>
      </select>
    </label>

    <label class="filterbar__field">
      <span class="filterbar__label">干员</span>
      <select
        class="filterbar__control"
        :value="operator"
        @change="onOperatorChange"
      >
        <option v-for="o in operatorOptions" :key="o.id" :value="o.id">
          {{ o.name }}
        </option>
      </select>
    </label>

    <button class="filterbar__submit" type="submit">查询</button>

    <div class="filterbar__meta" :class="{ 'filterbar__meta--empty': resultCount === 0 }">
      <span>结果 {{ resultCount }}</span>
    </div>

    <nav v-if="creators.length" class="filterbar__writers" aria-label="创作者快捷入口">
      <span class="filterbar__writerslabel">快捷入口</span>
      <a
        v-for="c in creators"
        :key="c.id"
        class="filterbar__writer"
        :href="c.url"
        target="_blank"
        rel="noopener noreferrer"
        :title="`${c.name}（${c.scope}）`"
      >
        <span class="filterbar__writer-name">{{ c.name }}</span>
        <span class="filterbar__writer-scope">{{ c.scope }}</span>
      </a>
    </nav>
  </form>
</template>
