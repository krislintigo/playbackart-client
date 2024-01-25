export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.config.errorHandler = (error: any) => {
    ElMessage.error('Что-то пошло не так...')
    console.error(error, error.data)
  }
})
