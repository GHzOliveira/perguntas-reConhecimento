import { useState, useEffect } from 'react'
import { Box, Divider, Flex, Text, Button, useToast, useBreakpointValue } from '@chakra-ui/react'
import AdminLayout from '../layout/layout'
import { ReactFormBuilder, ReactFormGenerator } from 'react-form-builder2'
import 'react-form-builder2/dist/app.css'

// Importar um serviço que será criado para gerenciar os formulários
import { FormBuilderService } from '../../../api/formBuilder/formBuilder.api'

export default function DynamicForm() {
  const paddingX = useBreakpointValue({ base: '1rem', md: '20rem' })
  const marginTop = useBreakpointValue({ base: '2rem', md: '5rem' })
  const toast = useToast()
  
  const [formData, setFormData] = useState([])
  const [previewVisible, setPreviewVisible] = useState(false)
  
  useEffect(() => {
    // Carregar formulários salvos quando o componente montar
    const loadFormData = async () => {
      try {
        const savedForm = await FormBuilderService.getLatestForm();
        if (savedForm) {
          setFormData(savedForm.formData);
        }
      } catch (error) {
        console.error('Erro ao carregar formulário:', error);
      }
    };
    
    loadFormData();
  }, []);
  
  const handleFormChange = (data) => {
    setFormData(data);
  };
  
  const handleSaveForm = async () => {
    try {
      // await FormBuilderService.saveForm({ formData });
      toast({
        title: 'Formulário salvo',
        description: 'O formulário foi salvo com sucesso',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: 'Erro ao salvar',
        description: 'Não foi possível salvar o formulário',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };
  
  return (
    <AdminLayout>
      <Flex direction="column" align="center" mt={marginTop} px={paddingX}>
        <Text fontSize={{ base: 'lg', md: 'xl' }} mb={4}>
          Configuração do Formulário Dinâmico
        </Text>
        <Divider mb={4} />
        
        <Flex justify="space-between" width="100%" mb={4}>
          <Button 
            colorScheme="blue" 
            onClick={handleSaveForm}
          >
            Salvar Formulário
          </Button>
          <Button 
            colorScheme="teal" 
            onClick={() => setPreviewVisible(!previewVisible)}
          >
            {previewVisible ? 'Voltar para Editor' : 'Visualizar Formulário'}
          </Button>
        </Flex>
        
        <Box w="100%" bg="white" p={4} borderRadius="md" boxShadow="md">
          {!previewVisible ? (
            <ReactFormBuilder 
              data={formData}
              onChange={handleFormChange}
            />
          ) : (
            <Box p={4}>
              <Text fontWeight="bold" mb={4}>Pré-visualização do Formulário</Text>
              <ReactFormGenerator 
                data={formData}
                answer_data={{}}
              />
            </Box>
          )}
        </Box>
      </Flex>
    </AdminLayout>
  )
}