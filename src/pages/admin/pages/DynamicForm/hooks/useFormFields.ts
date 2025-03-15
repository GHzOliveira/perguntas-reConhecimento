import { useCallback, useEffect, useState } from 'react';
import { FormField, FormTemplate } from '../../../interface/form-builder.interface';
import { FormSchemaService } from '../services/FormSchemaService';
import { FormValidator } from '../services/FormValidator';
import { useToast } from '@chakra-ui/react';
import { FormBuilderService } from '../../../../../api/formBuilder/formBuilder.api';

export const useFormFields = (companyId?: number) => {
  const [formFields, setFormFields] = useState<FormField[]>([]);
  const [currentField, setCurrentField] = useState<FormField>({
    name: '',
    type: 'string',
    title: ''
  });
  const [enumValues, setEnumValues] = useState<string>('');
  const [enumNames, setEnumNames] = useState<string>('');
  const [currentSchema, setCurrentSchema] = useState<any>({});
  const [uiSchema, setUiSchema] = useState<any>({});
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [loadedForm, setLoadedForm] = useState<FormTemplate | null>(null);
  const [isDirty, setIsDirty] = useState<boolean>(false);
  const toast = useToast();

  useEffect(() => {
    const loadCompanyForm = async () => {
      const storedCompanyId = localStorage.getItem('globalCompanyFilter');
      
      const targetCompanyId = companyId || (storedCompanyId ? parseInt(storedCompanyId) : undefined);
      
      if (!targetCompanyId) return;
      
      try {
        setIsLoading(true);
        
        const response = await FormBuilderService.getFormsByCompanyId(targetCompanyId);
        
        if (response.success && response.data.length > 0) {
          const defaultForm = response.data.find((form: any) => form.isDefault);
          const formToLoad = defaultForm || response.data[0];
          
          loadFieldsFromSchema(formToLoad.formData.schema, formToLoad.formData.uiSchema || {});
          setLoadedForm(formToLoad);
          setIsDirty(false);
          
          toast({
            title: 'Formulário carregado',
            description: `Formulário "${formToLoad.name}" carregado automaticamente`,
            status: 'info',
            duration: 3000,
            isClosable: true,
          });
        }
      } catch (error) {
        console.error('Erro ao carregar formulário da empresa:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    loadCompanyForm();
  }, [companyId, toast]);
  
  const updateJsonSchema = useCallback((fields: FormField[]) => {
    const { schema, uiSchema: newUiSchema } = FormSchemaService.generateSchema(fields);
    setCurrentSchema(schema);
    setUiSchema(newUiSchema);
    setIsDirty(true);
  }, [ setCurrentSchema, setUiSchema, setIsDirty ]);

  const addField = useCallback(() => {
    const validation = FormValidator.validateField(currentField, formFields);
    
    if (!validation.valid) {
      toast({
        title: 'Validação de campo',
        description: validation.message,
        status: 'warning',
        duration: 3000,
      });
      return;
    }
    const newField = { ...currentField };
    
    if ((currentField.type === 'string' && ['select', 'radio', 'checkboxes'].includes(currentField.widget || '')) || 
    currentField.type === 'array') {
      
      if (enumValues) {
        newField.enum = enumValues.split(',').map(v => v.trim());
        
        if (enumNames) {
          newField.enumNames = enumNames.split(',').map(v => v.trim());
        }
      }
    }

    const updatedFields = [...formFields, newField];
    setFormFields(updatedFields);
    resetCurrentField();
    updateJsonSchema(updatedFields);
    setIsDirty(true);
    
    toast({
      title: 'Campo adicionado',
      status: 'success',
      duration: 2000,
    });
  }, [setIsDirty, formFields, currentField, enumValues, enumNames, setFormFields, updateJsonSchema, toast]);

  const resetCurrentField = () => {
    setCurrentField({
      name: '',
      type: 'string',
      title: ''
    });
    setEnumValues('');
    setEnumNames('');
  };
  
  const removeField = useCallback((index: number) => {
    const updatedFields = formFields.filter((_, i) => i !== index);
    setFormFields(updatedFields);
    updateJsonSchema(updatedFields);
    setIsDirty(true);
  }, [formFields, setFormFields, updateJsonSchema]);

  const moveFieldUp = useCallback((index: number) => {
    if (index === 0) return;
    
    const updatedFields = [...formFields];
    const temp = updatedFields[index];
    updatedFields[index] = updatedFields[index - 1];
    updatedFields[index - 1] = temp;
    
    setFormFields(updatedFields);
    updateJsonSchema(updatedFields);
    setIsDirty(true);
  }, [formFields, setFormFields, updateJsonSchema]);

  const moveFieldDown = useCallback((index: number) => {
    if (index === formFields.length - 1) return;
    
    const updatedFields = [...formFields];
    const temp = updatedFields[index];
    updatedFields[index] = updatedFields[index + 1];
    updatedFields[index + 1] = temp;
    
    setFormFields(updatedFields);
    updateJsonSchema(updatedFields);
    setIsDirty(true);
  }, [formFields, setFormFields, updateJsonSchema]);

  const clearAllFields = useCallback(() => {
    setFormFields([]);
    updateJsonSchema([]);
    setIsDirty(true); 
    toast({
      title: 'Campos removidos',
      description: 'Todos os campos foram removidos do formulário',
      status: 'info',
      duration: 3000,
    });
  }, [ setFormFields, updateJsonSchema, setIsDirty, toast ]);
  
  
  const loadFieldsFromSchema = (schema: any, uiSchema: any) => {
    const extractedFields = FormSchemaService.extractFieldsFromSchema(schema, uiSchema);
    setFormFields(extractedFields);
    setCurrentSchema(schema);
    setUiSchema(uiSchema);
    setIsDirty(false);
  };

  return {
    formFields,
    setFormFields,
    currentField, 
    setCurrentField,
    enumValues,
    setEnumValues,
    enumNames,
    setEnumNames,
    currentSchema,
    setCurrentSchema,
    uiSchema,
    setUiSchema,
    isLoading,
    addField,
    removeField,
    moveFieldUp,
    moveFieldDown,
    clearAllFields,
    resetCurrentField,
    updateJsonSchema,
    loadFieldsFromSchema,
    loadedForm,
    isDirty,
    setIsDirty,
  };
};