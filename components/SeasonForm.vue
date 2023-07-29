<template lang="pug">
el-form(
  ref='form',
  :model='season',
  label-position='right',
  :label-width='120',
  :rules='rules'
)
  .flex
    el-form-item.mr-7.mb-4(
      v-if='config.multiplePosters',
      label='Постер',
      prop='poster',
      label-width='60'
    )
      ImageLoader(v-model='season.poster')
    .w-full
      el-form-item.mb-4(label='Имя', prop='name')
        el-input(v-model='season.name')
      el-form-item.mb-4(
        v-if='config.multipleRatings',
        label='Рейтинг',
        prop='rating'
      )
        RatingInput(v-model='season.rating')
      el-form-item.mb-4(label='Длительность', prop='time')
        TimeInput(v-model='season.time')
      el-form-item.mb-4(label='Год выхода', prop='year')
        el-date-picker(v-model='season.year', value-format='YYYY', type='year')
      el-form-item.mb-4(
        v-if='config.multipleDevelopers',
        label='Создатели',
        prop='developers'
      )
        TagsInput(v-model='season.developers')
</template>

<script setup lang="ts">
import { type FormRules } from 'element-plus'

const rules: FormRules = {
  name: [
    {
      required: true,
      message: 'Введите название',
      trigger: 'change',
    },
  ],
}

const props = defineProps<{ modelValue: Item['season']; config: any }>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: Item['season']): void
}>()

const form = ref<any>(null)

const season = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value),
})

const validate = async () => {
  try {
    await form.value.validate()
    return true
  } catch (error) {
    return false
  }
}

defineExpose({ validate })
</script>

<style scoped></style>
