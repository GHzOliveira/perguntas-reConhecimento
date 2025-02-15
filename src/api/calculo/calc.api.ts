import api from '../api'

export class CalcService {
  /**
   * Faz o download do Excel individual para o usuário informado.
   * @param userId - ID do usuário.
   * @returns Blob do arquivo Excel.
   */
  static async downloadExcelIndividual(userId: number): Promise<Blob> {
    try {
      const response = await api.get(
        `calculo/calculate-and-generate-excel/${userId}`,
        { responseType: 'blob' }
      )
      return response.data
    } catch (error) {
      console.error(
        `Erro ao baixar Excel individual para o usuário ${userId}:`,
        error
      )
      throw error
    }
  }

  /**
   * Faz o download da tabela de resultados em formato Excel.
   * @returns Blob do arquivo Excel.
   */
  static async downloadTabelaResultados(): Promise<Blob> {
    try {
      const response = await api.get(`calculo/generate-excel`, {
        responseType: 'blob'
      })
      return response.data
    } catch (error) {
      console.error('Erro ao baixar tabela de resultados:', error)
      throw error
    }
  }
}
