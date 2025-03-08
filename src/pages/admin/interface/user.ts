export interface User {
  id: number
  nomeCompleto: string
  email: string
  dataNascimento?: Date
  cpf?: string
  escolaridade?: string
  estadoCivil?: string
  filhos?: number
  quantidadeLivros?: number
  hobbie?: string
  tempoCasaTrab?: string
  modeloTrabalho?: string
  partGrupos?: string
  tempoEmpresa?: string
  areaTrabalho?: string
  filialId: number
  companyId: number
  funcao?: string
  genero?: string
  cidade?: string
  estado?: string
  pais?: string
  educacaoMetanoia?: boolean
  respondeuForm?: boolean
  createdAt?: Date
  updatedAt?: Date
}

export interface UserResponse {
  id: number
  question: string
  score: string
}
