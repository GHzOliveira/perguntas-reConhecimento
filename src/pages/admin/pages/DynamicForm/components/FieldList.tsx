import {
  Box, Heading, Table, Thead, Tbody, Tr, Th, Td,
  IconButton, Badge, Text,
  ButtonGroup,
  Button,
  Flex
} from '@chakra-ui/react';
import { ArrowDownIcon, ArrowUpIcon, DeleteIcon } from '@chakra-ui/icons';
import { FormField } from '../../../interface/form-builder.interface';

interface FieldListProps {
  formFields: FormField[];
  removeField: (index: number) => void;
  moveFieldUp: (index: number) => void;
  moveFieldDown: (index: number) => void;
  clearAllFields: () => void;
  isLoading?: boolean;
}

const FieldList: React.FC<FieldListProps> = ({
  formFields,
  removeField,
  moveFieldUp,
  moveFieldDown,
  clearAllFields,
  isLoading = false
}) => {
  if (isLoading) {
    return (
      <Box mb={5} p={4} borderWidth="1px" borderRadius="md">
        <Text color="gray.500" textAlign="center">
          Carregando campos do formulário...
        </Text>
      </Box>
    );
  }

  if (formFields.length === 0) {
    return (
      <Box mb={5} p={4} borderWidth="1px" borderRadius="md">
        <Text color="gray.500" textAlign="center">
          Ainda não há campos adicionados. Use o formulário acima para criar campos.
        </Text>
      </Box>
    );
  }

  return (
    <Box mb={5} p={4} borderWidth="1px" borderRadius="md">
      <Flex justify="space-between" align="center" mb={4}>
        <Heading size="md">Campos do Formulário</Heading>
        <Button 
          size="sm" 
          colorScheme="red" 
          variant="outline" 
          leftIcon={<DeleteIcon />}
          onClick={clearAllFields}
        >
          Limpar todos os campos
        </Button>
      </Flex>
      
      <Table variant="simple" size="sm">
        <Thead>
          <Tr>
            <Th>Nome</Th>
            <Th>Título</Th>
            <Th>Tipo</Th>
            <Th>Widget</Th>
            <Th>Obrigatório</Th>
            <Th>Ordenar</Th>
            <Th>Ações</Th>
          </Tr>
        </Thead>
        <Tbody>
          {formFields.map((field, index) => (
            <Tr key={index}>
              <Td>{field.name}</Td>
              <Td>{field.title}</Td>
              <Td>
                <Badge colorScheme={getTypeColor(field.type)}>
                  {getDisplayType(field.type)}
                </Badge>
              </Td>
              <Td>{field.widget || '-'}</Td>
              <Td>{field.required ? 'Sim' : 'Não'}</Td>
              <Td>
                <ButtonGroup size="xs" isAttached variant="outline">
                  <IconButton
                    aria-label="Mover para cima"
                    icon={<ArrowUpIcon />}
                    isDisabled={index === 0}
                    onClick={() => moveFieldUp(index)}
                  />
                  <IconButton
                    aria-label="Mover para baixo"
                    icon={<ArrowDownIcon />}
                    isDisabled={index === formFields.length - 1}
                    onClick={() => moveFieldDown(index)}
                  />
                </ButtonGroup>
              </Td>
              <Td>
                <IconButton
                  aria-label="Remover campo"
                  icon={<DeleteIcon />}
                  size="sm"
                  colorScheme="red"
                  onClick={() => removeField(index)}
                />
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Box>
  );
};

function getDisplayType(type: string): string {
  const types: Record<string, string> = {
    'string': 'Texto',
    'number': 'Número',
    'boolean': 'Booleano',
    'array': 'Lista',
    'object': 'Objeto',
  };
  return types[type] || type;
}
  
function getTypeColor(type: string): string {
  const colors: Record<string, string> = {
    'string': 'blue',
    'number': 'green',
    'boolean': 'purple',
    'array': 'orange',
    'object': 'cyan',
  };
  return colors[type] || 'gray';
}

export default FieldList;