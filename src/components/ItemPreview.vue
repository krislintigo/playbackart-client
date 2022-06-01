<template>
  <el-row>
    <el-col :span="10">
      <el-image :src="item.image" />
    </el-col>
    <el-col :span="13" :push="1">
      <h2 class="item-header">{{ item.name }}</h2>
      <h3 style="margin-bottom: 5px;">Информация:</h3>
      <div style="display: flex; row-gap: 5px; column-gap: 7px; flex-wrap: wrap; margin-bottom: 20px;">
        <el-tag type="info">{{ getTypeWord(item.type) }}</el-tag>
        <el-tag v-if="item.year" type="info">{{ item.year }}</el-tag>
        <el-tag v-if="item.restriction" type="info">{{ item.restriction }}</el-tag>
      </div>
      <h3 style="margin-bottom: 5px;">Жанры:</h3>
      <div style="display: flex; row-gap: 5px; column-gap: 7px; flex-wrap: wrap; margin-bottom: 20px;">
        <el-tag v-for="(genre, i) in item.genres" :key="i" type="info">
          {{ genre }}
        </el-tag>
      </div>
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
import statuses from '@/data/statuses'
import { getTypeWord } from '@/utils/getTypeWord'

defineProps({
  item: {
    type: Object,
    required: true
  }
})
</script>

<style scoped>
.item-header {
  word-break: normal;
  text-align: left;
}

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
