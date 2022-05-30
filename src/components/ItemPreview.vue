<template>
  <el-row>
    <el-col :span="10">
      <el-image :src="item.image" />
    </el-col>
    <el-col :span="13" :push="1">
      <h2>{{ item.name }}</h2>
      <h3>Жанры:</h3>
      <el-collapse>
        <el-collapse-item :class="['set-status', item.status]">
          <template #title>
            <el-row align="middle" style="column-gap: 10px">
              <el-icon size="large"><component :is="statuses.find(s => s.value === item.status).icon" /></el-icon>
              <h3>{{statuses.find(s => s.value === item.status).title}}</h3>
            </el-row>
          </template>
          <el-row
            v-for="status in statuses"
            :key="status.value"
            align="middle"
            :class="status.value"
          >
            <el-button text :icon="status.icon" :style="{fontSize: 'large', color: status.color}">
              <h3 class="set-status-button-text">{{status.title}}</h3>
            </el-button>
          </el-row>
        </el-collapse-item>
      </el-collapse>
    </el-col>
  </el-row>
</template>

<script setup>
import { defineProps } from 'vue'
import { VideoPlay, VideoPause, Plus, Select, CloseBold } from '@element-plus/icons-vue'

defineProps({
  item: {
    type: Object,
    required: true
  }
})

const statuses = [
  {
    title: 'Смотрю',
    icon: VideoPlay,
    value: 'looking',
    color: '#79bbff'
  },
  {
    title: 'Запланировано',
    icon: Plus,
    value: 'planned',
    color: '#f7b954'
  },
  {
    title: 'Просмотрено',
    icon: Select,
    value: 'viewed',
    color: '#95d475'
  },
  {
    title: 'Отложено',
    icon: VideoPause,
    value: 'postponed',
    color: '#b1b3b8'
  },
  {
    title: 'Брошено',
    icon: CloseBold,
    value: 'abandoned',
    color: '#f56c6c'
  }
]
</script>

<style scoped>
.set-status-button-text {
  font-size: 16px;
}
</style>
<style>
.set-status .el-collapse-item__header {
  padding: 0 20px;
  border-bottom: 0;
}

.el-collapse-item__content {
  display: flex;
  flex-direction: column;
  padding: 10px 0 0 2px;
  row-gap: 10px;
}

.looking .el-collapse-item__header {
  background: #79bbff;
  border-left: 10px solid #a0cfff;
}

.planned .el-collapse-item__header {
  background: #f7b954;
  border-left: 10px solid #f7c9a7;
}

.viewed .el-collapse-item__header {
  background: #95d475;
  border-left: 10px solid #b3e19d;
}

.postponed .el-collapse-item__header {
  background: #b1b3b8;
  border-left: 10px solid #c8c9cc;
}

.abandoned .el-collapse-item__header {
  background: #f56c6c;
  border-left: 10px solid #fab6b6;
}
</style>
