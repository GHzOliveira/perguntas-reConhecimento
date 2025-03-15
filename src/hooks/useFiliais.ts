import { useEffect, useState } from 'react'
import { Filial } from '../types/FormType'
import { FilialService } from '../api/filiais/filiais.api'

export const useFiliais = (companyId?: number) => {
  const [filiais, setFiliais] = useState<Filial[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const loadFiliais = async () => {
      setIsLoading(true)
      try {
        let fetchedFiliais: Filial[]
        
        if (companyId) {
          fetchedFiliais = await FilialService.getByCompanyId(companyId)
        } else {
          fetchedFiliais = await FilialService.getAll()
        }
        
        setFiliais(fetchedFiliais)
      } catch (error) {
        console.error('Erro ao carregar filiais:', error)
        setFiliais([])
      } finally {
        setIsLoading(false)
      }
    }

    loadFiliais()
  }, [companyId])

  return { filiais, isLoading }
}