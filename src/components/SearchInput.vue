<template>
  <el-input v-model="searchQuery" placeholder="Поиск по названию..." clearable />
</template>

<script setup lang="ts">
import { defineProps, defineEmits, computed } from 'vue'

const props = defineProps<{
  modelValue: string,
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void,
}>()

const searchQuery = computed<string>({
  get: () => props.modelValue,
  set: value => emit('update:modelValue', value)
})
</script>

<style scoped>

</style>
