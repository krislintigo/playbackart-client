<template>
  <el-header style="padding: 0 30px">
    <el-row justify="space-between" align="middle">
      <h1>PlaybackArt</h1>
      <div class="right-container">
        <el-tabs v-model="active" @tab-click="tabClick">
          <el-tab-pane v-for="tab in tabs" :key="tab.label" :name="tab.label">
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
import { List, Collection, Film, Monitor, VideoCameraFilled } from '@element-plus/icons-vue'
import ProfileController from '@/components/ProfileController'

const tabs = [
  {
    label: '/',
    icon: List,
    name: 'Все'
  },
  {
    label: '/films',
    icon: VideoCameraFilled,
    name: 'Фильмы'
  },
  {
    label: '/series',
    icon: Film,
    name: 'Сериалы'
  },
  {
    label: '/games',
    icon: Monitor,
    name: 'Игры'
  },
  {
    label: '/books',
    icon: Collection,
    name: 'Книги'
  }
]

const router = useRouter()

const active = ref('/')

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
