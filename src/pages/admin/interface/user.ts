export interface User {
  id: number
  nome: string
  email: string
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
