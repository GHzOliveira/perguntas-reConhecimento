export interface Filial {
  id: number
  filial: string
}

export type FormData = {
  nomeCompleto: string | null
  dataNascimento: string | null
  email: string | null
  cpf: string | null
  tempoEmpresa: number | null
  areaTrabalho: string | null
  filialTrabalho: number | null
  funcao: string | null
  genero: string | null
  cidade: string | null
  estado: string | null
  pais: string | null
  educacaoMetanoia: boolean | null
}

export interface UserResponse {
  id: number
  nomeCompleto?: string
  dataNascimento?: string | null
  email?: string
  cpf?: string
  tempoEmpresa?: string
  areaTrabalho?: string
  filialId?: number | null
  funcao?: string
  genero?: string
  cidade?: string | null
  estado?: string | null
  pais?: string
  educacaoMetanoia?: boolean
  respondeuForm?: boolean
}
