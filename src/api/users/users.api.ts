import { User } from '../../pages/admin/interface/user'
import api from '../api'

// Interface para a resposta padrão da API
interface StandardResponse<T> {
  success: boolean
  message: string
  data: T
}

export interface FormResponseStatus {
  respondeuForm: boolean
}

export class UsersService {
  /**
   * Cria um novo usuário.
   */
  static async create(userData: FormData): Promise<User> {
    try {
      const response = await api.post<StandardResponse<User>>('/users', userData)
      return response.data.data
    } catch (error) {
      console.error('Erro ao criar usuário:', error)
      throw error
    }
  }

  /**
   * Exclui um usuário pelo ID.
   */
  static async delete(id: number): Promise<User> {
    try {
      const response = await api.delete<StandardResponse<User>>(`/users/${id}`)
      return response.data.data
    } catch (error) {
      console.error(`Erro ao excluir usuário ${id}:`, error)
      throw error
    }
  }

  /**
   * Retorna a lista de todos os usuários.
   */
  static async fetchAll(): Promise<User[]> {
    try {
      const response = await api.get<StandardResponse<User[]>>('/users')
      return response.data.data
    } catch (error) {
      console.error('Erro ao buscar usuários:', error)
      return []
    }
  }

  /**
   * Submete as respostas de um usuário.
   */
  static async submitResponse(
    userId: number,
    responses: Record<number, number>
  ): Promise<void> {
    try {
      const response = await api.post<StandardResponse<void>>(`/users/${userId}/responses`, responses)
      return response.data.data
    } catch (error) {
      console.error(`Erro ao submeter respostas do usuário ${userId}:`, error)
      throw error
    }
  }

  /**
   * Busca as respostas de um usuário.
   */
  static async fetchResponses(userId: number): Promise<any[]> {
    try {
      const response = await api.get<StandardResponse<any[]>>(`/users/${userId}/responses`)
      return response.data.data
    } catch (error) {
      console.error(`Erro ao buscar respostas do usuário ${userId}:`, error)
      return []
    }
  }

  /**
   * Marca o formulário como respondido para um usuário.
   */
  static async markFormAsResponded(
    userId: number,
    responded: boolean
  ): Promise<User> {
    try {
      const response = await api.patch<StandardResponse<User>>(`/users/${userId}/markFormAsResponded`, {
        respondeuForm: responded
      })
      return response.data.data
    } catch (error) {
      console.error(
        `Erro ao marcar formulário como respondido para o usuário ${userId}:`,
        error
      )
      throw error
    }
  }

  /**
   * Busca usuários por ID da empresa.
   */
  static async fetchByCompany(companyId: number): Promise<User[]> {
    try {
      const response = await api.get<StandardResponse<User[]>>(`/users/company/${companyId}`);
      return response.data.data;
    } catch (error) {
      console.error('Erro ao buscar usuários da empresa:', error);
      return [];
    }
  }

  /**
   * Verifica se o formulário do usuário foi respondido.
   */
  static async checkFormResponse(userId: number): Promise<FormResponseStatus> {
    try {
      const response = await api.get<StandardResponse<FormResponseStatus>>(`/users/${userId}/respondeuForm`)
      return response.data.data
    } catch (error) {
      console.error(
        `Erro ao verificar formulário respondido para o usuário ${userId}:`,
        error
      )
      throw error
    }
  }
  
  /**
   * Busca um usuário pelo ID.
   */
  static async fetchById(userId: number): Promise<User> {
    try {
      const response = await api.get<StandardResponse<User>>(`/users/${userId}`)
      return response.data.data
    } catch (error) {
      console.error(`Erro ao buscar usuário ${userId}:`, error)
      throw error
    }
  }
  
  /**
   * Atualiza os dados de um usuário.
   */
  static async update(userId: number, userData: Partial<User>): Promise<User> {
    try {
      const response = await api.patch<StandardResponse<User>>(`/users/${userId}`, userData)
      return response.data.data
    } catch (error) {
      console.error(`Erro ao atualizar usuário ${userId}:`, error)
      throw error
    }
  }
}