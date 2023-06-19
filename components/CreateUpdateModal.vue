<template lang="pug">
el-dialog.cu-dialog(
  v-model='dialog',
  width='95%',
  :lock-scroll='false',
  :close-on-click-modal='false'
)
  template(#header)
    h3 {{ updateItemId ? 'Обновить' : 'Добавить' }} элемент
  el-form(
    ref='formRef',
    :model='_item',
    label-position='right',
    :label-width='120',
    :rules='rules'
  )
    el-form-item(label='Название:', prop='name')
      el-input(v-model.trim='_item.name')
    el-form-item(label='Фото:', prop='image')
      el-input(v-model='_item.image', placeholder='Ссылка на фото')
    el-form-item(label='Рейтинг:', prop='rating')
      el-rate(
        v-model='_item.rating',
        :max='10',
        show-text,
        :texts='rating.texts',
        :colors='rating.colors'
      )
      el-button(
        style='margin-left: 5px',
        :icon='ElIconClose',
        size='small',
        circle,
        text,
        @click='_item.rating = 0'
      )
    el-form-item(label='Статус:', prop='status')
      el-radio-group(v-model='_item.status')
        el-radio-button(
          v-for='status in statuses',
          :key='status.value',
          :label='status.value',
          :style='{ "--el-radio-button-checked-bg-color": status.color }'
        ) {{ status.title }}
    el-form-item(label='Тип:', prop='type')
      el-radio-group(v-model='_item.type')
        el-radio-button(
          v-for='type in types',
          :key='type.value',
          :label='type.value'
        ) {{ type.title }}
    el-form-item(label='Ограничение:', prop='restriction')
      el-radio-group(v-model='_item.restriction')
        el-radio-button(
          v-for='restriction in restrictionsTemplate',
          :key='restriction',
          :label='restriction'
        )
      el-button(
        style='margin-left: 5px',
        :icon='ElIconClose',
        size='small',
        circle,
        text,
        @click='_item.restriction = ""'
      )
    el-form-item(label='Жанры:', prop='genres')
      TagsInput(
        v-model='inputGenre',
        :items='_item.genres',
        @add='addGenre',
        @split='splitGenres',
        @remove='removeGenre'
      )
    el-form-item(label='Длительность:', prop='time')
      el-row(justify='space-between')
        el-col(:span='8')
          el-input-number(v-model='_item.time.count', :min='1')
          h4(style='margin: 0; text-align: center') Кол-во элементов
        el-col(:span='8', :push='1')
          el-input-number(v-model='_item.time.duration', :min='0')
          h4(style='margin: 0; text-align: center') Длительность (мин)
        el-col(:span='8', :push='2')
          el-input-number(v-model='_item.time.replays', :min='0')
          h4(style='margin: 0; text-align: center') Повторы
    el-form-item(label='Год выхода:', prop='year')
      el-date-picker(v-model='_item.year', value-format='YYYY', type='year')
    el-form-item(
      :label='getDeveloperWordByType(_item.type, 2) + ":"',
      prop='developers'
    )
      TagsInput(
        v-model='inputDeveloper',
        :items='_item.developers',
        @add='addDeveloper',
        @split='splitDevelopers',
        @remove='removeDeveloper'
      )
    el-form-item(label='Франшиза:', prop='franchise')
      el-input(v-model='_item.franchise')
  template(#footer)
    el-button(type='success', @click='save') Подтвердить
</template>

<script setup lang="ts">
const props = defineProps<{
  modelValue: boolean
  updateItemId: string | null
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void
}>()

const { api } = useFeathers()
const authStore = useAuthStore()

const formRef = ref<any>(null)
const _item = ref()
const inputGenre = ref('')
const inputDeveloper = ref('')

const dialog = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value),
})

// fix html scroll
watch(dialog, (open) => {
  document.documentElement.style.paddingRight = open
    ? window.innerWidth - document.documentElement.clientWidth + 'px'
    : ''
  document.documentElement.style.overflowY = open ? 'hidden' : 'scroll'
})

watch(dialog, (open) => {
  if (!open) {
    _item.value.reset()
    return
  }
  _item.value = props.updateItemId
    ? api.service('items').getFromStore(props.updateItemId, { clones: true })
        .value
    : api.service('items').new({ userId: authStore.user._id })
})

const addGenre = () => {
  if (!inputGenre.value.trim()) return
  _item.value.genres.push(inputGenre.value.trim())
  inputGenre.value = ''
}

const splitGenres = () => {
  const array = inputGenre.value.trim().split(', ')
  _item.value.genres.push(...array.map((i) => i[0].toUpperCase() + i.slice(1)))
  inputGenre.value = ''
}

const removeGenre = (tag: string) => {
  _item.value.genres.splice(_item.value.genres.indexOf(tag), 1)
}

const addDeveloper = () => {
  if (!inputDeveloper.value.trim()) return
  _item.value.developers.push(inputDeveloper.value.trim())
  inputDeveloper.value = ''
}

const splitDevelopers = () => {
  const array = inputDeveloper.value.trim().split(', ')
  _item.value.developers.push(
    ...array.map((i) => i[0].toUpperCase() + i.slice(1))
  )
  inputDeveloper.value = ''
}

const removeDeveloper = (tag: string) => {
  _item.value.developers.splice(_item.value.developers.indexOf(tag), 1)
}

const save = async () => {
  _item.value.name = _item.value.name.trim()
  _item.value.image = _item.value.image.trim()
  _item.value.franchise = _item.value.franchise.trim()
  try {
    await formRef.value.validate()
    try {
      await _item.value.save()
      dialog.value = false
      ElNotification.success({
        title: 'Элемент успешно сохранен!',
        position: 'bottom-right',
      })
    } catch (e: any) {
      ElNotification.error({
        title: 'Что-то пошло не так...',
        position: 'bottom-right',
      })
    }
  } catch (error) {
    ElNotification.error({
      title: 'Пожалуйста, заполните все поля',
      position: 'bottom-right',
    })
  }
}
</script>

<style scoped></style>
<style lang="scss">
.cu-dialog {
  max-width: 1300px;
}

.cu-dialog .el-dialog__body {
  padding-top: 0;
}

.cu-dialog .el-rate__item {
  line-height: 0;
}

.cu-dialog .el-radio-button__original-radio:checked + .el-radio-button__inner {
  border-color: transparent;
  box-shadow: none;
}
</style>
