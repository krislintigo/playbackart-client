<template lang="pug">
el-popover(placement='bottom', :width='380', trigger='click')
  template(#reference)
    el-avatar(
      :size='50',
      :icon='authStore.isAuthenticated ? ElIconUser : ElIconFailed'
    )
  el-row(justify='space-between', align='middle')
    h2 Профиль
    el-button(circle, text, size='large', @click='toggleDark()')
      el-icon(v-if='isDark', :size='24')
        ElIconSunny
      el-icon(v-else, :size='24')
        ElIconMoon
  div(v-if='authStore.isAuthenticated')
    h3 Добро пожаловать, {{ authStore.user.login }}!
    client-only
      h4(style='margin-bottom: 0') Поделиться приложением:
      h4(style='margin-top: 0') {{ shareLink }}
    h3(style='margin-bottom: 5px') Ваш список слежения:
      el-button(
        text,
        circle,
        :type='listChanged ? "warning" : "success"',
        size='small',
        @click='saveWatching'
      )
        el-icon(:size='20')
          ElIconCircleCheck
    TextEditor(v-model='list')
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
const isDark = useDark()
const toggleDark = useToggle(isDark)
const authData = reactive({
  login: '',
  password: '',
})

const list = ref('')

const shareLink = computed(() =>
  !process.server ? location.origin + '?userId=' + authStore.user._id : ''
)

const listChanged = computed(() => authStore.user.list !== list.value)

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
