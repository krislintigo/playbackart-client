<template lang="pug">
el-form.item-form(
  ref='form',
  :model='item',
  label-position='right',
  :label-width='120',
  :rules='rules'
)
  el-form-item(label='Конфигурация', prop='config')
    ConfigInput(v-model='item.config', v-model:item='item')
  el-form-item(label='Название:', prop='name')
    el-input(v-model='item.name')
  el-form-item(
    v-if='!item.config.seasons.extended || !item.config.seasons.multiplePosters',
    label='Постер:',
    prop='poster'
  )
    el-input(v-model='item.poster', placeholder='Вставьте ссылку')
  el-form-item(
    v-if='!item.config.seasons.extended || !item.config.seasons.multipleRatings',
    label='Рейтинг:',
    prop='rating'
  )
    RatingInput(v-model='item.rating')
  el-form-item(label='Статус:', prop='status')
    el-radio-group(v-model='item.status')
      el-radio-button(
        v-for='status in statuses',
        :key='status.value',
        :label='status.value',
        :style='{ "--el-radio-button-checked-bg-color": status.color }'
      ) {{ status.title }}
  el-form-item(label='Тип:', prop='type')
    el-radio-group(v-model='item.type')
      el-radio-button(
        v-for='type in types',
        :key='type.value',
        :label='type.value'
      ) {{ type.title }}
  el-form-item(label='Ограничение:', prop='restriction')
    el-radio-group(v-model='item.restriction')
      el-radio-button(
        v-for='restriction in restrictionsTemplate',
        :key='restriction',
        :label='restriction'
      )
    el-button.ml-1(
      :icon='ElIconClose',
      size='small',
      circle,
      text,
      @click='item.restriction = ""'
    )
  el-form-item(label='Жанры:', prop='genres')
    TagsInput(v-model='item.genres')
  el-form-item(
    v-if='!item.config.seasons.extended',
    label='Длительность:',
    prop='time'
  )
    TimeInput(v-model='item.time')
  el-form-item(
    v-if='!item.config.seasons.extended',
    label='Год выхода:',
    prop='year'
  )
    el-date-picker(v-model='item.year', value-format='YYYY', type='year')
  el-form-item(
    v-if='!item.config.seasons.extended || !item.config.seasons.multipleDevelopers',
    :label='getDeveloperWordByType(item.type, 2) + ":"',
    prop='developers'
  )
    TagsInput(v-model='item.developers')
  el-form-item(label='Франшиза:', prop='franchise')
    el-input(v-model='item.franchise')
  el-form-item(
    v-if='item.config.seasons.extended',
    label='Сезоны:',
    prop='seasons'
  )
    el-row.gap-y-5.w-full
      el-button(@click='appendSeason') Добавить
      el-card.w-full(v-for='(season, i) in item.seasons', :key='i')
        template(#header)
          el-row(justify='space-between', align='middle')
            h2 {{ season.name || '&nbsp;' }}
            el-button(
              v-if='item.seasons.length > 1',
              :icon='ElIconDelete',
              circle,
              type='danger',
              @click='removeSeason(i)'
            )
        SeasonForm(
          ref='seasonForms',
          v-model='item.seasons[i]',
          :config='item.config.seasons'
        )
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
  type: [{ required: true, message: 'Выберите тип', trigger: 'change' }],
}

const props = defineProps<{ modelValue: Item }>()

const emit = defineEmits<{ (e: 'update:modelValue', value: boolean): void }>()

const item = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value),
})

const form = ref<any>(null)
const seasonForms = ref<any>(null)

const appendSeason = () => {
  item.value.seasons.push(_cloneDeep(EMPTY_SEASON_DATA))
}

const removeSeason = (index: string | number) => {
  item.value.seasons.splice(index, 1)
}

const validate = async () => {
  try {
    await form.value.validate()
    if (!seasonForms.value) return true
    const validations = await Promise.all(
      seasonForms.value.map((form) => form.validate())
    )
    return validations.every((v) => v)
  } catch (error) {
    return false
  }
}

defineExpose({ validate })
</script>

<style scoped lang="scss"></style>
<style>
.item-form .el-radio-button__original-radio:checked + .el-radio-button__inner {
  border-color: transparent;
  box-shadow: none;
}
</style>
