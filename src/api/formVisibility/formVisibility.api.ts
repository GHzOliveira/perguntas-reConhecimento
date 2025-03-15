import api from '../api'

export const fetchVisibilitySettings = async () => {
  const response = await api.get('/form-visibility')
  return response.data
}

export const updateVisibilitySettings = async (
  updates: { field: string; isVisible: boolean }[]
) => {
  await Promise.all(
    updates.map(update => api.patch('/form-visibility', update))
  )
}
