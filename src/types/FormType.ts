export interface Filial {
  id: number
  filial: string
}

export type FormData = {
  nomeCompleto: string | null
  dataNascimento: string | null
  email: string | null
  cpf: string | null
  escolaridade: string | null
  estadoCivil: string | null
  filhos: number | null
  quantidadeLivros: number | null
  hobbie: string | null
  tempoCasaTrab: string | null
  modeloTrabalho: string | null
  partGrupos: string | null
  tempoEmpresa: number | null
  areaTrabalho: string | null
  filialId: number | null
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
  filialId?: number | null
  funcao?: string
  genero?: string
  cidade?: string | null
  estado?: string | null
  pais?: string
  educacaoMetanoia?: boolean
  respondeuForm?: boolean
}
