<template lang="pug">
el-autocomplete.mr-3(
  v-model='input.value',
  class='!w-80',
  placeholder='Выберите или введите',
  :fetch-suggestions='querySearch',
  @select='selectHandler',
  @keydown.enter='selectHandler({ value: input.value })'
)
  template(#suffix)
    el-switch(
      v-model='input.split',
      inline-prompt,
      :active-icon='ElIconMore',
      :inactive-icon='ElIconPlus',
      @click.stop
    )
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

const input = reactive({
  value: '',
  split: false,
})

const items = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value),
})

const querySearch = (queryString: string, cb: any) => {
  const search = queryString.trim().toLowerCase()
  const options = props.options.map((item) => ({ value: item.value }))
  if (!search) return cb(options)

  const results = [
    ...(options.map((item) => item.value).includes(queryString.trim())
      ? []
      : [{ value: queryString }]),
    ...options.filter((item) => item.value.toLowerCase().includes(search)),
  ]
  cb(results)
}

const remove = (index: number) => {
  items.value.splice(index, 1)
}

const selectHandler = ({ value }: { value: string }) => {
  const split = input.split
  input.value = ''
  input.split = false
  if (!split) {
    items.value.push(value)
    return
  }
  const array = value.trim().split(', ')
  items.value.push(...array.map((i) => i.charAt(0).toUpperCase() + i.slice(1)))
}
</script>

<style scoped></style>
