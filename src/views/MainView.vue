<template>
  <el-row v-if="!store.state.user._id">
    <h2>Войдите, чтобы продолжить!</h2>
  </el-row>
  <el-row v-else v-loading="loading" justify="center" :gutter="30" style="margin-bottom: 30px;">
    <el-col :span="24" :lg="17">
      <div style="display: flex; align-items: center; column-gap: 10px">
        <h2>{{route.meta.mainHeader}}</h2>
        <el-button circle plain :icon="Plus" size="small" @click="dialog = true; dialogTarget = 'create'" />
      </div>
      <CreateUpdateModal v-model="dialog" :target="dialogTarget" :updated-item="updatedItem" />
      <el-drawer v-model="drawer" size="390px" title="Фильтры">
        <el-scrollbar>
          <AsideFilters
            :items="items"
            v-model:selected-grades="selectedGrades"
            v-model:selected-restrictions="selectedRestrictions"
            v-model:selected-genres="selectedGenres"
            v-model:selected-developers="selectedDevelopers"
            v-model:selected-franchises="selectedFranchises"
          />
        </el-scrollbar>
      </el-drawer>
      <div style="display: flex; column-gap: 10px; margin-bottom: 20px;">
        <el-button class="shown-1500-and-down" :icon="Filter" text circle @click="drawer = true" />
        <SearchInput v-model="searchQuery" />
      </div>
      <MainDisplayLayout :items="queriedItems" @update-item="updateItem" @delete-item="deleteItem" />
    </el-col>
    <el-col :span="6" class="hidden-1500-and-down">
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
</template>

<script setup>
import { provide, ref, watch, watchEffect } from 'vue'
import { Plus, Filter } from '@element-plus/icons-vue'
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
const drawer = ref(false)
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

watch(() => drawer.value, (open) => {
  document.documentElement.style.paddingRight =
    open ? window.innerWidth - document.documentElement.clientWidth + 'px' : ''
  document.documentElement.style.overflowY = open ? 'hidden' : 'scroll'
})
</script>

<style scoped>
@media (max-width: 1500px) {
  .hidden-1500-and-down {
    display: none;
  }
}

@media (min-width: 1500px) {
  .shown-1500-and-down {
    display: none;
  }
}

</style>
