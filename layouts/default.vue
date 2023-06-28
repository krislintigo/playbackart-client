<template lang="pug">
el-main.m-auto(class='max-w-[1550px]')
  el-header.px-7.header(height='70px')
    el-row(justify='space-between', align='middle')
      el-col(:span='24', :md='4')
        h1.text-4xl.my-5.font-bold PlaybackArt
      .flex.gap-x-8
        el-tabs(v-model='active', @tab-click='tabClick')
          el-tab-pane(
            v-for='tab in navigationTabs',
            :key='tab.label',
            :name='tab.searchType'
          )
            template(#label)
              el-icon
                component(:is='tab.icon')
              span.ml-2 {{ tab.label }}
        client-only
          ProfileController
  el-divider
  slot
  el-backtop
</template>

<script setup lang="ts">
const route = useRoute()

const active = ref((route.query.type as string) ?? '')

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

<style scoped lang="scss"></style>
