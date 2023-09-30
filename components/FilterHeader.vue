<template lang="pug">
el-row.filter-header.mb-3.p-2(justify='space-between', align='middle')
  h3.flex.items-center.font-medium.uppercase
    el-icon.is-loading(
      :size='15',
      :class='{ "mr-1": isPending }',
      :style='{ width: isPending ? "15px" : "0", transition: "width 0.3s ease-in-out" }'
    )
      ElIconLoading
    span {{ title }}
  .flex.items-center(v-if='selector')
    span.text-sm {{ selector === '$all' ? 'А и Б' : 'А или Б' }}
    el-switch.ml-2(
      v-model='selector',
      size='small',
      active-value='$all',
      inactive-value='$in'
    )
</template>

<script setup lang="ts">
const props = defineProps<{
  title: string
  isPending: boolean
  selector?: '$in' | '$all'
}>()

const emit = defineEmits<{
  (e: 'update:selector', value: '$in' | '$all'): void
}>()

const selector = computed({
  get: () => props.selector,
  set: (value) => (value ? emit('update:selector', value) : null),
})
</script>

<style scoped lang="scss">
.filter-header {
  background-color: var(--el-color-info-light-8);
  border-left: 5px solid var(--el-text-color-primary);
}
</style>
