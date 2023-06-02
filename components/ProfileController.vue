<template lang="pug">
el-popover(placement='bottom', :width='382', trigger='click')
  template(#reference)
    div
      client-only
        el-avatar(
          :size='50',
          :icon='authStore.isAuthenticated ? ElIconUser : ElIconFailed'
        )
  el-row(justify='space-between', align='middle')
    h2 Профиль
    //el-button(circle, text, size='large', @click='toggleDark()')
    //  el-icon(v-if='isDark', :size='24')
    //    ElIconSunny
    //  el-icon(v-else, :size='24')
    //    ElIconMoon
  div(v-if='authStore.isAuthenticated')
    h3 Добро пожаловать, {{ authStore.user?.login }}!
    client-only
      h4(style='margin-bottom: 0') Поделиться приложением:
      h4(style='margin-top: 0') {{ shareLink }}
    el-collapse.profile-collapse
      el-collapse-item(title='Список')
        ListEditor
      el-collapse-item(title='Отслеживаемые франшизы')
        TrackedFranchisesEditor
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
// const isDark = useDark()
// const toggleDark = useToggle(isDark)
const authData = reactive({
  login: '',
  password: '',
})

const shareLink = computed(() =>
  !process.server ? location.origin + '?userId=' + authStore.user._id : ''
)

const handleUserAction = async (action: 'register' | 'login' | 'logout') => {
  try {
    if (action !== 'logout' && (!authData.login || !authData.password))
      throw new Error('Пожалуйста, заполните поля')
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
</script>

<style scoped></style>
<style>
.profile-collapse .el-collapse-item__header {
  background-color: var(--el-color-info-light-8);
  padding: 0 20px;
  border-left: 5px solid var(--el-color-info-light-3);
}

.profile-collapse .el-collapse-item__content {
  padding: 4px;
}
</style>
