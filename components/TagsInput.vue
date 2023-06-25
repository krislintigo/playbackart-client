<template lang="pug">
el-input.mb-1(v-model='input', style='width: 300px', @keyup.enter='emit("add")')
el-button.ml-1(text, circle, :icon='ElIconMore', @click='emit("split")')
el-button.mx-3.my-0(text, @click='emit("add")') Добавить
el-tag.mr-3(
  v-for='(item, i) in items',
  :key='item',
  size='large',
  type='info',
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
