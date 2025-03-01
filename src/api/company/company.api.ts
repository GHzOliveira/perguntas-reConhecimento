import api from "../api"

export interface Company {
  id: number
  name: string
  createdAt: Date
  updatedAt: Date
}

export interface CompanyDisplay {
  id: number
  displayName: string
}


export class CompanyService {
  private static readonly BASE_URL = '/companies'

  static async validateCompany(id: number): Promise<boolean> {
    try {
      await api.get(`${this.BASE_URL}/${id}`)
      return true
    } catch (error) {
      return false
    }
  }

  static async createCompany(name: string): Promise<Company> {
    try {
      const response = await api.post(this.BASE_URL, { name })
      return response.data
    } catch (error) {
      throw new Error('Erro ao criar empresa')
    }
  }

  static async getAllCompanies(): Promise<CompanyDisplay[]> {
    try {
      const response = await api.get(this.BASE_URL)
      return response.data.map((company: Company) => ({
        id: company.id,
        displayName: company.name
      }))
    } catch (error) {
      throw new Error('Erro ao buscar empresas')
    }
  }

  static async getCompanyById(id: number): Promise<Company> {
    try {
      const response = await api.get(`${this.BASE_URL}/${id}`)
      return response.data
    } catch (error) {
      throw new Error('Erro ao buscar empresa')
    }
  }

  static async deleteCompany(id: number): Promise<Company> {
    try {
      const response = await api.delete(`${this.BASE_URL}/${id}`)
      return response.data
    } catch (error) {
      throw new Error('Erro ao deletar empresa')
    }
  }
}