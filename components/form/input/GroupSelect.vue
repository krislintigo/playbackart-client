<template lang="pug">
el-select.mr-3(
  v-model='items',
  class='!w-80',
  placeholder='Выберите из списка',
  filterable,
  multiple
)
  el-option-group.group-description-select(
    v-for='(group, key) in data',
    :key='key'
  )
    .text-blue-500.text-base.ml-3.mb-1 {{ group.label }}
    el-option(
      v-for='item in group.options',
      :key='item.value',
      :label='item.label',
      :value='item.value'
    )
      .flex.flex-col.h-full.justify-center.max-w-64
        span.text-sm {{ item.label }}
        span.text-gray-400.text-xs.text-wrap {{ item.description }}
</template>

<script setup lang="ts">
defineProps<{
  data: Array<{
    label: string
    options: Array<{ label: string; value: string; description: string }>
  }>
}>()

const items = defineModel<string[]>({ required: true })
</script>

<style scoped lang="scss"></style>
<style lang="scss">
.group-description-select {
  .el-select-group > li {
    height: 55px;
  }
}
</style>
