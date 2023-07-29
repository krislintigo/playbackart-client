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
    ElMessage.error('Что-то пошло не так...')
  }
}, 5000)

watch(() => _user.value.list, save)
</script>

<style scoped></style>
