export const fileUrl = (key: string | undefined) => {
  if (!key) return ''
  return (import.meta.env.VITE_STORAGE_URL || 'http://localhost:9000') + key
}
