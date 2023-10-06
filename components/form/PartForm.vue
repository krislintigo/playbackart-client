<template lang="pug">
el-form(
  ref='form',
  :model='part',
  label-position='right',
  :label-width='120',
  :rules='rules'
)
  .flex
    el-form-item.mr-7.mb-4(
      v-if='config.parts.multiplePosters',
      label='Постер:',
      prop='poster',
      label-width='60'
    )
      ImageLoader(v-model='part.poster')
    .w-full
      el-form-item.mb-4(label='Имя:', prop='name')
        el-input(v-model='part.name')
      el-form-item.mb-4(label='Статус:', prop='status')
        StatusButton(v-model='part.status')
      el-form-item.mb-4(
        v-if='config.parts.multipleRatings',
        label='Рейтинг',
        prop='rating'
      )
        RatingInput(v-model='part.rating')
      el-form-item.mb-4(
        v-if='!config.time.extended',
        label='Длительность:',
        prop='time'
      )
        TimeInput(v-model='part.time')
      el-form-item.mb-4(label='Год выхода:', prop='year')
        el-date-picker(v-model='part.year', value-format='YYYY', type='year')
      el-form-item.mb-4(
        v-if='config.parts.multipleDevelopers',
        label='Создатели:',
        prop='developers'
      )
        TagsInput(v-model='part.developers')
      el-form-item(
        v-if='config.time.extended',
        label='Длительность:',
        prop='time'
      )
        SessionsForm(v-model='part.time.sessions', :config='config')
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
  status: [
    {
      required: true,
      message: 'Выберите статус',
      trigger: 'change',
    },
  ],
}

const props = defineProps<{ modelValue: Item['parts'][number]; config: any }>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: Item['parts'][number]): void
}>()

const form = ref<any>(null)

const part = computed({
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
