<template>
  <el-header style="padding: 0 30px">
    <el-row justify="space-between" align="middle">
      <h1>PlaybackArt</h1>
      <h2 class="hidden-md-and-up">For mobile</h2>
      <h2 class="hidden-md-and-down">For PC</h2>
      <div class="right-container">
        <el-tabs v-model="active" @tab-click="tabClick">
          <el-tab-pane v-for="tab in navigationTabs" :key="tab.label" :name="tab.label">
            <template #label>
              <el-icon><component :is="tab.icon"/></el-icon>
              {{ tab.name }}
            </template>
          </el-tab-pane>
        </el-tabs>
        <ProfileController />
      </div>
    </el-row>
  </el-header>
  <el-divider />
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { navigationTabs } from '@/data/static'
import ProfileController from '@/components/ProfileController'

const router = useRouter()

const active = ref(location.pathname)

const tabClick = (tab) => {
  router.push(tab.props.name)
}
</script>

<style scoped>
.right-container {
  display: flex;
  column-gap: 30px;
}
</style>
