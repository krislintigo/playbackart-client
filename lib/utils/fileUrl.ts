export const fileUrl = (key: string | undefined) => {
  if (!key) return ''
  return (
    (import.meta.env.VITE_MYAPP_API_URL || 'http://localhost:9000') +
    '/objects/' +
    key
  )
}
