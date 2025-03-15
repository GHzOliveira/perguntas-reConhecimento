import { useState, useEffect, useCallback } from 'react';
import { FormTemplate } from '../../../interface/form-builder.interface';
import { FormBuilderService } from '../../../../../api/formBuilder/formBuilder.api';
import { useToast } from '@chakra-ui/react';

export const useFormTemplates = (companyId: number) => {
  const [savedForms, setSavedForms] = useState<FormTemplate[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [selectedForm, setSelectedForm] = useState<FormTemplate | null>(null);
  const toast = useToast();

  const loadSavedForms = useCallback(async () => {
    try {
      setLoading(true);
      const forms = await FormBuilderService.getAllForms(companyId);
      setSavedForms(forms);
    } catch (error) {
      console.error('Erro ao carregar formulários:', error);
      toast({
        title: 'Erro ao carregar formulários',
        status: 'error',
        duration: 5000,
      });
    } finally {
      setLoading(false);
    }
  }, [companyId, toast]);

  const setAsDefault = async (id: number) => {
    try {
      setLoading(true);
      await FormBuilderService.setDefaultForm(id, companyId);
      await loadSavedForms();
      toast({
        title: 'Formulário definido como padrão',
        status: 'success',
        duration: 3000,
      });
    } catch (error) {
      console.error('Erro ao definir formulário padrão:', error);
      toast({
        title: 'Erro ao definir formulário padrão',
        status: 'error',
        duration: 5000,
      });
    } finally {
      setLoading(false);
    }
  };
  
  const deleteForm = async (id: number) => {
    try {
      setLoading(true);
      await FormBuilderService.deleteForm(id);
      await loadSavedForms();
      setSelectedForm(null);
      toast({
        title: 'Formulário excluído',
        status: 'success',
        duration: 3000,
      });
    } catch (error) {
      console.error('Erro ao excluir formulário:', error);
      toast({
        title: 'Erro ao excluir formulário',
        status: 'error',
        duration: 5000,
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadSavedForms();
  }, [loadSavedForms]);

  return {
    savedForms,
    loading,
    selectedForm,
    setSelectedForm,
    loadSavedForms,
    setAsDefault,
    deleteForm
  };
};