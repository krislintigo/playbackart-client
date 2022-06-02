<template>
  <div style="display: flex; align-items: center; column-gap: 10px">
    <h2>{{route.meta.mainHeader}}</h2>
    <el-button circle plain :icon="Plus" size="small" @click="dialog = true; dialogTarget = 'create'" />
  </div>
  <CreateUpdateModal v-model="dialog" :target="dialogTarget" :updated-item="updatedItem" />
  <el-row v-if="!store.state.user._id">
    <h2>Войдите, чтобы продолжить!</h2>
  </el-row>
  <el-row v-else v-loading="loading">
    <el-col :span="18">
      <SearchInput v-model="searchQuery" />
      <MainDisplayLayout :items="queriedItems" @update-item="updateItem" @delete-item="deleteItem" />
    </el-col>
    <el-col :span="5" :push="1">
      <AsideFilters
        :items="items"
        v-model:selected-grades="selectedGrades"
        v-model:selected-restrictions="selectedRestrictions"
        v-model:selected-genres="selectedGenres"
        v-model:selected-developers="selectedDevelopers"
      />
    </el-col>
  </el-row>
</template>

<script setup>
import { provide, ref, watchEffect } from 'vue'
import { Plus } from '@element-plus/icons-vue'
import { useRoute } from 'vue-router'
import { useStore } from 'vuex'
import { useFilters } from '@/composables/filters'
import MainDisplayLayout from '@/components/MainDisplayLayout'
import AsideFilters from '@/components/AsideFilters'
import { ItemsAPI } from '@/api/ItemsAPI'
import { ElNotification } from 'element-plus'
import SearchInput from '@/components/SearchInput'
import CreateUpdateModal from '@/components/CreateUpdateModal'

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
      const response = await ItemsAPI.getByType(route.meta.type)
      items.value = response.data
    }
  } catch (e) {
    ElNotification.error({
      title: e.response.data.message,
      position: 'bottom-right'
    })
  }
  loading.value = false
}

const updateItem = async (item) => {
  dialog.value = true
  dialogTarget.value = 'update'
  updatedItem.value = item
}

const deleteItem = async id => {
  try {
    const response = await ItemsAPI.delete(id)
    ElNotification.success({
      title: response.message,
      position: 'bottom-right'
    })
    await refetch()
  } catch (e) {
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
