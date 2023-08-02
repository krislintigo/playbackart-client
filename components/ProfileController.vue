<template lang="pug">
el-popover(
  :visible='visible',
  placement='bottom',
  :width='380',
  trigger='click',
  popper-class='mr-5'
)
  template(#reference)
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
      el-button.ml-2(
        circle,
        plain,
        size='small',
        :icon='ElIconShare',
        @click='copyLink'
      )
    ListEditor
    el-row.my-3(justify='center')
      el-button.w-full(type='primary', @click='trackedDialog = true') Отслеживаемое
      AppDialog(
        v-model='trackedDialog',
        title='Отслеживаемое',
        max-width='700px'
      )
        TrackedController
    el-row.mt-3(justify='end')
      el-button(type='danger', @click='handleUserAction("logout")') Выход
  div(v-else)
    h3.my-3.font-bold.text-base Войдите в аккаунт!
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
import TrackedController from '~/components/TrackedController.vue'

const { api } = useFeathers()
const route = useRoute()
const authStore = useAuthStore()
// const isDark = useDark({ storageKey: 'theme' })
// const toggleDark = useToggle(isDark)

const visible = ref(false)
const trackedDialog = ref(false)
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
    ElMessage.success('Ссылка успешно скопирована!')
  } catch (e: Error) {
    ElMessage.error(e.message)
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
    ElMessage.success('Успешно!')
  } catch (e: Error) {
    ElMessage.error(e.message)
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
