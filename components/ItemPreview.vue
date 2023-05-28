<template lang="pug">
el-row
  el-col(:span='10')
    el-image(:src='item.image')
      template(#error)
        el-row.image-placeholder
          el-icon(:size='175')
            ElIconPictureRounded
  el-col(:span='13', :push='1')
    h2.item-header {{ item.name }}
    h3(style='margin-bottom: 5px') Информация:
    .tags-container
      el-tag(type='info') {{ getTypeWord(item.type) }}
      el-tag(v-if='item.year', type='info') {{ item.year }}
      el-tag(v-if='item.restriction', type='info') {{ item.restriction }}
    div(v-if='item.developers.length')
      h3(style='margin-bottom: 5px') {{ getDeveloperWordByType(item.type, item.developers.length) }}:
      .tags-container
        el-tag(
          v-for='(developer, i) in item.developers',
          :key='i',
          type='info'
        ) {{ developer }}
    div(v-if='item.genres.length')
      h3(style='margin-bottom: 5px') Жанры:
      .tags-container
        el-tag(v-for='(genre, i) in item.genres', :key='i', type='info') {{ genre }}
    el-collapse(v-if='editable')
      el-collapse-item(:class='["set-status", item.status]')
        template(#title)
          el-row(align='middle', style='column-gap: 10px')
            el-icon(size='large')
              component(
                :is='statuses.find((s) => s.value === item.status).icon'
              )
            h3 {{ statuses.find((s) => s.value === item.status).title }}
        el-row(
          v-for='status in statuses',
          :key='status.value',
          align='middle',
          :class='status.value'
        )
          el-button(
            text,
            :icon='status.icon',
            :style='{ fontSize: "large", color: status.color }',
            @click='updateItemStatus(status.value)'
          )
            h3.set-status-button-text {{ status.title }}
</template>

<script setup lang="ts">
const props = defineProps<{
  item: Instance<Item>
  editable: boolean
}>()

const updateItemStatus = async (status: string) => {
  try {
    await props.item.save({ diff: { status } })
    ElNotification.success({
      title: 'Статус изменен',
      position: 'bottom-right',
    })
  } catch (error: any) {
    ElNotification.error({
      title: 'Что-то пошло не так...',
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
