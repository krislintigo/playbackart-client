<template lang="pug">
div
  AppDialog(
    v-model='dialog',
    :title='(item?._id ? "Обновить" : "Добавить") + " элемент"'
  )
    ItemForm(ref='itemForm', v-model='item')
    template(#footer)
      el-button(type='success', :loading='savePending', @click='save') Подтвердить
  el-row(v-if='route.query.userId', align='middle')
    h3 Вы просматриваете список другого пользователя
    el-button.ml-3(link, type='primary', @click='navigateTo("/")') На свою страницу
  el-row.mb-5.mt-2(v-if='!authStore.isAuthenticated && !route.query.userId')
    h2.text-2xl.font-medium Войдите, чтобы продолжить!
  .mb-8(v-else)
    el-row.mb-5.mt-2(align='middle')
      h2.text-2xl.font-light {{ navigationTabs.find((tab) => tab.searchType === (route.query.type ?? ''))?.header }}
      el-button.ml-3(
        v-if='authStore.isAuthenticated && !route.query.userId',
        circle,
        plain,
        :icon='ElIconPlus',
        size='small',
        @click='createItemHandler'
      )
    .flex.gap-x-8
      .flex.flex-col.w-full.overflow-hidden
        SearchInput.mb-5(
          v-model='queryFilters.search',
          placeholder='Поиск по названию...',
          clearable
        )
        el-collapse(v-model='activeItems')
          client-only
            template(#fallback)
              el-row.flex-col.my-8(align='middle')
                h2.text-2xl Loading...
                el-icon.is-loading.mt-3(size='30')
                  ElIconLoading
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
      AsideFilters.hidden-md-and-down
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
const { clearObjectUrls } = useResources()

const itemForm = ref<any>(null)
const activeItems = ref([0, 1, 2, 3, 4])
const dialog = ref(false)
const item = ref()
const savePending = ref(false)

// reset clone /  clear object urls
watch(dialog, (open) => {
  if (open) return
  item.value.reset()
  clearObjectUrls()
})

const save = async () => {
  clearItemBeforeSave(item.value)

  const valid = await itemForm.value.validate()
  if (!valid) {
    return ElMessage.warning('Пожалуйста, заполните все поля')
  }

  try {
    savePending.value = true
    await item.value.save()
    ElMessage.success('Элемент успешно сохранен!')
    dialog.value = false
  } catch (e: any) {
    ElMessage.error('Что-то пошло не так...')
  } finally {
    savePending.value = false
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
