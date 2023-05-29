<template lang="pug">
el-popover(placement='bottom', :width='380', trigger='click')
  template(#reference)
    el-avatar(
      :size='50',
      :icon='authStore.isAuthenticated ? ElIconUser : ElIconFailed'
    )
  el-row(justify='space-between', align='middle')
    h2 Профиль
    el-button(circle, text, size='large', @click='dark = !dark')
      el-icon(v-if='dark', :size='24')
        ElIconSunny
      el-icon(v-else, :size='24')
        ElIconMoon
  div(v-if='authStore.user?.login')
    h3 Добро пожаловать, {{ authStore.user.login }}!
    h4(style='margin-bottom: 5px') Ваш список слежения:
      el-button(
        text,
        circle,
        :type='watchingChanged ? "warning" : "success"',
        size='small',
        @click='saveWatching'
      )
        el-icon(:size='20')
          ElIconCircleCheck
    //TextEditor(v-model='watching', @input='watchingChanged = true')
    el-row(justify='end', style='margin-top: 10px')
      el-button(type='danger', @click='handleUserAction("logout")') Выход
  div(v-else)
    h3 Войдите в аккаунт!
    el-form(v-model='authData', label-position='right', :label-width='65')
      el-form-item(label='Логин')
        el-input(v-model='authData.login')
      el-form-item(label='Пароль')
        el-input(v-model='authData.password', type='password', show-password)
      el-row(justify='end')
        el-button(type='success', @click='handleUserAction("login")') Вход
        el-button(type='warning', @click='handleUserAction("register")') Регистрация
</template>

<script setup lang="ts">
const { api } = useFeathers()
const authStore = useAuthStore()

const authData = reactive({
  login: '',
  password: '',
})

// const watching = computed({
//   get: () => authStore.user.watching,
//   set: (value) => store.commit(userNames.setWatching, value),
// })
const watchingChanged = ref<boolean>(false)
// const dark = ref(!!localStorage.getItem('theme'))
const dark = ref(true)

const handleUserAction = async (action: 'register' | 'login' | 'logout') => {
  try {
    switch (action) {
      case 'login': {
        await authStore.authenticate({ strategy: 'local', ...authData })
        break
      }
      case 'logout': {
        await authStore.logout()
        break
      }
      case 'register': {
        await api
          .service('users')
          .new({ ...authData })
          .save()
        await authStore.authenticate({ strategy: 'local', ...authData })
      }
    }
    ElNotification.success({
      title: 'Успешно!',
      position: 'bottom-right',
    })
  } catch (e: any) {
    ElNotification.error({
      title: e.message,
      position: 'bottom-right',
    })
  }
}

const saveWatching = async () => {
  try {
    const response = await UserAPI.updateWatching(watching.value)
    ElNotification.success({
      title: response.message,
      position: 'bottom-right',
    })
    watchingChanged.value = false
  } catch (e: any) {
    ElNotification.error({
      title: e.response.data.message,
      position: 'bottom-right',
    })
  }
}

watchEffect(() => {
  if (dark.value) {
    // localStorage.setItem('theme', 'dark')
    // document.documentElement.classList.add('dark')
  } else {
    // localStorage.removeItem('theme')
    // document.documentElement.classList.remove('dark')
  }
})
</script>

<style scoped></style>

<style></style>
