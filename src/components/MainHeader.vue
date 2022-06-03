<template>
  <el-header class="header">
    <el-row justify="space-between" align="middle">
      <el-col :span="24" :md="4">
        <h1>PlaybackArt</h1>
      </el-col>
      <div style="display: flex; column-gap: 30px">
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
.header {
  --el-header-height: 60px;
  padding: 0 30px
}

@media (max-width: 992px) {
  .header {
    --el-header-height: 130px
  }
}
</style>
