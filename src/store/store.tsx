import create from 'zustand';

interface StoreState {
  role: string;
  text: string;
  setText: (text: string) => void;
  setRole: (role: string) => void;
}

interface FormVisibilityState {
  visibility: Record<string, boolean>;
  toggleVisibility: (field: string) => void;
  setVisibility: (field: string, value: boolean) => void;
}

export const useStore = create<StoreState>((set) => ({
  role: 'USER', // ou 'ADMIN'
  text: 'Para contribuir com sua experiência, preparamos a pesquisa Reconhecimento. Ela trará informações que vão ajudar a revelar aquilo que você ainda não conseguiu enxergar sobre sua liderança.',
  setText: (newText: string) => set({ text: newText }),
  setRole: (newRole: string) => set({ role: newRole }),
}));

export const useFormVisibilityStore = create<FormVisibilityState>((set) => ({
  visibility: {
    nomeCompleto: true, dataNascimento: true, email: true, cpf: true,
    tempoEmpresa: true, areaTrabalho: true, filialId: true,
    funcao: true, genero: true, cidade: true, estado: true, pais: true,
    educacaoMetanoia: true, escolaridade: true, estadoCivil: true, filhos: true, 
    quantidadeLivros: true, hobbie: true, tempoCasaTrab: true, modeloTrabalho: true, partGrupos: true,
  },
  toggleVisibility: (field) =>
    set((state) => ({
      visibility: {
        ...state.visibility,
        [field]: !state.visibility[field],
      },
    })),
  setVisibility: (field, value) =>
    set((state) => ({
      visibility: {
        ...state.visibility,
        [field]: value,
      },
    })),
}));