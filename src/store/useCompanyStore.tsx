import { create } from 'zustand'

interface CompanyStore {
  selectedCompanyId: string | null
  setSelectedCompanyId: (id: string | null) => void
}

const useCompanyStore = create<CompanyStore>((set) => ({
  selectedCompanyId: null,
  setSelectedCompanyId: (id) => set({ selectedCompanyId: id })
}))

export default useCompanyStore