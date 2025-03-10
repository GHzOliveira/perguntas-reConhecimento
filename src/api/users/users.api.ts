import { User } from '../../pages/admin/interface/user'
import api from '../api'

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
   * Cria um novo usuário com suporte a campos dinâmicos.
   * @param userData Dados do usuário
   * @param validateSchema Se true, valida os dados dinâmicos contra o esquema ativo
   */
  static async create(userData: Record<string, any>, validateSchema = false): Promise<User> {
    try {
      const { nome, email, filialId, companyId, respondeuForm = false, ...dynamicFields } = userData

      const payload = {
        nome,
        email,
        filialId: Number(filialId),
        companyId: Number(companyId),
        respondeuForm,
        dynamicResponses: dynamicFields
      }

      const response = await api.post<StandardResponse<User>>(
        `/users${validateSchema ? '?validateSchema=true' : ''}`, 
        payload
      )
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
   * Atualiza os dados de um usuário, incluindo campos fixos e dinâmicos.
   * @param userId ID do usuário
   * @param userData Dados parciais do usuário
   * @param validateSchema Se true, valida os dados dinâmicos contra o esquema ativo
   */
  static async update(
    userId: number, 
    userData: Partial<Record<string, any>>,
    validateSchema = false
  ): Promise<User> {
    try {
      const { nome, email, filialId, companyId, respondeuForm, ...dynamicFields } = userData
      
      const payload: Record<string, any> = {}
      
      if (nome !== undefined) payload.nome = nome
      if (email !== undefined) payload.email = email
      if (filialId !== undefined) payload.filialId = Number(filialId)
      if (companyId !== undefined) payload.companyId = Number(companyId)
      if (respondeuForm !== undefined) payload.respondeuForm = respondeuForm
      
      if (Object.keys(dynamicFields).length > 0) {
        payload.dynamicResponses = dynamicFields
      }

      const response = await api.patch<StandardResponse<User>>(
        `/users/${userId}${validateSchema ? '?validateSchema=true' : ''}`, 
        payload
      )
      return response.data.data
    } catch (error) {
      console.error(`Erro ao atualizar usuário ${userId}:`, error)
      throw error
    }
  }

   /**
   * Atualiza apenas os dados dinâmicos de um usuário.
   * @param userId ID do usuário
   * @param dynamicData Dados dinâmicos a serem atualizados
   * @param validateSchema Se true, valida os dados dinâmicos contra o esquema ativo
   */
   static async updateDynamicData(
    userId: number, 
    dynamicData: Record<string, any>,
    validateSchema = false
  ): Promise<User> {
    try {
      const response = await api.patch<StandardResponse<User>>(
        `/users/${userId}/dynamic-responses${validateSchema ? '?validateSchema=true' : ''}`, 
        dynamicData
      )
      return response.data.data
    } catch (error) {
      console.error(`Erro ao atualizar dados dinâmicos do usuário ${userId}:`, error)
      throw error
    }
  }

  /**
   * Busca apenas os dados dinâmicos de um usuário.
   * @param userId ID do usuário
   */
  static async fetchDynamicData(userId: number): Promise<Record<string, any>> {
    try {
      const response = await api.get<StandardResponse<Record<string, any>>>(`/users/${userId}/dynamic-responses`)
      return response.data.data
    } catch (error) {
      console.error(`Erro ao buscar dados dinâmicos do usuário ${userId}:`, error)
      throw error
    }
  }
}