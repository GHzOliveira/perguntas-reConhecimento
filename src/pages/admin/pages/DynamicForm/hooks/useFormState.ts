import { useState } from 'react';
import { FormTemplate } from '../../../interface/form-builder.interface';
import { FormBuilderService } from '../../../../../api/formBuilder/formBuilder.api';
import { useToast } from '@chakra-ui/react';

export const useFormState = () => {
  const [formName, setFormName] = useState<string>('');
  const [formDescription, setFormDescription] = useState<string>('');
  const toast = useToast();

  const resetForm = () => {
    setFormName('');
    setFormDescription('');
  };

  const saveForm = async (
    companyId: number, 
    currentSchema: any, 
    uiSchema: any, 
    selectedForm: FormTemplate | null, 
    onSuccess: () => void
  ) => {
    if (!formName) {
      toast({
        title: 'Nome do formulário obrigatório',
        status: 'warning',
        duration: 3000,
      });
      return;
    }
    
    if (!currentSchema.properties || Object.keys(currentSchema.properties).length === 0) {
      toast({
        title: 'Adicione pelo menos um campo',
        status: 'warning',
        duration: 3000,
      });
      return;
    }
    
    try {
      const formTemplate: FormTemplate = {
        name: formName,
        description: formDescription,
        formData: {
          schema: currentSchema,
          uiSchema: uiSchema,
          formOptions: {}
        }
      };
      
      if (selectedForm?.id) {
        // Atualizar formulário existente
        await FormBuilderService.updateForm(selectedForm.id, {
          ...formTemplate,
          companyId: companyId
        });
        
        toast({
          title: 'Formulário atualizado com sucesso',
          status: 'success',
          duration: 3000,
        });
      } else {
        // Criar novo formulário
        await FormBuilderService.saveForm({
          ...formTemplate,
          companyId: companyId
        });
        
        toast({
          title: 'Formulário salvo com sucesso',
          status: 'success',
          duration: 3000,
        });
      }
      
      onSuccess();
    } catch (error) {
      console.error('Erro ao salvar formulário:', error);
      toast({
        title: 'Erro ao salvar formulário',
        description: 'Verifique os dados e tente novamente',
        status: 'error',
        duration: 5000,
      });
    }
  };

  return {
    formName,
    setFormName,
    formDescription,
    setFormDescription,
    resetForm,
    saveForm
  };
};