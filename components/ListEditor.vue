<template lang="pug">
TextEditor(v-model='_user.list')
</template>

<script setup lang="ts">
const authStore = useAuthStore()

const _user = ref(authStore.user.clone())

const save = _throttle(async () => {
  console.log('save list')
  try {
    await _user.value.save({ diff: 'list' })
    await _user.value.reset()
  } catch (e: any) {
    ElNotification.error({
      title: 'Что-то пошло не так...',
      position: 'bottom-right',
    })
  }
}, 5000)

watch(() => _user.value.list, save)
</script>

<style scoped></style>
