<template lang="pug">
el-popover(
  :visible='visible',
  placement='bottom',
  :width='380',
  trigger='click'
)
  template(#reference)
    div
      client-only
        el-avatar.cursor-pointer(
          :size='50',
          :icon='authStore.isAuthenticated ? ElIconUserFilled : ElIconUser',
          @click='visible = !visible'
        )
  el-row(justify='space-between', align='middle')
    h2.mb-3.font-bold.text-2xl Профиль
    //el-button(circle, text, size='large', @click='toggleDark()')
    //  el-icon(v-if='isDark', :size='24')
    //    ElIconSunny
    //  el-icon(v-else, :size='24')
    //    ElIconMoon
  div(v-if='authStore.isAuthenticated')
    h3.my-3.font-bold.text-lg Добро пожаловать, {{ authStore.user.login }}!
    el-row.mb-4(align='middle')
      h4.m-0.text-base.font-bold Поделиться приложением:
      el-button(
        circle,
        plain,
        size='small',
        :icon='ElIconShare',
        style='margin-left: 5px',
        @click='copyLink'
      )
    ListEditor
    el-row(justify='center', style='margin: 10px 5px')
      el-button(
        type='primary',
        style='width: 100%',
        @click='trackedFranchisesDialog = true'
      ) Отслеживаемые франшизы
      client-only
        AppDialog(
          v-model='trackedFranchisesDialog',
          title='Отслеживаемые франшизы',
          max-width='700px'
        )
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
const route = useRoute()
const authStore = useAuthStore()
// const isDark = useDark({ storageKey: 'theme' })
// const toggleDark = useToggle(isDark)

const visible = ref(false)
const trackedFranchisesDialog = ref(false)
const authData = reactive({
  login: '',
  password: '',
})

const copyLink = async () => {
  try {
    if (!navigator?.clipboard?.writeText)
      throw new Error('Ваш браузер не поддерживает эту функцию!')
    const query =
      JSON.stringify(route.query) === '{}'
        ? '?userId=' + authStore.user._id
        : route.fullPath + '&userId=' + authStore.user._id
    await navigator.clipboard.writeText(location.origin + query)
    ElNotification.success({
      title: 'Ссылка успешно скопирована!',
      position: 'bottom-right',
    })
  } catch (e: Error) {
    ElNotification.error({
      title: e.message,
      position: 'bottom-right',
    })
  }
}

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
  } catch (e: Error) {
    ElNotification.error({
      title: e.message,
      position: 'bottom-right',
    })
  }
}
</script>

<style scoped></style>
<style lang="scss">
.profile-collapse .el-collapse-item__header {
  background-color: var(--el-color-info-light-8);
  padding: 0 20px;
  border-left: 5px solid var(--el-color-info-light-3);
}

.profile-collapse .el-collapse-item__content {
  padding: 4px;
}
</style>
