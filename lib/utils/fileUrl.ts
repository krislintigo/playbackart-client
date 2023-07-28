export const fileUrl = (key: string | undefined) => {
  if (!key) return null
  return (
    (import.meta.env.VITE_MYAPP_API_URL || 'http://localhost:3030') +
    '/objects/' +
    key
  )
}
