import { Box, FormControl, FormLabel, Input, Textarea } from '@chakra-ui/react';

interface FormMetadataProps {
  formName: string;
  setFormName: (value: string) => void;
  formDescription: string;
  setFormDescription: (value: string) => void;
}

const FormMetadata: React.FC<FormMetadataProps> = ({
  formName,
  setFormName,
  formDescription,
  setFormDescription,
}) => {
  return (
    <Box mb={5} p={4} borderWidth="1px" borderRadius="md">
      <FormControl mb={3}>
        <FormLabel>Nome do Formulário</FormLabel>
        <Input 
          value={formName} 
          onChange={(e) => setFormName(e.target.value)} 
          placeholder="Digite o nome do formulário" 
        />
      </FormControl>
      
      <FormControl>
        <FormLabel>Descrição</FormLabel>
        <Textarea 
          value={formDescription} 
          onChange={(e) => setFormDescription(e.target.value)} 
          placeholder="Digite uma descrição para o formulário" 
        />
      </FormControl>
    </Box>
  );
};

export default FormMetadata;