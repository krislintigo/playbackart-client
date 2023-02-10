<template>
  <el-popover placement="bottom" :width="380" trigger="click">
    <template #reference>
      <el-avatar :size="50" :icon="store.state.user._id ? User : Failed" />
    </template>
    <h2>Профиль</h2>
    <div v-if="store.state.user.login">
      <h3 >Добро пожаловать, {{store.state.user.login}}!</h3>
      <h4 style="margin-bottom: 5px">
        Ваш список слежения:
        <el-button text circle :type="watchingChanged ? 'warning' : 'success'" size="small" @click="saveWatching">
          <el-icon :size="20"><CircleCheck /></el-icon>
        </el-button>
      </h4>
      <TextEditor v-model="watching" @input="watchingChanged = true" />
      <el-row justify="end" style="margin-top: 10px;">
        <el-button type="danger" @click="handleUserAction('logout')">Выход</el-button>
      </el-row>
    </div>
    <div v-else>
      <h3>Войдите в аккаунт!</h3>
      <el-form v-model="auth" label-position="right" :label-width="65">
        <el-form-item label="Логин">
          <el-input v-model="auth.login" />
        </el-form-item>
        <el-form-item label="Пароль">
          <el-input v-model="auth.password" type="password" show-password />
        </el-form-item>
        <el-row justify="end">
          <el-button type="success" @click="handleUserAction('login')">Вход</el-button>
          <el-button type="warning" @click="handleUserAction('register')">Регистрация</el-button>
        </el-row>
      </el-form>
    </div>
  </el-popover>
</template>

<script setup lang="ts">
import { computed, reactive, ref } from 'vue'
import { useStore } from 'vuex'
import { User, Failed, CircleCheck } from '@element-plus/icons-vue'
import { AuthAPI } from '@/api/AuthAPI'
import { userNames } from '@/store/modules/user'
import { ElNotification } from 'element-plus'
import { UserAPI } from '@/api/UserAPI'
import { AuthData } from '@/interfaces/auth-data'
import TextEditor from '@/components/TextEditor.vue'

const store = useStore()

const auth: AuthData = reactive({
  login: '',
  password: ''
})
const watching = computed({
  get: () => store.state.user.watching,
  set: value => store.commit(userNames.setWatching, value)
})
const watchingChanged = ref<boolean>(false);

(async () => {
  try {
    const validateResponse = await AuthAPI.validate()
    const userResponse = await UserAPI.getOneShort(validateResponse.data.id)
    store.commit(userNames.setUser, userResponse.data)
  } catch (e) {
    console.error('Invalid token')
  }
})()

const handleUserAction = async (action: 'register' | 'login' | 'logout') => {
  try {
    const response = await AuthAPI[action](auth)
    if (action === 'logout') store.commit(userNames.resetUser)
    else store.commit(userNames.setUser, response.data)
    ElNotification.success({
      title: response.message,
      position: 'bottom-right'
    })
  } catch (e: any) {
    ElNotification.error({
      title: e.response.data.message,
      position: 'bottom-right'
    })
  }
}

const saveWatching = async () => {
  try {
    const response = await UserAPI.updateWatching(watching.value)
    ElNotification.success({
      title: response.message,
      position: 'bottom-right'
    })
    watchingChanged.value = false
  } catch (e: any) {
    ElNotification.error({
      title: e.response.data.message,
      position: 'bottom-right'
    })
  }
}
</script>

<style scoped>

</style>

<style>
.el-textarea__inner {
  resize: none !important;
  font-family: Avenir, Helvetica, Arial, sans-serif !important;
}
</style>
