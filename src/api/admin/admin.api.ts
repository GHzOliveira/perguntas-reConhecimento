import api from '../api'

interface LoginResponse {
  token: string
}

export const loginAdmin = async (
  login: string,
  senha: string
): Promise<LoginResponse> => {
  const response = await api.post<LoginResponse>('/admin/login', {
    login,
    senha
  })

  if (response.data.token) {
    localStorage.setItem('admin_token', response.data.token)
    api.defaults.headers.common['Authorization'] =
      `Bearer ${response.data.token}`
  }

  return response.data
}
