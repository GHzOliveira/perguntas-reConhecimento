import api from '../api'

export interface Filial {
  id?: number
  filial: string
  quantidadeColaboradores: number
  companyId?: number
  linkUnico?: string
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
}
