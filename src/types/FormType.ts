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
