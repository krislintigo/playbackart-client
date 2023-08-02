<template lang="pug">
el-main.m-auto(class='max-w-[1550px]')
  el-header.px-7.header(height='70px')
    el-row(justify='space-between', align='middle')
      el-col(:span='12', :md='4')
        h1.text-4xl.my-5.font-bold PlaybackArt
      .flex.items-center.gap-x-8
        client-only
          el-tabs.hidden-sm-and-down(v-model='active', @tab-click='tabClick')
            el-tab-pane(
              v-for='tab in navigationTabs',
              :key='tab.label',
              :name='tab.searchType'
            )
              template(#label)
                el-icon
                  component(:is='tab.icon')
                span.ml-2 {{ tab.label }}
          ProfileController
          el-button.hidden-lg-and-up(text, @click='drawer = true')
            el-icon(:size='30')
              ElIconMenu
          el-drawer(v-model='drawer', :size='width > 400 ? "400px" : "100%"')
            template(#header)
              h2.text-2xl.font-bold.text-white Меню
            el-tabs.hidden-md-and-up.mb-10(
              v-model='active',
              tab-position='right',
              @tab-click='tabClick'
            )
              el-tab-pane(
                v-for='tab in navigationTabs',
                :key='tab.label',
                :name='tab.searchType'
              )
                template(#label)
                  el-icon
                    component(:is='tab.icon')
                  span.ml-2 {{ tab.label }}
            AsideFilters
  el-divider
  slot
  el-backtop
</template>

<script setup lang="ts">
const route = useRoute()
const { width } = useWindowSize()

const active = ref((route.query.type as string) ?? '')
const drawer = ref(false)

const tabClick = (tab: any) => {
  drawer.value = false
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
