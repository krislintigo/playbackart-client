<template lang="pug">
el-row.gap-x-12.mt-5(justify='center')
  StatisticItem(title='Всего', :content='(status?.count ?? 0) + " шт."')
  StatisticItem(
    title='Продолжительность без повторов',
    :content='formatDuration(status?.duration) || "---"'
  )
  StatisticItem(
    title='Полная продолжительность',
    :content='formatDuration(status?.fullDuration) || "---"'
  )
</template>

<script setup lang="ts">
const queryFilters = useFilters()

const status = computed(() =>
  queryFilters.filters.total.find((s) => s.status === 'all'),
)
</script>

<style scoped></style>
