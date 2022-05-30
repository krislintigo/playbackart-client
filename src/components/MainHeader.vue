<template>
  <el-header>
    <el-row justify="space-between">
      <h1>PlaybackArt</h1>
      <el-tabs>
        <el-tab-pane label="/">
          <template #label>
            <el-icon><List /></el-icon>
            Все
          </template>
        </el-tab-pane>
        <el-tab-pane label="/films">
          <template #label>
            <el-icon><VideoCameraFilled /></el-icon>
            Фильмы
          </template>
        </el-tab-pane>
        <el-tab-pane label="/series">
          <template #label>
            <el-icon><Film /></el-icon>
            Сериалы
          </template>
        </el-tab-pane>
        <el-tab-pane label="/games">
          <template #label>
            <el-icon><Monitor /></el-icon>
            Игры
          </template>
        </el-tab-pane>
        <el-tab-pane label="/books">
          <template #label>
            <el-icon><Collection /></el-icon>
            Книги
          </template>
        </el-tab-pane>
      </el-tabs>
    </el-row>
  </el-header>
</template>

<script setup>

import { List, Collection, Film, Monitor, VideoCameraFilled } from '@element-plus/icons-vue'
</script>

<style scoped>

</style>
