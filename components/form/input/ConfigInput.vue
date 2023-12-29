<template lang="pug">
el-col
  el-row
    el-switch(
      v-model='config.parts.extended',
      active-text='Расширенный учет сезонов'
    )
    //el-switch.ml-5(
    //  v-model='item.config.time.extended',
    //  active-text='Расширенный учет времени'
    //)
  el-row.mt-3(v-if='config.parts.extended')
    el-checkbox-button(
      v-model='config.parts.multiplePosters',
      label='Множественные постеры'
    )
    el-checkbox-button(
      v-model='config.parts.multipleRatings',
      label='Множественный рейтинг'
    )
    el-checkbox-button(
      v-model='config.parts.multipleDevelopers',
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
  () => config.value.parts.extended,
  (newValue) => {
    if (!newValue || item.value.parts.length) return
    item.value.parts = [_cloneDeep(EMPTY_PART_DATA)]
  },
)
</script>

<style scoped></style>
