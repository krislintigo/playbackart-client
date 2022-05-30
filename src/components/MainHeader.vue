<template>
  <el-header>
    <el-row justify="space-between">
      <h1>PlaybackArt</h1>
      <el-tabs v-model="active" @tab-click="tabClick">
        <el-tab-pane v-for="tab in tabs" :key="tab.label" :name="tab.label">
          <template #label>
            <el-icon><component :is="tab.icon"/></el-icon>
            {{ tab.name }}
          </template>
        </el-tab-pane>
      </el-tabs>
    </el-row>
  </el-header>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { List, Collection, Film, Monitor, VideoCameraFilled } from '@element-plus/icons-vue'

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

</style>
