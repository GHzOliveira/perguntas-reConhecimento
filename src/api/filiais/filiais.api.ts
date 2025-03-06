import { Filial } from '../../types/FormType'
import api from '../api'

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
      const response = await api.post('/filial', filialData)
      return response.data
    } catch (error) {
      console.log(error)
      throw error
    }
  }

  static async createMany(data: {
    filiais: Omit<Filial, 'id' | 'companyId' | 'linkUnico'>[]
  }): Promise<CreateManyResponse> {
    try {
      const response = await api.post<CreateManyResponse>('/filial/batch', {
        filiais: data.filiais
      })
      return response.data
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
    const response = await api.get(`/filial/company/${companyId}`)
    return response.data
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
      const response = await api.get('/filial')
      return response.data
    } catch (error) {
      console.log(error)
      throw error
    }
  }

  /**
   * Exclui uma filial pelo seu ID.
   */
  static async delete(id: number): Promise<void> {
    try {
      await api.delete(`/filial/${id}`)
    } catch (error) {
      console.log(error)
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
        const response = await api.put(`/filial/${id}`, filialData)
        return response.data
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
        const response = await api.post(`/filial/company/${companyId}`, filialData)
        return response.data
      } catch (error) {
        console.error('Erro ao adicionar filial à empresa:', error)
        throw error
      }
    }
}
