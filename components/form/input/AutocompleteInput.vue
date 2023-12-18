<template lang="pug">
el-select.mr-3(
  class='!w-80',
  filterable,
  multiple,
  allow-create,
  placeholder='Выберите или введите',
  @change='selectHandler'
)
  el-option(
    v-for='item in options',
    :key='item',
    :label='item.value',
    :value='item.value'
  )
  template(#footer)
    el-switch(v-model='splitInput', active-text='Разделить ввод по запятым')
el-tag.mr-3(
  v-for='(item, i) in items',
  :key='item',
  size='large',
  type='info',
  closable,
  @close='remove(i)'
) {{ item }}
</template>

<script setup lang="ts">
const props = defineProps<{
  modelValue: string[]
  options: Array<{ value: string }>
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: string[]): void
}>()

const splitInput = ref(false)

const items = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value),
})

const remove = (index: number) => {
  items.value.splice(index, 1)
}

const selectHandler = ([value]: string[]) => {
  if (!splitInput.value) {
    items.value.push(value)
    return
  }
  const array = value.trim().split(', ')
  items.value.push(...array.map((i) => i.charAt(0).toUpperCase() + i.slice(1)))
  splitInput.value = false
}
</script>

<style scoped></style>
