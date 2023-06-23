<template lang="pug">
el-input(
  v-model='input',
  style='width: 300px; margin-bottom: 5px',
  @keyup.enter='emit("add")'
)
el-button(
  text,
  circle,
  :icon='ElIconMore',
  style='margin-left: 5px',
  @click='emit("split")'
)
el-button(text, style='margin: 0 10px', @click='emit("add")') Добавить
el-tag(
  v-for='(item, i) in items',
  :key='item',
  size='large',
  type='info',
  style='margin-right: 10px',
  closable,
  @close='emit("remove", i)'
) {{ item }}
</template>

<script setup lang="ts">
const props = defineProps<{
  modelValue: string
  items: string[]
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void
  (e: 'add'): void
  (e: 'split'): void
  (e: 'remove', index: number)
}>()

const input = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value),
})
</script>

<style scoped></style>
