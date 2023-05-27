<template>
  <div>
    <h2 v-if="!items.length && !loading">Нечего отображать :(</h2>
    <el-row
      v-else
      v-loading.fullscreen.lock="loading"
      justify="center"
      :gutter="20"
      style="margin-bottom: 30px"
    >
      <el-col :span="24" :lg="18">
        <div style="display: flex; align-items: center; column-gap: 10px">
          <h2>
            {{ route.meta.mainHeader }} пользователя {{ route.params.login }}
          </h2>
        </div>
        <div style="margin-bottom: 20px">
          <SearchInput v-model="searchQuery" />
        </div>
        <MainDisplayLayout :items="queriedItems" :editable="false" />
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
import { ElNotification } from 'element-plus'

const route = useRoute()

const loading = ref(true)
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
  loading.value = true
  try {
    if (route.meta.type === 'all') {
      const response = await ItemsAPI.getByLogin(route.params.login as string)
      items.value = response.data
    } else {
      const response = await ItemsAPI.getByLoginAndType(
        route.params.login as string,
        route.meta.type as string
      )
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

provide('refetch', refetch)

watchEffect(refetch)
</script>

<style scoped></style>
