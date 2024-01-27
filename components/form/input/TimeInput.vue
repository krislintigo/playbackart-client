<template lang="pug">
el-row.w-fit.gap-x-5.flex-col(class='md:flex-row')
  .flex.flex-col
    el-input-number(v-model='time.count', :min='1')
    h4.m-0.text-center Кол-во элементов
  .flex.flex-col
    el-input-number(v-model='time.duration', :min='0')
    h4.m-0.text-center
      span Длительность (мин)
      .text-xs(class='mt-[-7px]') {{ formatDuration(time.duration) || '&nbsp;' }}
  .flex.flex-col
    el-input-number(v-model='time.replays', :min='0')
    h4.m-0.text-center Повторы
</template>

<script setup lang="ts">
const time = defineModel<Item['time']>({ required: true })
</script>

<style scoped lang="scss"></style>
