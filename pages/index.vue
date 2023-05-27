<template>
  <div>
    <el-row v-if="!authStore.isAuthenticated">
      <h2>Войдите, чтобы продолжить!</h2>
    </el-row>
    <el-row
      v-else
      v-loading.fullscreen.lock="isPending"
      justify="center"
      :gutter="20"
      style="margin-bottom: 30px"
    >
      <el-col :span="24" :lg="18">
        <div style="display: flex; align-items: center; column-gap: 10px">
          <h2>{{ 'Список' }}</h2>
          <el-button
            circle
            plain
            :icon="ElIconPlus"
            size="small"
            @click="createNew"
          />
        </div>
        <ClientOnly>
          <CreateUpdateModal
            v-model="dialog"
            :target="dialogTarget"
            :item-for-update="itemForUpdate"
          />
        </ClientOnly>
        <div style="margin-bottom: 20px">
          <SearchInput v-model="searchQuery" />
        </div>
        <MainDisplayLayout
          :items="queriedItems"
          :editable="true"
          @update-item="updateItem"
          @delete-item="deleteItem"
        />
        <h4 style="text-align: center">
          <span>Всего: {{ items.length }} шт.</span>
          /
          <span>
            {{
              formatDuration(
                items.reduce(
                  (acc, cur) => acc + cur.time.count * cur.time.duration,
                  0
                )
              ) || '-'
            }}
          </span>
        </h4>
      </el-col>
      <el-col :span="24" :lg="6" style="margin-top: 68px">
        <AsideFilters
          v-model:selected-grades="selectedGrades"
          v-model:selected-restrictions="selectedRestrictions"
          v-model:selected-genres="selectedGenres"
          v-model:selected-developers="selectedDevelopers"
          v-model:selected-franchises="selectedFranchises"
          :items="items"
        />
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'default',
  public: false,
})

const { api } = useFeathers()
const authStore = useAuthStore()
const route = useRoute()

const query = computed(() => ({
  query: {
    ...(route.query.type && { type: route.query.type }),
  },
}))

const { data: items, isPending } = api
  .service('items')
  .useFind(query, { paginateOn: 'server' })

watchEffect(() => console.log(items.value))

const dialog = ref(false)
const dialogTarget = ref('')
const itemForUpdate = ref<Item | null>(null)

const {
  searchQuery,
  selectedGrades,
  selectedRestrictions,
  selectedGenres,
  selectedDevelopers,
  selectedFranchises,
  queriedItems,
} = useFilters(items)

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
      title: response.message,
      position: 'bottom-right',
    })
  } catch (e: any) {
    ElNotification.error({
      title: e.response.data.message,
      position: 'bottom-right',
    })
  }
}
</script>

<style scoped></style>
