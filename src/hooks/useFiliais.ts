import { useEffect, useState } from 'react'
import { Filial } from '../types/FormType'
import { FilialService } from '../api/filiais/filiais.api'

export const useFiliais = () => {
  const [filiais, setFiliais] = useState<Filial[]>([])

  useEffect(() => {
    const loadFiliais = async () => {
      const fetchedFiliais = await FilialService.getAll()
      setFiliais(fetchedFiliais)
    }

    loadFiliais()
  }, [])

  return filiais
}
