<template>
  <el-row v-if="!store.state.user._id">
    <h2>Войдите, чтобы продолжить!</h2>
  </el-row>
  <el-row v-else-if="item.id">
    <el-col :xs="24" :sm="24" :md="24" :lg="5" :xl="10">
      <el-image :src="item.image">
        <template #error>
          <el-row class="image-placeholder">
            <el-icon :size="400"><picture-rounded /></el-icon>-
          </el-row>
        </template>
      </el-image>
    </el-col>
    <el-col :span="13" :push="1" :xs="{span: 24, push: 0}">
      <h2 class="item-header">{{ item.name }}</h2>
      <h3 style="margin-bottom: 10px;">Информация:</h3>
      <div style="display: flex; row-gap: 5px; column-gap: 7px; flex-wrap: wrap; margin-bottom: 20px;">
        <el-tag type="info">{{ getTypeWord(item.type) }}</el-tag>
        <el-tag v-if="item.year" type="info">{{ item.year }}</el-tag>
        <el-tag v-if="item.restriction" type="info">{{ item.restriction }}</el-tag>
      </div>
      <div v-if="item.developers">
        <h3 style="margin-bottom: 10px;">{{getDeveloperWordByType(item.type, item.developers.length)}}:</h3>
        <div style="display: flex; row-gap: 5px; column-gap: 7px; flex-wrap: wrap; margin-bottom: 20px;">
          <el-tag v-for="(developer, i) in item.developers" :key="i" type="info">
            {{ developer }}
          </el-tag>
        </div>
      </div>
      <div v-if="item.genres">
        <h3 style="margin-bottom: 10px;">Жанры:</h3>
        <div style="display: flex; row-gap: 5px; column-gap: 7px; flex-wrap: wrap; margin-bottom: 20px;">
          <el-tag v-for="(genre, i) in item.genres" :key="i" type="info">
            {{ genre }}
          </el-tag>
        </div>
      </div>
      <el-collapse style="width: 300px;">
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
            <el-button
              text
              :icon="status.icon"
              :style="{fontSize: 'large', color: status.color}"
              @click="updateItemStatus(status.value)"
            >
              <h3 class="set-status-button-text">{{status.title}}</h3>
            </el-button>
          </el-row>
        </el-collapse-item>
      </el-collapse>
    </el-col>
  </el-row>
</template>

<script setup>
import { ref, watchEffect } from 'vue'
import { useRoute } from 'vue-router'
import { useStore } from 'vuex'
import { ItemsAPI } from '@/api/ItemsAPI'
import { PictureRounded } from '@element-plus/icons-vue'
import { ElNotification } from 'element-plus'
import { statuses } from '@/data/static'
import { getTypeWord } from '@/utils/getTypeWord'
import { getDeveloperWordByType } from '@/utils/getDeveloperWordByType'

const route = useRoute()
const store = useStore()

const item = ref({})
const loading = ref(true)

watchEffect(async () => {
  if (!store.state.user._id) {
    item.value = []
    loading.value = false
    return
  }
  loading.value = true
  try {
    const response = await ItemsAPI.getOne(route.params.id)
    item.value = response.data
  } catch (e) {
    ElNotification.error({
      title: e.response.data.message,
      position: 'bottom-right'
    })
  }
})
</script>

<style scoped>
.item-header {
  font-size: 40px;
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
