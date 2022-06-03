<template>
  <el-input v-model="searchQuery" placeholder="Поиск по названию..." clearable />
<!--  <el-divider />-->
</template>

<script setup>
import { defineProps, defineEmits, computed } from 'vue'

const props = defineProps({
  modelValue: {
    type: String,
    default: ''
  }
})

const emit = defineEmits({
  'update:modelValue': null
})

const searchQuery = computed({
  get: () => props.modelValue,
  set: value => emit('update:modelValue', value)
})
</script>

<style scoped>

</style>
