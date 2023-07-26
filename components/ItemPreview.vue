<template lang="pug">
el-row
  el-col(:span='10')
    el-carousel(
      v-if='item.config.seasons.extended',
      ref='carousel',
      indicator-position='none',
      arrow='never',
      :autoplay='false'
    )
      el-carousel-item(v-for='(season, i) in item.seasons', :key='i')
        .w-full.h-60(v-show='posterProgress', v-loading='posterProgress')
        el-image.mt-5(
          v-show='!posterProgress',
          :src='season.poster',
          @load='posterProgress = false',
          @error='onPosterError'
        )
          template(#error)
            el-row
              el-icon(:size='175')
                ElIconPictureRounded
    template(v-else)
      .w-full.h-60(v-show='posterProgress', v-loading='posterProgress')
      el-image.mt-5(
        v-show='!posterProgress',
        :src='item.poster',
        @load='posterProgress = false',
        @error='onPosterError'
      )
        template(#error)
          el-row
            el-icon(:size='175')
              ElIconPictureRounded
  el-col(:span='13', :push='1')
    h2.mt-4.break-normal.text-left.font-bold.text-xl {{ item.name }}
    h3.text-base(v-if='item.config.seasons.extended') {{ item.seasons[currentSeason].name }} ({{ item.seasons[currentSeason].year }})
    el-row.mt-2(v-if='item.config.seasons.extended', align='middle')
      el-button(
        :icon='ElIconArrowLeft',
        circle,
        size='small',
        :disabled='currentSeason === 0',
        @click='currentSeason--'
      )
      p.mx-2 Сезоны
      el-button(
        :icon='ElIconArrowRight',
        circle,
        size='small',
        :disabled='currentSeason === item.seasons.length - 1',
        @click='currentSeason++'
      )
    h4.mt-4.mb-2.font-bold Информация:
    .flex.flex-wrap.gap-x-2.gap-y-2.mb-5
      el-tag(type='info') {{ getTypeWord(item.type) }}
      el-tag(
        v-if='item.config.seasons.extended && item.seasons.at(0).year && item.seasons.at(-1).year',
        type='info'
      ) {{ item.seasons.at(0).year + ' - ' + item.seasons.at(-1).year }}
      el-tag(v-else-if='item.year', type='info') {{ item.year }}
      el-tag(v-if='item.restriction', type='info') {{ item.restriction }}
    template(v-if='item.genres.length')
      h4.mb-2.font-bold Жанры:
      .flex.flex-wrap.gap-x-2.gap-y-2.mb-5
        el-tag(v-for='(genre, i) in item.genres', :key='i', type='info') {{ genre }}
    template(v-if='item.developers.length')
      h4.mb-2.font-bold {{ getDeveloperWordByType(item.type, item.developers.length) }}:
      .flex.flex-wrap.gap-x-2.gap-y-2.mb-5
        el-tag(
          v-for='(developer, i) in item.developers',
          :key='i',
          type='info'
        ) {{ developer }}
    template(v-if='uniqueSeasonDevelopers(item).length')
      h4.mb-2.font-bold {{ getDeveloperWordByType(item.type, uniqueSeasonDevelopers(item).length) }}:
      .flex.flex-wrap.gap-x-2.gap-y-2.mb-5
        el-tag(
          v-for='(developer, i) in uniqueSeasonDevelopers(item)',
          :key='i',
          type='info',
          :hit='item.seasons[currentSeason].developers.includes(developer)'
        ) {{ developer }}
    //el-divider
    //template(v-if='item.developers.length')
    //  h4.mb-2.font-bold {{ getDeveloperWordByType(item.type, item.developers.length) }} сезона:
    //  .flex.flex-wrap.gap-x-2.gap-y-2.mb-5
    //    el-tag(
    //      v-for='(developer, i) in item.developers',
    //      :key='i',
    //      type='info'
    //    ) {{ developer }}
    el-collapse(v-if='authStore.isAuthenticated && !route.query.userId')
      el-collapse-item(:class='["set-status-collapse", item.status]')
        template(#title)
          el-row.gap-x-3(align='middle')
            el-icon(size='large')
              component(
                :is='statuses.find((s) => s.value === item.status).icon'
              )
            h3.font-bold.text-base {{ statuses.find((s) => s.value === item.status).title }}
        el-row(
          v-for='status in statuses.filter((i) => i.value !== item.status)',
          :key='status.value',
          align='middle',
          :class='status.value'
        )
          el-button(
            text,
            :style='{ fontSize: "18px", color: status.color }',
            @click='updateItemStatus(status.value)'
          )
            el-row.gap-x-3(justify='space-between', align='middle')
              el-icon(size='large')
                component(:is='status.icon')
              h3.font-bold.text-base {{ status.title }}
</template>

<script setup lang="ts">
const props = defineProps<{ item: Item }>()

const route = useRoute()
const authStore = useAuthStore()

const carousel = ref<any>(null)
const currentSeason = ref(0)
const posterProgress = ref(true)

watchEffect(() => {
  if (!carousel.value) return
  carousel.value.setActiveItem(currentSeason.value)
})

const onPosterError = () => {
  posterProgress.value = false
  if (!props.item.poster) return
  ElNotification.warning({
    title: 'Кажется, ссылка на фото элемента недействительна...',
    position: 'bottom-right',
  })
}

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

<style scoped></style>

<style>
.set-status-collapse .el-collapse-item__header {
  padding: 0 15px;
  border-bottom: 0;
}

.set-status-collapse .el-collapse-item__content {
  display: flex;
  flex-direction: column;
  padding: 10px 0 0 2px;
  row-gap: 10px;
}
</style>
