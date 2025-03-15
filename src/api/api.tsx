import axios from 'axios'
import useAdminStore from '../store/useAdminStore'

const api = axios.create({
  // baseURL: 'https://perguntas-reconhecimento-api-production.up.railway.app'
  baseURL: 'http://localhost:3000'
})

api.interceptors.request.use(config => {
  const token = localStorage.getItem('admin_token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

api.interceptors.response.use(
  response => response,
  error => {
    if (error.response?.status === 401) {
      useAdminStore.getState().logout()
    }
    return Promise.reject(
      new Error(error.response?.data?.message || 'Erro inesperado')
    )
  }
)

export default api
