import create from 'zustand';

interface RespostaState {
  respostas: { [key: number]: number };
  setResposta: (perguntaId: number, pontuacao: number) => void;
  resetRespostas: () => void;
}

export const useRespostaStore = create<RespostaState>((set) => ({
  respostas: {},
  setResposta: (perguntaId, pontuacao) =>
    set((state) => ({
      respostas: {
        ...state.respostas,
        [perguntaId]: pontuacao,
      },
    })),
    resetRespostas: () => set(() => ({ respostas: {} })),
}));
