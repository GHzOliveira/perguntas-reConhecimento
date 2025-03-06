import { Button, Flex, Tooltip } from '@chakra-ui/react';
import { FormTemplate } from '../../../interface/form-builder.interface';

interface FormActionsProps {
  isEditing: boolean;
  loading: boolean;
  selectedForm: FormTemplate | null;
  isDirty?: boolean;
  onSave: () => void;
  onReset: () => void;
  onDelete: () => void;
  onLoadTemplate?: () => void;
}

const FormActions: React.FC<FormActionsProps> = ({
  isEditing,
  loading,
  onSave,
  isDirty = false,
  onReset,
  onDelete,
  onLoadTemplate,
}) => {
  const showDirtyIndicator = isDirty && isEditing;
  const saveButtonText = isEditing 
    ? `Atualizar Formulário${showDirtyIndicator ? ' *' : ''}` 
    : 'Salvar Formulário';

   return (
    <Flex justifyContent="space-between" mb={5}>
      <Flex gap={3}>
        <Tooltip 
          label={showDirtyIndicator ? "Há alterações não salvas" : ""}
          isDisabled={!showDirtyIndicator}
        >
          <Button
            colorScheme={showDirtyIndicator ? "orange" : "teal"}
            onClick={onSave}
            isLoading={loading}
          >
            {saveButtonText}
          </Button>
        </Tooltip>
        <Button
          variant="outline"
          onClick={onReset}
          isDisabled={loading}
        >
          Limpar
        </Button>
        {onLoadTemplate && (
          <Button
            variant="outline"
            colorScheme="blue"
            onClick={onLoadTemplate}
            isDisabled={loading}
          >
            Carregar Modelo
          </Button>
        )}
      </Flex>
      
      {isEditing && (
        <Button
          colorScheme="red"
          onClick={onDelete}
          isLoading={loading}
        >
          Excluir Formulário
        </Button>
      )}
    </Flex>
  );
};

export default FormActions;