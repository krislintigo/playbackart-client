<template lang="pug">
el-input.mb-1(v-model='input', class='!w-72', @keyup.enter='append')
el-button.ml-1(text, circle, :icon='ElIconMore', @click='split')
el-button.mx-3.my-0(text, @click='append') Добавить
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
const props = defineProps<{ modelValue: string[] }>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void
}>()

const input = ref('')

const items = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value),
})

const append = () => {
  if (!input.value.trim()) return
  items.value.push(input.value.trim())
  input.value = ''
}

const split = () => {
  const array = input.value.trim().split(', ')
  items.value.push(...array.map((i) => i.charAt(0).toUpperCase() + i.slice(1)))
  input.value = ''
}

const remove = (index: number) => {
  items.value.splice(index, 1)
}
</script>

<style scoped></style>
