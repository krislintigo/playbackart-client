<template>
  <el-header class="header">
    <el-row justify="space-between" align="middle">
      <el-col :span="24" :md="4">
        <el-row justify="space-between" align="middle">
          <h1>PlaybackArt</h1>
          <el-col class="hidden-sm-and-up" :span="3">
            <ProfileController />
          </el-col>
        </el-row>
      </el-col>
      <el-row justify="space-between">
        <el-col :span="22" :xs="24" :pull="1">
          <el-tabs v-model="active" @tab-click="tabClick" class="hidden-xs-only">
            <el-tab-pane v-for="tab in navigationTabs" :key="tab.label" :name="tab.label">
              <template #label>
                <el-icon><component :is="tab.icon"/></el-icon>
                {{ tab.name }}
              </template>
            </el-tab-pane>
          </el-tabs>
          <el-tabs v-model="active" class="hidden-sm-and-up" @tab-click="tabClick" tab-position="right">
            <el-tab-pane v-for="tab in navigationTabs" :key="tab.label" :name="tab.label">
              <template #label>
                <el-icon><component :is="tab.icon"/></el-icon>
                {{ tab.name }}
              </template>
            </el-tab-pane>
          </el-tabs>
        </el-col>
        <el-col :span="1" :pull="1" class="hidden-xs-only">
          <ProfileController />
        </el-col>
      </el-row>
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
    --el-header-height: 150px
  }
}

@media (max-width: 768px) {
  .header {
    --el-header-height: 280px;
    padding: 0;
  }
}
</style>
