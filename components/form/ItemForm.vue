<template lang="pug">
el-form.item-form(
  ref='form',
  :model='item',
  label-position='right',
  :label-width='120',
  :rules='rules'
)
  el-row
    el-form-item(label='Конфигурация', prop='config')
      ConfigInput(v-model='item.config', v-model:item='item')
  .flex
    el-form-item.mr-7(
      v-if='!item.config.parts.extended || !item.config.parts.multiplePosters',
      label='Постер:',
      prop='poster'
    )
      ImageLoader(v-model='item.poster')
    .w-full
      el-form-item(label='Название:', prop='name')
        el-input(v-model='item.name')
      el-form-item(label='Франшиза:', prop='franchise')
        el-input(v-model='item.franchise')
      el-form-item(
        v-if='!item.config.parts.extended || !item.config.parts.multipleRatings',
        label='Рейтинг:',
        prop='rating'
      )
        RatingInput(v-model='item.rating')
      el-form-item(
        v-if='!item.config.parts.extended',
        label='Длительность:',
        prop='time'
      )
        TimeInput(v-model='item.time')
  el-form-item(label='Тип:', prop='type')
    el-radio-group(v-model='item.type')
      el-radio-button(
        v-for='type in types',
        :key='type.value',
        :label='type.value'
      ) {{ type.title }}
  el-form-item(label='Статус:', prop='status')
    StatusButton(v-model='item.status')
  el-form-item(label='Жанры:', prop='genres')
    AutocompleteInput(
      v-model='item.genres',
      :options='queryFilters.filters.genres'
    )
  el-form-item(
    v-if='!item.config.parts.extended || !item.config.parts.multipleDevelopers',
    label='Создатели:',
    prop='developers'
  )
    TagsInput(v-model='item.developers')
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
  el-form-item(
    v-if='!item.config.parts.extended',
    label='Год выхода:',
    prop='year'
  )
    el-date-picker(v-model='item.year', value-format='YYYY', type='year')
  el-form-item(
    v-if='item.config.parts.extended',
    label='Сезоны:',
    prop='parts'
  )
    el-row.gap-y-5.w-full
      el-button(@click='appendPart') Добавить
      el-card.w-full(v-for='(part, i) in item.parts', :key='i')
        template(#header)
          el-row(justify='space-between', align='middle')
            h2 {{ part.name || '&nbsp;' }}
            el-button(
              v-if='item.parts.length > 1',
              :icon='ElIconDelete',
              circle,
              type='danger',
              @click='removePart(i)'
            )
        PartForm(
          ref='partForms',
          v-model='item.parts[i]',
          :config='item.config.parts'
        )
</template>

<script setup lang="ts">
import { type FormRules } from 'element-plus'
import { useFilters } from '#imports'

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

const queryFilters = useFilters()

const item = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value),
})

const form = ref<any>(null)
const partForms = ref<any>(null)

const appendPart = () => {
  item.value.parts.push(_cloneDeep(EMPTY_PART_DATA))
}

const removePart = (index: string | number) => {
  item.value.parts.splice(index, 1)
}

const validate = async () => {
  try {
    await form.value.validate()
    if (!partForms.value) return true
    const validations = await Promise.all(
      partForms.value.map((form) => form.validate()),
    )
    return validations.every((v) => v)
  } catch (error) {
    return false
  }
}

const clearValidation = () => {
  console.log('clear')
  form.value.clearValidate()
  // form.value.resetFields()
}

defineExpose({ validate, clearValidation })
</script>

<style scoped lang="scss"></style>
