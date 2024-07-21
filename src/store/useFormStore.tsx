import create from 'zustand'

interface FormVisibilityState {
  visibility: { [key: string]: boolean }
  setVisibility: (visibility: { [key: string]: boolean }) => void
}

export const useFormVisibilityStore = create<FormVisibilityState>(set => ({
  visibility: {
    nomeCompleto: true,
    dataNascimento: true,
    email: true,
    cpf: true,
    tempoEmpresa: true,
    areaTrabalho: true,
    filialTrabalho: true,
    funcao: true,
    genero: true,
    cidade: true,
    estado: true,
    pais: true,
    educacaoMetanoia: true
  },
  setVisibility: visibility => set({ visibility })
}))
