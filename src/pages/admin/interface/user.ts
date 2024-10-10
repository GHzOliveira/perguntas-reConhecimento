export interface User {
  id: number
  nomeCompleto: string
  funcao: string
  areaTrabalho: string
  dataNascimento: string
  email: string
  cpf: string
  tempoEmpresa: string
  fillialId: number
  genero: string
  cidade: string
  estado: string
  pais: string
  planilhaButton: string
  deleteButton: string
}

export interface UserResponse {
  id: number
  question: string
  score: string
}
