<template lang="pug">
h3(style='margin: 0 0 5px') Синхронизация:
  el-button(
    text,
    circle,
    :type='listChanged ? "warning" : "success"',
    style='margin-left: 5px',
    size='small',
    @click='saveWatching'
  )
    el-icon(:size='20')
      ElIconCircleCheck
TextEditor(v-model='list')
</template>

<script setup lang="ts">
const authStore = useAuthStore()

const list = ref('')

const listChanged = computed(() => authStore.user.list !== list.value)
const saveWatching = async () => {
  try {
    await authStore.user.save({ diff: { list: list.value } })
    ElNotification.success({
      title: 'Список успешно обновлен',
      position: 'bottom-right',
    })
  } catch (e: any) {
    ElNotification.error({
      title: 'Что-то пошло не так...',
      position: 'bottom-right',
    })
  }
}

watchEffect(() => {
  if (!authStore.user) return
  list.value = authStore.user.list
})
</script>

<style scoped></style>
