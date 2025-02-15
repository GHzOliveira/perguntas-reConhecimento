import api from '../api'

export interface UserResponse {
  respondeuForm: boolean
}

export class UsersService {
  /**
   * Cria um novo usuário.
   */
  static async create(userData: FormData): Promise<any> {
    try {
      const response = await api.post('/users', userData)
      return response.data
    } catch (error) {
      console.error('Erro ao criar usuário:', error)
      throw error
    }
  }

  /**
   * Exclui um usuário pelo ID.
   */
  static async delete(id: number): Promise<any> {
    try {
      const response = await api.delete(`/users/${id}`)
      return response.data
    } catch (error) {
      console.error(`Erro ao excluir usuário ${id}:`, error)
      throw error
    }
  }

  /**
   * Retorna a lista de todos os usuários.
   */
  static async fetchAll(): Promise<any[]> {
    try {
      const response = await api.get('/users')
      return response.data
    } catch (error) {
      console.error('Erro ao buscar usuários:', error)
      throw error
    }
  }

  /**
   * Submete as respostas de um usuário.
   */
  static async submitResponse(
    userId: number,
    responses: Record<number, number>
  ): Promise<any> {
    try {
      const response = await api.post(`/users/${userId}/responses`, responses)
      return response.data
    } catch (error) {
      console.error(`Erro ao submeter respostas do usuário ${userId}:`, error)
      throw error
    }
  }

  /**
   * Busca as respostas de um usuário.
   */
  static async fetchResponses(userId: number): Promise<any> {
    try {
      const response = await api.get(`/users/${userId}/responses`)
      return response.data
    } catch (error) {
      console.error(`Erro ao buscar respostas do usuário ${userId}:`, error)
      throw error
    }
  }

  /**
   * Marca o formulário como respondido para um usuário.
   */
  static async markFormAsResponded(
    userId: number,
    responded: boolean
  ): Promise<any> {
    try {
      const response = await api.patch(`/users/${userId}/markFormAsResponded`, {
        respondeuForm: responded
      })
      return response.data
    } catch (error) {
      console.error(
        `Erro ao marcar formulário como respondido para o usuário ${userId}:`,
        error
      )
      throw error
    }
  }

  /**
   * Verifica se o formulário do usuário foi respondido.
   */
  static async checkFormResponse(userId: number): Promise<UserResponse> {
    try {
      const response = await api.get(`/users/${userId}/respondeuForm`)
      return response.data
    } catch (error) {
      console.error(
        `Erro ao verificar formulário respondido para o usuário ${userId}:`,
        error
      )
      throw error
    }
  }
}
