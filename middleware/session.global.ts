// middleware/session.global.ts
export default defineNuxtRouteMiddleware(async (to, _from) => {
  const authStore = useAuthStore()

  await authStore.getPromise()

  // Allow 404 page to show
  if (!to.matched.length) return

  if (to.meta.public) return

  // if (!authStore.isAuthenticated) return navigateTo('/')
})
