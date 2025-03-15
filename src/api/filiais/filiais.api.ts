import { Filial } from '../../types/FormType'
import api from '../api'

interface StandardResponse<T> {
  success: boolean
  message: string
  data: T
}

interface CreateManyResponse {
  filiais: Filial[]
  linkUnico: string
}

export class FilialService {
  /**
   * Cria uma nova filial.
   */
  static async create(
    filialData: Omit<Filial, 'id' | 'companyId' | 'linkUnico'>
  ): Promise<Filial> {
    try {
      const response = await api.post<StandardResponse<Filial>>('/filial', filialData)
      return response.data.data 
    } catch (error) {
      console.error('Erro ao criar filial:', error)
      throw error
    }
  }

  /**
   * Cria múltiplas filiais de uma vez.
   */
  static async createMany(data: {
    filiais: Omit<Filial, 'id' | 'companyId' | 'linkUnico'>[]
  }): Promise<CreateManyResponse> {
    try {
      const response = await api.post<StandardResponse<CreateManyResponse>>('/filial/batch', {
        filiais: data.filiais
      })
      return response.data.data
    } catch (error) {
      console.error('Erro ao criar filiais em lote:', error)
      throw error
    }
  }

  /**
   * Retorna as filiais de uma empresa específica.
   */
  static async getByCompanyId(companyId: number): Promise<Filial[]> {
    try {
      const response = await api.get<StandardResponse<Filial[]>>(`/filial/company/${companyId}`)
      return response.data.data
    } catch (error) {
      console.error('Erro ao buscar filiais da empresa:', error)
      return []
    }
  }

  /**
   * Retorna a lista de todas as filiais.
   */
  static async getAll(): Promise<Filial[]> {
    try {
      const response = await api.get<StandardResponse<Filial[]>>('/filial')
      return response.data.data
    } catch (error) {
      console.error('Erro ao buscar todas as filiais:', error)
      return []
    }
  }

  /**
   * Exclui uma filial pelo seu ID.
   */
  static async delete(id: number): Promise<void> {
    try {
      await api.delete(`/filial/${id}`)
    } catch (error) {
      console.error('Erro ao excluir filial:', error)
      throw error
    }
  }

  /**
   * Atualiza uma filial existente.
   */
  static async update(
    id: number,
    filialData: Partial<Pick<Filial, 'filial' | 'quantidadeColaboradores'>>
  ): Promise<Filial> {
    try {
      const response = await api.put<StandardResponse<Filial>>(`/filial/${id}`, filialData)
      return response.data.data
    } catch (error) {
      console.error('Erro ao atualizar filial:', error)
      throw error
    }
  }

  /**
   * Adiciona uma nova filial a uma empresa existente.
   */
  static async addToCompany(
    companyId: number,
    filialData: Omit<Filial, 'id' | 'companyId' | 'linkUnico'>
  ): Promise<Filial> {
    try {
      const response = await api.post<StandardResponse<Filial>>(`/filial/company/${companyId}`, filialData)
      return response.data.data
    } catch (error) {
      console.error('Erro ao adicionar filial à empresa:', error)
      throw error
    }
  }
}