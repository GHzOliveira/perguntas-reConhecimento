import {
  Box, Heading, Table, Thead, Tbody, Tr, Th, Td, 
  IconButton, Badge, Tooltip, Text
} from '@chakra-ui/react';
import { EditIcon, StarIcon, DeleteIcon, ViewIcon } from '@chakra-ui/icons';
import { FormTemplate } from '../../../interface/form-builder.interface';

interface SavedFormsListProps {
  forms: FormTemplate[];
  loading: boolean;
  onEdit: (form: FormTemplate) => void;
  onSetDefault: (id: number) => void;
  onDelete: (form: FormTemplate) => void;
  onPreview: (form: FormTemplate) => void;
}

const SavedFormsList: React.FC<SavedFormsListProps> = ({
  forms,
  loading,
  onEdit,
  onSetDefault,
  onDelete,
  onPreview,
}) => {
  if (forms.length === 0) {
    return (
      <Box mb={5} p={4} borderWidth="1px" borderRadius="md">
        <Text color="gray.500" textAlign="center">
          {loading ? 'Carregando formulários...' : 'Nenhum formulário salvo.'}
        </Text>
      </Box>
    );
  }

  return (
    <Box mb={5} p={4} borderWidth="1px" borderRadius="md">
      <Heading size="md" mb={4}>Formulários Salvos</Heading>
      
      <Table variant="simple" size="sm">
        <Thead>
          <Tr>
            <Th>Nome</Th>
            <Th>Descrição</Th>
            <Th>Padrão</Th>
            <Th>Ações</Th>
          </Tr>
        </Thead>
        <Tbody>
          {forms.map((form) => (
            <Tr key={form.id}>
              <Td>{form.name}</Td>
              <Td>{form.description || '-'}</Td>
              <Td>
                {form.isDefault ? (
                  <Badge colorScheme="green">Sim</Badge>
                ) : (
                  <Badge colorScheme="gray">Não</Badge>
                )}
              </Td>
              <Td>
                <Tooltip label="Pré-visualizar">
                  <IconButton
                    aria-label="Pré-visualizar formulário"
                    icon={<ViewIcon />}
                    size="sm"
                    mr={2}
                    onClick={() => onPreview(form)}
                  />
                </Tooltip>
                
                <Tooltip label="Editar">
                  <IconButton
                    aria-label="Editar formulário"
                    icon={<EditIcon />}
                    size="sm"
                    mr={2}
                    onClick={() => onEdit(form)}
                  />
                </Tooltip>
                
                {!form.isDefault && (
                  <Tooltip label="Definir como padrão">
                    <IconButton
                      aria-label="Definir como padrão"
                      icon={<StarIcon />}
                      size="sm"
                      mr={2}
                      onClick={() => form.id && onSetDefault(form.id)}
                    />
                  </Tooltip>
                )}
                
                <Tooltip label="Excluir">
                  <IconButton
                    aria-label="Excluir formulário"
                    icon={<DeleteIcon />}
                    size="sm"
                    colorScheme="red"
                    onClick={() => onDelete(form)}
                  />
                </Tooltip>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Box>
  );
};

export default SavedFormsList;