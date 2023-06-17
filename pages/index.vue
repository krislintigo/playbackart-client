<template lang="pug">
div
  client-only(fallback-tag='div')
    template(#fallback)
      el-empty
        template(#description)
          h3 Пожалуйста, подождите...
        template(#image)
          el-icon.is-loading(:size='150')
            ElIconChromeFilled
    el-row(v-if='route.query.userId', align='middle')
      h3 Вы просматриваете список другого пользователя
      el-button(
        link,
        type='primary',
        style='margin-left: 10px',
        @click='navigateTo("/")'
      ) На свою страницу
    el-row(v-if='!authStore.isAuthenticated && !route.query.userId')
      h2 Войдите, чтобы продолжить!
    el-row(v-else, justify='center', :gutter='20', style='margin-bottom: 30px')
      el-col(:span='24', :lg='18')
        div(style='display: flex; align-items: center; column-gap: 10px')
          h2 {{ navigationTabs.find((tab) => tab.searchType === (route.query.type ?? ''))?.header }}
          el-button(
            v-if='authStore.isAuthenticated && !route.query.userId',
            circle,
            plain,
            :icon='ElIconPlus',
            size='small',
            @click='createNew'
          )
        CreateUpdateModal(
          v-model='dialog',
          :target='dialogTarget',
          :item-for-update='itemForUpdate'
        )
        div(style='margin-bottom: 20px')
          el-input(
            v-model='queryFilters.searchQuery',
            placeholder='Поиск по названию...',
            clearable
          )
        el-collapse(v-if='queryFilters.filters', v-model='activeItems')
          StatusCollapseTable(
            v-for='(block, i) in statuses',
            :key='block.value',
            :title='block.title.toUpperCase()',
            :status='block.value',
            :index='i',
            @update-item='updateItem',
            @delete-item='deleteItem'
          )
        h3(style='text-align: center') Всего: {{ queryFilters.filters?.total.reduce((acc, cur) => acc + cur.count, 0) }} шт. / {{ formatDuration(queryFilters.filters?.total.reduce((acc, cur) => acc + cur.duration, 0)) }}
      el-col(:span='24', :lg='6', style='margin-top: 68px')
        AsideFilters(v-if='queryFilters.filters')
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

const activeItems = ref([0, 1, 2, 3, 4])
const dialog = ref(false)
const dialogTarget = ref('')
const itemForUpdate = ref<Item | null>(null)

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
    await api.service('items').remove(id)
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
