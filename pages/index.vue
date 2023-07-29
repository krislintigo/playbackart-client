<template lang="pug">
div
  client-only(fallback-tag='div')
    template(#fallback)
      el-empty
        template(#description)
          h3.font-bold.text-lg Пожалуйста, подождите...
        template(#image)
          el-icon.is-loading(:size='150')
            ElIconChromeFilled
    el-row(v-if='route.query.userId', align='middle')
      h3 Вы просматриваете список другого пользователя
      el-button.ml-3(link, type='primary', @click='navigateTo("/")') На свою страницу
    el-row(v-if='!authStore.isAuthenticated && !route.query.userId')
      h2.text-2xl.font-bold.my-5 Войдите, чтобы продолжить!
    .mb-8(v-else-if='queryFilters.filters')
      el-row(align='middle')
        h2.text-2xl.font-bold.my-5 {{ navigationTabs.find((tab) => tab.searchType === (route.query.type ?? ''))?.header }}
        el-button.ml-3(
          v-if='authStore.isAuthenticated && !route.query.userId',
          circle,
          plain,
          :icon='ElIconPlus',
          size='small',
          @click='createItemHandler'
        )
        AppDialog(
          v-model='dialog',
          :title='(item?._id ? "Обновить" : "Добавить") + " элемент"'
        )
          ItemForm(ref='itemForm', v-model='item')
          template(#footer)
            el-button(type='success', :loading='savePending', @click='save') Подтвердить
      el-row(:gutter='40')
        el-col(:lg='18')
          el-input.mb-5(
            v-model='queryFilters.searchQuery',
            placeholder='Поиск по названию...',
            clearable
          )
          el-collapse(v-model='activeItems')
            StatusCollapseTable(
              v-for='(block, i) in statuses',
              :key='block.value',
              :title='block.title.toUpperCase()',
              :status='block.value',
              :index='i',
              @update-item='updateItemHandler',
              @delete-item='deleteItem'
            )
          SummaryFooter
        el-col(:lg='6')
          AsideFilters
    el-row(v-else, :gutter='40')
      el-col(:lg='18')
        el-skeleton(animated, :rows='10')
      el-col(:lg='6')
        el-skeleton(animated, :rows='10')
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'default',
  public: true,
})

const { api } = useFeathers()
const route = useRoute()
const authStore = useAuthStore()
const queryFilters = useFilters()

const itemForm = ref<any>(null)
const activeItems = ref([0, 1, 2, 3, 4])
const dialog = ref(false)
const item = ref()
const savePending = ref(false)

// reset clone
watch(dialog, (open) => {
  if (open) return
  item.value.reset()
})

const save = async () => {
  clearItemBeforeSave(item.value)

  const valid = await itemForm.value.validate()
  if (!valid) {
    return ElMessage.warning('Пожалуйста, заполните все поля')
  }

  try {
    console.log('save', item.value)
    savePending.value = true
    await item.value.save()
    savePending.value = false
    dialog.value = false
    ElMessage.success('Элемент успешно сохранен!')
  } catch (e: any) {
    ElMessage.error('Что-то пошло не так...')
  }
}

const createItemHandler = () => {
  item.value = api.service('items').new({ userId: authStore.user._id })
  dialog.value = true
}

const updateItemHandler = (id: string) => {
  item.value = api.service('items').getFromStore(id, { clones: true }).value
  dialog.value = true
}

const deleteItem = async (id: string) => {
  try {
    await api.service('items').remove(id)
    ElMessage.success('Элемент успешно удален!')
  } catch (e: any) {
    ElMessage.error('Что-то пошло не так...')
  }
}
</script>

<style scoped></style>
