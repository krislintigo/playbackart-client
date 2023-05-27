<template>
  <el-header class="header">
    <el-row justify="space-between" align="middle">
      <el-col :span="24" :md="4">
        <h1>PlaybackArt</h1>
      </el-col>
      <div style="display: flex; column-gap: 30px">
        <el-tabs v-model="active" @tab-click="tabClick">
          <el-tab-pane
            v-for="tab in navigationTabs"
            :key="tab.label"
            :name="routePath(tab.label)"
          >
            <template #label>
              <el-icon><component :is="tab.icon" /></el-icon>
              {{ tab.name }}
            </template>
          </el-tab-pane>
        </el-tabs>
        <ProfileController />
      </div>
    </el-row>
  </el-header>
</template>

<script setup lang="ts">
const router = useRouter()
const route = useRoute()

const active = ref<string>(location.pathname)

const routePath = (path: string) => {
  if (route.params.login) {
    return `/${route.params.login}${path === '/' ? '' : path}`
  }
  return path
}

const tabClick = (tab: any) => {
  router.push(tab.props.name)
}
</script>

<style scoped>
.header {
  --el-header-height: 60px;
  padding: 0 30px;
}

@media (max-width: 992px) {
  .header {
    --el-header-height: 130px;
  }
}
</style>
