<template lang="pug">
div
  client-only
    el-drawer(
      v-model='drawer',
      :size='width > 400 ? "400px" : "100%"',
      append-to-body
    )
      template(#header)
        h2.text-2xl.font-medium.text-white Меню
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
            span.ml-2.font-normal {{ tab.label }}
      AsideFilters
      .hidden-sm-and-up
        el-divider
        el-avatar.mt-3.cursor-pointer(:size='50', @click='modal = !modal')
          h3.text-xl {{ authStore.user?.login.slice(0, 2).toUpperCase() }}
  AppDialog(v-model='modal', title='')
    ProfileController
  .m-auto(class='max-w-[1550px]')
    el-header.m-5.mt-7(height='60px')
      el-row.h-full(justify='space-between', align='middle')
        .flex.items-center.gap-x-3
          el-image.w-9(src='/icon.svg')
          h1.text-3xl.font-normal PlaybackArt
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
                  span.ml-2.font-normal {{ tab.label }}
            el-popover(
              teleported,
              :visible='popover',
              placement='bottom',
              :width='380',
              trigger='click',
              popper-class='mr-5'
            )
              template(#reference)
                el-avatar.cursor-pointer.hidden-xs-only(
                  :size='50',
                  @click='popover = !popover'
                )
                  h3.text-xl {{ authStore.user?.login.slice(0, 2).toUpperCase() ?? '-' }}
              ProfileController
            el-button.hidden-lg-and-up(text, @click='drawer = true')
              el-icon(:size='30')
                ElIconOperation
    .mx-5
      client-only
        el-divider(class='!m-0')
    el-main
      slot
    el-backtop
</template>

<script setup lang="ts">
const route = useRoute()
const { width } = useWindowSize()
const authStore = useAuthStore()

const active = ref((route.query.type as string) ?? '')
const drawer = ref(false)
const popover = ref(false)
const modal = ref(false)

const tabClick = (tab: any) => {
  drawer.value = false
  return navigateTo(
    {
      path: route.path,
      query: { ...route.query, type: tab.props.name || undefined },
    },
    { replace: true },
  )
}
</script>

<style scoped lang="scss"></style>
