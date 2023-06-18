<template lang="pug">
.stat-wrapper
  div(style='display: inline-flex; align-items: center')
    span(style='text-align: center') {{ title }}
    el-tooltip(
      v-if='tooltip',
      effect='dark',
      :content='tooltip',
      placement='top'
    )
      el-icon(style='margin-left: 4px', :size='14')
        ElIconWarning
  h2(style='margin-top: 0') {{ content }}
</template>

<script setup lang="ts">
defineProps<{
  title: string
  tooltip?: string
  content: string | number
}>()
</script>

<style scoped>
.stat-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
