<template lang="pug">
div
  el-row(v-if='!authStore.isAuthenticated')
    h2 Войдите, чтобы продолжить!
  el-row(v-else, justify='center', :gutter='20', style='margin-bottom: 30px')
    el-col(:span='24', :lg='18')
      div(style='display: flex; align-items: center; column-gap: 10px')
        h2 {{ 'Список' }}
        el-button(
          circle,
          plain,
          :icon='ElIconPlus',
          size='small',
          @click='createNew'
        )
      ClientOnly
        CreateUpdateModal(
          v-model='dialog',
          :target='dialogTarget',
          :item-for-update='itemForUpdate'
        )
      div(style='margin-bottom: 20px')
        el-input(
          v-model='searchQuery',
          placeholder='Поиск по названию...',
          clearable
        )
      el-collapse(v-model='activeItems')
        div(v-for='(block, i) in statuses', :key='block.value')
          StatusCollapseTable(
            :title='block.title.toUpperCase()',
            :status='block.value',
            :index='i',
            @update-item='updateItem',
            @delete-item='deleteItem'
          )
      h4(style='text-align: center')
        span Всего: {{ filters?.total.count }} шт. / {{ formatDuration(filters?.total.duration) || '-' }}
    el-col(:span='24', :lg='6', style='margin-top: 68px')
      //AsideFilters(
      //  v-model:selected-ratings='selectedRatings',
      //  v-model:selected-restrictions='selectedRestrictions',
      //  v-model:selected-genres='selectedGenres',
      //  v-model:selected-developers='selectedDevelopers',
      //  v-model:selected-franchises='selectedFranchises',
      //  :filters='filters'
      //)
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'default',
  public: false,
})

// v-loading.fullscreen.lock='isPending',

const { api } = useFeathers()
const authStore = useAuthStore()
const route = useRoute()

const activeItems = ref([0, 1, 2, 3, 4])
const dialog = ref(false)
const dialogTarget = ref('')
const itemForUpdate = ref<Item | null>(null)
const filters = ref<any>(null)

const fetchFilters = async () => {
  try {
    filters.value = await api.service('items').filters({ login: '' }, {})
    console.log(filters.value)
  } catch (e) {
    console.error(e)
  }
}
fetchFilters()

api.service('items').on('created', fetchFilters)
api.service('items').on('patched', fetchFilters)
api.service('items').on('removed', fetchFilters)

const {
  searchQuery,
  selectedRatings,
  selectedRestrictions,
  selectedGenres,
  selectedDevelopers,
  selectedFranchises,
} = useFilters()

const createNew = () => {
  dialog.value = true
  dialogTarget.value = 'create'
}

const updateItem = (item: Item) => {
  dialog.value = true
  dialogTarget.value = 'update'
  itemForUpdate.value = item
}

const deleteItem = async (id: string) => {
  try {
    const response = await api.service('items').remove(id)
    ElNotification.success({
      title: 'Элемент успешно удален!',
      position: 'bottom-right',
    })
  } catch (e: any) {
    ElNotification.error({
      title: 'Что-то пошло не так...',
      position: 'bottom-right',
    })
  }
}
</script>

<style scoped></style>
