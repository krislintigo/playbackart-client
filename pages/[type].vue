<template>
  <div>
    <el-row v-if="!authStore.user?._id">
      <h2>Войдите, чтобы продолжить!</h2>
    </el-row>
    <el-row
      v-else
      v-loading.fullscreen.lock="loading"
      justify="center"
      :gutter="20"
      style="margin-bottom: 30px"
    >
      <el-col :span="24" :lg="18">
        <div style="display: flex; align-items: center; column-gap: 10px">
          <h2>{{ route.meta.mainHeader }}</h2>
          <!--          <el-button-->
          <!--            circle-->
          <!--            plain-->
          <!--            :icon="Plus"-->
          <!--            size="small"-->
          <!--            @click="-->
          <!--              dialog = true-->
          <!--              dialogTarget = 'create'-->
          <!--            "-->
          <!--          />-->
        </div>
        <CreateUpdateModal
          v-model="dialog"
          :target="dialogTarget"
          :updated-item="updatedItem"
        />
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
import { Plus } from '@element-plus/icons-vue'
import { ElNotification } from 'element-plus'

const { api } = useFeathers()
const authStore = useAuthStore()
const route = useRoute()

// const { data: items } = api
//   .service('items')
//   .useFind({ query: {} }, { paginateOn: 'server' })

// watchEffect(() => console.log(items))

const loading = ref(true)
const dialog = ref(false)
const dialogTarget = ref('')
const updatedItem = ref({})
const items = ref([])

const {
  searchQuery,
  selectedGrades,
  selectedRestrictions,
  selectedGenres,
  selectedDevelopers,
  selectedFranchises,
  queriedItems,
} = useFilters(items)

const refetch = async () => {
  if (!authStore.user._id) {
    items.value = []
    loading.value = false
    return
  }
  loading.value = true
  try {
    if (route.meta.type === 'all') {
      const response = await ItemsAPI.getAll()
      items.value = response.data
    } else {
      const response = await ItemsAPI.getByType(route.meta.type as string)
      items.value = response.data
    }
  } catch (e: any) {
    ElNotification.error({
      title: e.response.data.message,
      position: 'bottom-right',
    })
  }
  loading.value = false
}

const updateItem = async (item: CreateItem) => {
  dialog.value = true
  dialogTarget.value = 'update'
  updatedItem.value = item
}

const deleteItem = async (id: string) => {
  try {
    const response = await ItemsAPI.delete(id)
    ElNotification.success({
      title: response.message,
      position: 'bottom-right',
    })
    await refetch()
  } catch (e: any) {
    ElNotification.error({
      title: e.response.data.message,
      position: 'bottom-right',
    })
  }
}

provide('refetch', refetch)

// watchEffect(refetch)
</script>

<style scoped></style>
