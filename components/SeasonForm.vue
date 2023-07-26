<template lang="pug">
el-form(
  ref='form',
  :model='season',
  label-position='right',
  :label-width='120',
  :rules='rules'
)
  el-form-item.mb-4(label='Имя', prop='name')
    el-input(v-model='season.name')
  el-form-item.mb-4(
    v-if='config.multiplePosters',
    label='Постер',
    prop='poster'
  )
    el-input(v-model='season.poster', placeholder='Вставьте ссылку')
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
    TagsInput(
      v-model='developerInput',
      :items='season.developers',
      @add='addDeveloper',
      @split='splitDevelopers',
      @remove='removeDeveloper'
    )
</template>

<script setup lang="ts">
const props = defineProps<{ modelValue: Item['season']; config: any }>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: Item['season']): void
}>()

const form = ref<any>(null)
const developerInput = ref('')

const season = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value),
})

const addDeveloper = () => {
  if (!developerInput.value.trim()) return
  season.value.developers.push(developerInput.value.trim())
  developerInput.value = ''
}

const splitDevelopers = () => {
  const array = developerInput.value.trim().split(', ')
  season.value.developers.push(
    ...array.map((i) => i.charAt(0).toUpperCase() + i.slice(1))
  )
  developerInput.value = ''
}

const removeDeveloper = (index: number) => {
  season.value.developers.splice(index, 1)
}
</script>

<style scoped></style>
