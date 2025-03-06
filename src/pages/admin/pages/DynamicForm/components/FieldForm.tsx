import {
  Box, Button, Checkbox, Flex, FormControl, FormLabel,
  Heading, Input, Select, Textarea
} from '@chakra-ui/react';
import { FormField } from '../../../interface/form-builder.interface';

interface FieldFormProps {
  currentField: FormField;
  setCurrentField: (field: FormField) => void;
  enumValues: string;
  setEnumValues: (value: string) => void;
  enumNames: string;
  setEnumNames: (value: string) => void;
  addField: () => void;
}

const FieldForm: React.FC<FieldFormProps> = ({
  currentField,
  setCurrentField,
  enumValues,
  setEnumValues,
  enumNames,
  setEnumNames,
  addField,
}) => {
  const updateField = (key: keyof FormField, value: any) => {
    setCurrentField({ ...currentField, [key]: value });
  };

  // Verifica se o tipo/widget atual precisa de opções de enumeração
  const needsEnumValues =
    (currentField.type === 'string' && ['select', 'radio', 'checkboxes'].includes(currentField.widget || '')) ||
    currentField.type === 'array';

  return (
    <Box mb={5} p={4} borderWidth="1px" borderRadius="md" bg="gray.50">
      <Heading size="md" mb={4}>Adicionar Campo</Heading>

      <Flex direction={{ base: 'column', md: 'row' }} gap={4} mb={4}>
        <FormControl mb={4}>
          <FormLabel>Seção do Formulário</FormLabel>
          <Select
            value={currentField.section || ''}
            onChange={(e) => updateField('section', e.target.value || undefined)}
          >
            <option value="">Sem seção</option>
            <option value="dados_pessoais">Dados Pessoais</option>
            <option value="endereco">Endereço</option>
            <option value="empresa">Empresa</option>
            <option value="outros">Outros</option>
          </Select>
        </FormControl>

        <FormControl isRequired>
          <FormLabel>Nome do Campo (sem espaços)</FormLabel>
          <Input
            value={currentField.name}
            onChange={(e) => updateField('name', e.target.value)}
            placeholder="nome_do_campo"
          />
        </FormControl>

        <FormControl isRequired>
          <FormLabel>Título do Campo</FormLabel>
          <Input
            value={currentField.title}
            onChange={(e) => updateField('title', e.target.value)}
            placeholder="Título visível para o usuário"
          />
        </FormControl>
      </Flex>

      <Flex direction={{ base: 'column', md: 'row' }} gap={4} mb={4}>
        <FormControl>
          <FormLabel>Tipo de Dado</FormLabel>
          <Select
            value={currentField.type}
            onChange={(e) => {
              const newType = e.target.value;
              // Resetar widget se mudar de tipo
              const newField: FormField = {
                ...currentField,
                type: newType,
                widget: undefined
              };
              setCurrentField(newField);
            }}
          >
            <option value="string">Texto</option>
            <option value="number">Número</option>
            <option value="boolean">Booleano</option>
            <option value="array">Lista</option>
            <option value="object">Objeto</option>
          </Select>
        </FormControl>

        {currentField.type === 'string' && (
          <FormControl>
            <FormLabel>Widget</FormLabel>
            <Select
              value={currentField.widget || ''}
              onChange={(e) => updateField('widget', e.target.value || undefined)}
            >
              <option value="">Padrão</option>
              <option value="textarea">Área de texto</option>
              <option value="password">Senha</option>
              <option value="select">Seleção</option>
              <option value="radio">Rádio</option>
              <option value="checkboxes">Checkboxes</option>
            </Select>
          </FormControl>
        )}
      </Flex>

      <FormControl mb={4}>
        <FormLabel>Descrição do Campo</FormLabel>
        <Textarea
          value={currentField.description || ''}
          onChange={(e) => updateField('description', e.target.value || undefined)}
          placeholder="Descrição de ajuda para o usuário"
        />
      </FormControl>

      <FormControl mb={4}>
        <Checkbox
          isChecked={currentField.required || false}
          onChange={(e) => updateField('required', e.target.checked || undefined)}
        >
          Campo Obrigatório
        </Checkbox>
      </FormControl>

      {needsEnumValues && (
        <>
          <FormControl mb={4} isRequired>
            <FormLabel>Valores (separados por vírgula)</FormLabel>
            <Input
              value={enumValues}
              onChange={(e) => setEnumValues(e.target.value)}
              placeholder="valor1, valor2, valor3"
            />
          </FormControl>

          <FormControl mb={4}>
            <FormLabel>Rótulos (separados por vírgula)</FormLabel>
            <Input
              value={enumNames}
              onChange={(e) => setEnumNames(e.target.value)}
              placeholder="Opção 1, Opção 2, Opção 3"
            />
          </FormControl>
        </>
      )}

      <Button colorScheme="blue" onClick={addField}>
        Adicionar Campo
      </Button>
    </Box>
  );
};

export default FieldForm;