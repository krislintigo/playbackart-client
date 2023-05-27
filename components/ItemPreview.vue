<template>
  <el-row>
    <el-col :span="10">
      <el-image :src="item.image">
        <template #error>
          <el-row class="image-placeholder">
            <el-icon :size="175"><picture-rounded /></el-icon>
          </el-row>
        </template>
      </el-image>
    </el-col>
    <el-col :span="13" :push="1">
      <h2 class="item-header">{{ item.name }}</h2>
      <h3 style="margin-bottom: 5px">Информация:</h3>
      <div class="tags-container">
        <el-tag type="info">{{ getTypeWord(item.type) }}</el-tag>
        <el-tag v-if="item.year" type="info">{{ item.year }}</el-tag>
        <el-tag v-if="item.restriction" type="info">{{
          item.restriction
        }}</el-tag>
      </div>
      <div v-if="item.developers.length">
        <h3 style="margin-bottom: 5px">
          {{ getDeveloperWordByType(item.type, item.developers.length) }}:
        </h3>
        <div class="tags-container">
          <el-tag
            v-for="(developer, i) in item.developers"
            :key="i"
            type="info"
          >
            {{ developer }}
          </el-tag>
        </div>
      </div>
      <div v-if="item.genres.length">
        <h3 style="margin-bottom: 5px">Жанры:</h3>
        <div class="tags-container">
          <el-tag v-for="(genre, i) in item.genres" :key="i" type="info">
            {{ genre }}
          </el-tag>
        </div>
      </div>
      <el-collapse v-if="editable">
        <el-collapse-item :class="['set-status', item.status]">
          <template #title>
            <el-row align="middle" style="column-gap: 10px">
              <el-icon size="large"
                ><component
                  :is="statuses.find((s) => s.value === item.status).icon"
              /></el-icon>
              <h3>{{ statuses.find((s) => s.value === item.status).title }}</h3>
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
              :style="{ fontSize: 'large', color: status.color }"
              @click="updateItemStatus(status.value)"
            >
              <h3 class="set-status-button-text">{{ status.title }}</h3>
            </el-button>
          </el-row>
        </el-collapse-item>
      </el-collapse>
    </el-col>
  </el-row>
</template>

<script setup lang="ts">
import { ElNotification } from 'element-plus'
import { PictureRounded } from '@element-plus/icons-vue'

const props = defineProps<{
  item: Item
  editable: boolean
}>()

const refetch = inject('refetch') as Function

const updateItemStatus = async (status: string) => {
  try {
    await ItemsAPI.update(props.item.id, { status } as Item)
    refetch()
    ElNotification.success({
      title: 'Статус изменен',
      position: 'bottom-right',
    })
  } catch (error: any) {
    ElNotification.error({
      title: error.response.data.message,
      position: 'bottom-right',
    })
  }
}
</script>

<style scoped>
.item-header {
  word-break: normal;
  text-align: left;
}

.tags-container {
  display: flex;
  flex-wrap: wrap;
  row-gap: 5px;
  column-gap: 7px;
  margin-bottom: 20px;
}

.set-status-button-text {
  font-size: 16px;
}
</style>
<style>
@import '../assets/setStatusColors.css';

.set-status .el-collapse-item__header {
  padding: 0 15px;
  border-bottom: 0;
}

.el-collapse-item__content {
  display: flex;
  flex-direction: column;
  padding: 10px 0 0 2px;
  row-gap: 10px;
}
</style>
