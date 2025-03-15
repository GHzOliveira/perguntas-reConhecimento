import { useState, useEffect, useCallback } from 'react'
import { useToast } from '@chakra-ui/react'
import {
  CompanyService,
  CompanyDisplay
} from '../../../api/company/company.api'
import { FilialService } from '../../../api/filiais/filiais.api'
import { Filial } from '../../../types/FormType'
export const useCompanySelect = () => {
  const [companies, setCompanies] = useState<CompanyDisplay[]>([])
  const [filiais, setFiliais] = useState<Filial[]>([])
  const [selectedCompany, setSelectedCompany] = useState<string>(() => {
    return localStorage.getItem('globalCompanyFilter') ?? ''
  })
  const [editingFilial, setEditingFilial] = useState<Filial | null>(null)
  const [newFilial, setNewFilial] = useState({
    filial: '',
    quantidadeColaboradores: 0
  })
  const toast = useToast()

  const loadCompanies = useCallback(async () => {
    try {
      const data = await CompanyService.getAllCompanies()
      setCompanies(data)
    } catch (error) {
      console.error('Erro ao carregar empresas:', error)
    }
  }, [setCompanies])

  const loadFiliais = useCallback(async () => {
    try {
      const data = await FilialService.getAll()
      setFiliais(data)
    } catch (error) {
      console.error('Erro ao carregar filiais:', error)
    }
  }, [setFiliais])

  useEffect(() => {
    loadCompanies()
    loadFiliais()
  }, [loadCompanies, loadFiliais])

  useEffect(() => {
    const savedCompany = localStorage.getItem('globalCompanyFilter')
    if (savedCompany) {
      setSelectedCompany(savedCompany)
    }
  }, [])

  const getFiliaisByCompany = useCallback(
    (companyId: string) => {
      const companyIdNumber = parseInt(companyId)
      return filiais.filter(filial => filial.companyId === companyIdNumber)
    },
    [filiais]
  )

  const handleDeleteFilial = async (id: number) => {
    if (!window.confirm('Tem certeza que deseja excluir esta filial?')) return
    try {
      await FilialService.delete(id)
      await loadFiliais()
      toast({ title: 'Filial excluída com sucesso', status: 'success' })
    } catch (error) {
      toast({ title: 'Erro ao excluir filial', status: 'error' })
    }
  }

  const handleDeleteCompany = async () => {
    if (!window.confirm('Tem certeza que deseja excluir esta empresa?')) return
    try {
      await CompanyService.deleteCompany(parseInt(selectedCompany))
      setSelectedCompany('')
      await loadCompanies()
      toast({ title: 'Empresa excluída com sucesso', status: 'success' })
    } catch (error) {
      toast({ title: 'Erro ao excluir empresa', status: 'error' })
    }
  }

  const handleEdit = async () => {
    if (!editingFilial) return
    try {
      await FilialService.update(editingFilial.id!, {
        filial: editingFilial.filial,
        quantidadeColaboradores: editingFilial.quantidadeColaboradores
      })
      await loadFiliais()
      toast({ title: 'Filial atualizada com sucesso', status: 'success' })
    } catch (error) {
      toast({ title: 'Erro ao atualizar filial', status: 'error' })
    }
  }

  const handleAddFilial = async () => {
    try {
      await FilialService.addToCompany(parseInt(selectedCompany), newFilial)
      await loadFiliais()
      setNewFilial({ filial: '', quantidadeColaboradores: 0 })
      toast({ title: 'Filial adicionada com sucesso', status: 'success' })
    } catch (error) {
      toast({ title: 'Erro ao adicionar filial', status: 'error' })
    }
  }

  const handleSaveGlobalFilter = useCallback(() => {
    if (selectedCompany) {
      localStorage.setItem('globalCompanyFilter', selectedCompany)
      toast({
        title: 'Empresa selecionada com sucesso',
        status: 'success',
        duration: 3000
      })
    } else {
      localStorage.removeItem('globalCompanyFilter')
      toast({
        title: 'Filtro global removido',
        status: 'info',
        duration: 3000
      })
    }
  }, [selectedCompany])

  return {
    companies,
    selectedCompany,
    setSelectedCompany,
    editingFilial,
    setEditingFilial,
    newFilial,
    setNewFilial,
    getFiliaisByCompany,
    handleDeleteFilial,
    handleDeleteCompany,
    handleEdit,
    handleAddFilial,
    handleSaveGlobalFilter
  }
}
