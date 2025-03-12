import api from '../api'

export class CalcService {
  /**
   * Faz o download do Excel individual para o usuário informado.
   * @param userId - ID do usuário.
   * @returns Blob do arquivo Excel.
   */
  static async downloadExcelIndividual(userId: number): Promise<Blob> {
    try {
      console.log(`Iniciando download do Excel para usuário ${userId}`)
      const response = await api.get(
        `calculo/calculate-and-generate-excel/${userId}`,
        { responseType: 'blob' }
      )
      console.log(`Download concluído: tamanho ${response.data.size} bytes`)
      return response.data
    } catch (error: any) {
      console.error(
        `Erro ao baixar Excel individual para o usuário ${userId}:`,
        error.response?.status || error.message
      )
      throw error
    }
  }

  /**
   * Faz o download da tabela de resultados em formato Excel.
   * @returns Blob do arquivo Excel.
   */
  static async downloadTabelaResultados(companyId: number): Promise<Blob> {
    try {
      console.log(`Iniciando download da tabela de resultados`)
      const response = await api.get(`calculo/generate-excel/${companyId}`, {
        responseType: 'blob'
      })
      console.log(`Download concluído: tamanho ${response.data.size} bytes`)
      return response.data
    } catch (error: any) {
      console.error(
        'Erro ao baixar tabela de resultados:',
        error.response?.status || error.message
      )
      throw error
    }
  }
}
