<template lang="pug">
el-row.gap-x-12.mt-5(justify='center')
  StatisticItem(
    title='Всего',
    :content='queryFilters.filters.total.reduce((acc, cur) => acc + cur.count, 0) + " шт."'
  )
  StatisticItem(
    title='Продолжительность без повторов',
    :content='formatDuration(queryFilters.filters.total.reduce((acc, cur) => acc + cur.duration, 0)) || "---"'
  )
  StatisticItem(
    title='Полная продолжительность',
    :content='formatDuration(queryFilters.filters.total.reduce((acc, cur) => acc + cur.fullDuration, 0)) || "---"'
  )
</template>

<script setup lang="ts">
const queryFilters = useFilters()
</script>

<style scoped></style>
