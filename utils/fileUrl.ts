export const fileUrl = (key: string | undefined) => {
  if (!key) return ''
  return `${import.meta.env.VITE_STORAGE_URL}/${key}`
}
