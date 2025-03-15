export interface User {
  id: number
  nome: string
  cidade: string
  funcaoMacro: string
  dataAdmissao: string
  genero: string
  filialId: number
  companyId: number
  funcao?: string
  respondeuForm?: boolean
  dynamicResponses?: Record<string, any>
  createdAt?: Date
  updatedAt?: Date
}

export interface UserResponse {
  id: number
  question: string
  score: string
}
