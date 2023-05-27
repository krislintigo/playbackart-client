<template>
  <div>
    <el-row v-if="!store.state.user._id">
      <h2>Войдите, чтобы продолжить!</h2>
    </el-row>
    <el-row v-else v-loading.fullscreen.lock="loading" justify="center" :gutter="20" style="margin-bottom: 30px;">
      <el-col :span="24" :lg="18">
        <div style="display: flex; align-items: center; column-gap: 10px">
          <h2>{{route.meta.mainHeader}}</h2>
          <el-button circle plain :icon="Plus" size="small" @click="dialog = true; dialogTarget = 'create'" />
        </div>
        <CreateUpdateModal v-model="dialog" :target="dialogTarget" :updated-item="updatedItem" />
        <div style="margin-bottom: 20px;">
          <SearchInput v-model="searchQuery" />
        </div>
        <MainDisplayLayout
          :items="queriedItems"
          :editable="true"
          @update-item="updateItem"
          @delete-item="deleteItem"
        />
        <h4 style="text-align: center">
          <span>Всего: {{items.length}} шт.</span>
          /
          <span>
            {{formatDuration(items.reduce((acc, cur) => acc + cur.time.count * cur.time.duration, 0)) || '-'}}
          </span>
        </h4>
      </el-col>
      <el-col :span="24" :lg="6" style="margin-top: 68px;">
        <AsideFilters
          :items="items"
          v-model:selected-grades="selectedGrades"
          v-model:selected-restrictions="selectedRestrictions"
          v-model:selected-genres="selectedGenres"
          v-model:selected-developers="selectedDevelopers"
          v-model:selected-franchises="selectedFranchises"
        />
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts">
import { provide, ref, watchEffect } from 'vue'
import { Plus } from '@element-plus/icons-vue'
import { useRoute } from 'vue-router'
import { useStore } from 'vuex'
import { useFilters } from '~/composables/useFilters'
import formatDuration from '@/utils/formatDuration'
import MainDisplayLayout from '@/components/MainDisplayLayout.vue'
import AsideFilters from '@/components/AsideFilters.vue'
import SearchInput from '@/components/SearchInput.vue'
import CreateUpdateModal from '@/components/CreateUpdateModal.vue'
import { ItemsAPI } from '@/api/ItemsAPI'
import { ElNotification } from 'element-plus'
import { CreateItem } from '@/interfaces/create-item'

const store = useStore()
const route = useRoute()

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
  queriedItems
} = useFilters(items)

const refetch = async () => {
  if (!store.state.user._id) {
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
      position: 'bottom-right'
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
      position: 'bottom-right'
    })
    await refetch()
  } catch (e: any) {
    ElNotification.error({
      title: e.response.data.message,
      position: 'bottom-right'
    })
  }
}

provide('refetch', refetch)

watchEffect(refetch)
</script>

<style scoped>

</style>
