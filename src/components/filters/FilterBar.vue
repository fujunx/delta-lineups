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

    <nav v-if="creators.length" class="filterbar__writers" aria-label="快捷入口">
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
      <a
        class="filterbar__writer filterbar__github"
        href="https://github.com/fujunx/delta-lineups"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="GitHub 仓库"
        title="GitHub 仓库"
      >
        <svg
          class="filterbar__github-icon"
          viewBox="0 0 16 16"
          aria-hidden="true"
          focusable="false"
        >
          <path
            fill="currentColor"
            d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82A7.67 7.67 0 0 1 8 3.84c.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8Z"
          />
        </svg>
      </a>
    </nav>
  </form>
</template>
