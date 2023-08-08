<template lang="pug">
//el-row.w-fit
//  el-col(:span='8')
//    el-input-number(v-model='time.count', :min='1')
//    h4.m-0.text-center Кол-во элементов
//  el-col(:span='8', :push='1')
//    el-input-number(v-model='time.duration', :min='0')
//    h4.m-0.text-center Длительность (мин)
//  el-col(:span='8', :push='2')
//    el-input-number(v-model='time.replays', :min='0')
//    h4.m-0.text-center Повторы
el-row.w-fit.gap-x-5
  .flex.flex-col
    el-input-number(v-model='time.count', :min='1')
    h4.m-0.text-center Кол-во элементов
  .flex.flex-col
    el-input-number(v-model='time.duration', :min='0')
    h4.m-0.text-center Длительность (мин)
  .flex.flex-col
    el-input-number(v-model='time.replays', :min='0')
    h4.m-0.text-center Повторы
</template>

<script setup lang="ts">
const props = defineProps<{ modelValue: Item['time'] }>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: Item['time']): void
}>()

const time = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value),
})
</script>

<style scoped></style>
