<template lang="pug">
el-tabs(
  v-if='queryFilters.filters',
  v-model='active',
  stretch,
  type='border-card'
)
  el-tab-pane(name='trackedItems', label='Элементы')
    TrackedEditor(input-type='input', user-target='trackedItems')
  el-tab-pane(name='trackedDevelopers', label='Создатели')
    TrackedEditor(
      input-type='select',
      filter-target='developers',
      user-target='trackedDevelopers'
    )
  el-tab-pane(name='trackedFranchises', label='Франшизы')
    TrackedEditor(
      input-type='select',
      filter-target='franchises',
      user-target='trackedFranchises'
    )
</template>

<script setup lang="ts">
const queryFilters = useFilters()

const active = ref('trackedItems')
</script>

<style scoped></style>
