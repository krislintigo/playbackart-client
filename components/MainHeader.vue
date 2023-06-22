<template lang="pug">
el-header.header
  el-row(justify='space-between', align='middle')
    el-col(:span='24', :md='4')
      h1 PlaybackArt
    div(style='display: flex; column-gap: 30px')
      el-tabs(v-model='active', @tab-click='tabClick')
        el-tab-pane(
          v-for='tab in navigationTabs',
          :key='tab.label',
          :name='tab.searchType'
        )
          template(#label)
            el-icon
              component(:is='tab.icon')
            span(style='margin-left: 4px') {{ tab.label }}
      ProfileController
</template>

<script setup lang="ts">
const route = useRoute()

const active = ref<string>((route.query.type as string) ?? '')

const tabClick = (tab: any) => {
  return navigateTo(
    {
      path: route.path,
      query: { ...route.query, type: tab.props.name || undefined },
    },
    { replace: true }
  )
}
</script>

<style scoped>
.header {
  --el-header-height: 60px;
  padding: 0 30px;
}
</style>
