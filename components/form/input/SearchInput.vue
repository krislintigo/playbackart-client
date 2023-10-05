<template lang="pug">
el-input(
  v-bind='$attrs',
  v-model='search',
  :prefix-icon='ElIconSearch',
  hide-details
)
</template>

<script setup lang="ts">
const props = defineProps<{ modelValue: string }>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void
}>()

// const debounceUpdate = _debounce(
//   (value) => emit('update:modelValue', value),
//   300
// )

const search = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value.replaceAll('\\', '\\\\')),
})
</script>
