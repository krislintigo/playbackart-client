<template>
  <h2>Полный список</h2>
  <el-row v-if="!store.state.user._id">
    <h2>Войдите, чтобы продолжить!</h2>
  </el-row>
  <el-row v-else v-loading="loading">
    <el-col :span="18">
      <SearchInput v-model="searchQuery" />
      <MainDisplayLayout :items="queriedItems" />
    </el-col>
    <el-col :span="5" :push="1">
      <AsideFilters
        :items="allItems"
        v-model:selected-grades="selectedGrades"
        v-model:selected-restrictions="selectedRestrictions"
        v-model:selected-genres="selectedGenres"
        v-model:selected-developers="selectedDevelopers"
      />
    </el-col>
  </el-row>
</template>

<script setup>
import { onBeforeMount, ref, watch } from 'vue'
import { useStore } from 'vuex'
import { useFilters } from '@/composables/filters'
import MainDisplayLayout from '@/components/MainDisplayLayout'
import AsideFilters from '@/components/AsideFilters'
import { ItemsAPI } from '@/api/ItemsAPI'
import { ElMessage } from 'element-plus'
import SearchInput from '@/components/SearchInput'

const store = useStore()

const loading = ref(true)
const allItems = ref([])

const {
  searchQuery,
  selectedGrades,
  selectedRestrictions,
  selectedGenres,
  selectedDevelopers,
  queriedItems
} = useFilters(allItems)

const getItems = async () => {
  if (!store.state.user._id) {
    allItems.value = []
    loading.value = false
    return
  }
  loading.value = true
  try {
    const response = await ItemsAPI.getAll()
    allItems.value = response.data
  } catch (e) {
    ElMessage.error(e.response.data.message)
  }
  loading.value = false
}

onBeforeMount(getItems)

watch(() => store.state.user._id, getItems)
</script>

<style scoped>

</style>
