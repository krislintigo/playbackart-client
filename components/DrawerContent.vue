<template lang="pug">
el-tabs.hidden-md-and-up.mb-10(
  v-model='active',
  tab-position='right',
  @tab-click='$emit("tab-click", $event)'
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
</template>

<script setup lang="ts">
defineEmits<{
  (e: 'tab-click', value: string): void
}>()

const active = defineModel<string>('active', { required: true })
const modal = defineModel<boolean>('modal', { required: true })

const authStore = useAuthStore()
</script>

<style scoped lang="scss"></style>
