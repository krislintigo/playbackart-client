<template lang="pug">
el-col
  el-row
    el-switch(
      v-model='config.seasons.extended',
      active-text='Расширенный учет сезонов'
    )
    //el-switch.ml-5(
    //  v-model='item.config.time.extended',
    //  active-text='Расширенный учет времени'
    //)
  el-row.mt-3(v-if='config.seasons.extended')
    el-checkbox-button(
      v-model='config.seasons.multiplePosters',
      label='Множественные постеры'
    )
    el-checkbox-button(
      v-model='config.seasons.multipleRatings',
      label='Множественный рейтинг'
    )
    el-checkbox-button(
      v-model='config.seasons.multipleDevelopers',
      label='Множественные создатели'
    )
</template>

<script setup lang="ts">
const props = defineProps<{ modelValue: any; item: Item }>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: any): void
  (e: 'update:item', value: Item): void
}>()

const config = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value),
})

const item = computed({
  get: () => props.item,
  set: (value) => emit('update:item', value),
})

watch(
  () => config.value.seasons.extended,
  (newValue) => {
    if (!newValue || item.value.seasons.length) return
    item.value.seasons = [_cloneDeep(EMPTY_SEASON_DATA)]
  }
)
</script>

<style scoped></style>
