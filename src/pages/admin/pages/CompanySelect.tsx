import { useMemo, useCallback, useEffect, useState } from 'react'
import {
  Box,
  Select,
  Text,
  Flex,
  useDisclosure,
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  FormControl,
  FormLabel,
  IconButton,
  Input,
  NumberInput,
  NumberInputField,
  Alert,
  AlertIcon,
  Divider,
  Heading,
  Center
} from '@chakra-ui/react'
import { AddIcon, EditIcon, DeleteIcon } from '@chakra-ui/icons'
import { FormBuilderService } from '../../../api/formBuilder/formBuilder.api'
import { AgGridReact } from 'ag-grid-react'
import { ColDef, GridReadyEvent } from 'ag-grid-community'
import 'ag-grid-community/styles/ag-grid.css'
import 'ag-grid-community/styles/ag-theme-alpine.css'
import { useCompanySelect } from '../hook/useCompanySelect'
import validator from '@rjsf/validator-ajv8'
import Form from '@rjsf/core'
import { useFiliais } from '../../../hooks/useFiliais'
import { IdentificacaoTemplate } from './DynamicForm/components/FormPreview'

const CompanySelect = () => {
  const {
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
  } = useCompanySelect()

  const [companyForm, setCompanyForm] = useState<any>(null)
  const [isLoadingForm, setIsLoadingForm] = useState<boolean>(false)
  const storedCompanyId = localStorage.getItem('globalCompanyFilter');
  const { filiais } = useFiliais(storedCompanyId ? parseInt(storedCompanyId) : undefined);

  const { isOpen, onOpen, onClose } = useDisclosure()

  const loadCompanyForm = useCallback(async (companyId: string) => {
    if (!companyId) return;
    
    try {
      setIsLoadingForm(true);
      
      const response = await FormBuilderService.getFormsByCompanyId(parseInt(companyId));

      if (response.success) {
        const defaultForm = response.data.find(form => form.isDefault);
        setCompanyForm(defaultForm || response.data[0]);
      } else {
        setCompanyForm(null);
      }
    } catch (error) {
      console.error('Erro ao carregar formulário da empresa:', error);
      setCompanyForm(null);
    } finally {
      setIsLoadingForm(false);
    }
  }, []);

  const enhancedSchema = useMemo(() => {
    if (!companyForm?.formData?.schema) return null;
    
    const newSchema = {...companyForm.formData.schema};
    
    if (newSchema.properties && newSchema.properties.filialId) {
      newSchema.properties.filialId.enum = filiais.map(filial => filial.id);
      newSchema.properties.filialId.enumNames = filiais.map(filial => filial.filial);
    }
    
    return newSchema;
  }, [companyForm, filiais]);

  useEffect(() => {
    if (selectedCompany) {
      getFiliaisByCompany(selectedCompany)
      loadCompanyForm(selectedCompany)
    } else {
      setCompanyForm(null)
    }
  }, [selectedCompany, getFiliaisByCompany, loadCompanyForm]);

  const columnDefs: ColDef[] = useMemo(() => [
    {
      headerName: 'Nome da Filial',
      field: 'filial',
      flex: 2,
      resizable: true
    },
    {
      headerName: 'Quantidade de Colaboradores',
      field: 'quantidadeColaboradores',
      flex: 1,
      resizable: true
    },
    {
      headerName: 'Ações',
      flex: 1,
      cellRenderer: (params: any) => (
        <div style={{ display: 'flex', gap: '8px' }}>
          <IconButton
            aria-label="Editar filial"
            icon={<EditIcon />}
            size="sm"
            onClick={() => {
              setEditingFilial(params.data)
              onOpen()
            }}
          />
          <IconButton
            aria-label="Excluir filial"
            icon={<DeleteIcon />}
            size="sm"
            colorScheme="red"
            onClick={() => handleDeleteFilial(params.data.id)}
          />
        </div>
      )
    }
  ], [onOpen, setEditingFilial, handleDeleteFilial])

  const onGridReady = useCallback((params: GridReadyEvent) => {
    params.api.sizeColumnsToFit()
  }, [])

  const handleSubmit = () => {
    if (editingFilial) {
      handleEdit()
    } else {
      handleAddFilial()
    }
    onClose()
  }

  return (
    <Box p={6}>
      <Text fontSize="2xl" mb={6}>Seleção de Empresa</Text>
      <Box mb={4} display="flex" alignItems="center">
        <Select
          placeholder="Selecione uma empresa"
          value={selectedCompany}
          onChange={(e) => setSelectedCompany(e.target.value)}
          flex="1"
          mr={4}
        >
          {companies.map(company => (
            <option key={company.id} value={company.id}>
              {company.displayName}
            </option>
          ))}
        </Select>
        <Button
          colorScheme="blue"
          mr={4}
          onClick={handleSaveGlobalFilter}
        >
          Salvar
        </Button>
        {selectedCompany && (
          <Button colorScheme="red" onClick={handleDeleteCompany}>
            Excluir Empresa
          </Button>
        )}
      </Box>

      {selectedCompany && (
        <>
          <Flex mb={4} justifyContent="space-between" alignItems="center">
            <Text fontSize="lg">Filiais desta empresa:</Text>
            <Button
              leftIcon={<AddIcon />}
              colorScheme="green"
              onClick={() => {
                setEditingFilial(null)
                onOpen()
              }}
            >
              Adicionar Filial
            </Button>
          </Flex>
          <Box className="ag-theme-alpine" style={{ height: '300px', width: '100%' }}>
            <AgGridReact
              rowData={getFiliaisByCompany(selectedCompany)}
              columnDefs={columnDefs}
              onGridReady={onGridReady}
              defaultColDef={{
                sortable: true,
                filter: true,
                resizable: true
              }}
              pagination
              paginationPageSize={5}
            />
          </Box>
        </>
      )}

{selectedCompany && (
        <Box mt={8}>
          <Divider my={6} />
          <Heading size="md" mb={4}>Formulário Dinâmico da Empresa</Heading>
          
          {isLoadingForm ? (
            <Text>Carregando formulário...</Text>
          ) : companyForm ? (
            <Center>
              <Box w="full" maxW="2xl" mt={4} mb={4}>
                <Heading as="h2" size="lg" mb="1rem" textAlign="center">
                  {companyForm.name}
                </Heading>
                <Box
                  p={8}
                  borderWidth={1}
                  borderRadius="lg"
                  boxShadow="lg"
                  bg="white"
                  w="full"
                >
                  {companyForm.description && (
                    <Text mb={4} color="gray.600">{companyForm.description}</Text>
                  )}
                  <Form
                    schema={enhancedSchema || companyForm.formData.schema}
                    uiSchema={companyForm.formData.uiSchema || {}}
                    validator={validator}
                    formData={{}}
                    onSubmit={() => {}}
                    disabled={true}
                    templates={IdentificacaoTemplate}
                  >
                    <Button 
                      type="submit" 
                      bg={'#1F7CBF'} 
                      color={'white'} 
                      mt={'2rem'}
                      w={'full'}
                      disabled={true}
                    >
                      Formulário apenas para visualização
                    </Button>
                  </Form>
                </Box>
              </Box>
            </Center>
          ) : (
            <Alert status="info" borderRadius="md">
              <AlertIcon />
              Não há nenhum formulário dinâmico associado a esta empresa. Utilize o módulo "Formulário Dinâmico" para criar um.
            </Alert>
          )}
        </Box>
      )}

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{editingFilial ? 'Editar Filial' : 'Adicionar Nova Filial'}</ModalHeader>
          <ModalBody>
            <FormControl>
              <FormLabel>Nome da Filial</FormLabel>
              <Input
                value={editingFilial ? editingFilial.filial : newFilial.filial}
                onChange={(e) =>
                  editingFilial
                    ? setEditingFilial({ ...editingFilial, filial: e.target.value })
                    : setNewFilial({ ...newFilial, filial: e.target.value })
                }
              />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>Quantidade de Colaboradores</FormLabel>
              <NumberInput
                value={
                  editingFilial ? editingFilial.quantidadeColaboradores : newFilial.quantidadeColaboradores
                }
                onChange={(value) =>
                  editingFilial
                    ? setEditingFilial({ ...editingFilial, quantidadeColaboradores: parseInt(value) })
                    : setNewFilial({ ...newFilial, quantidadeColaboradores: parseInt(value) })
                }
              >
                <NumberInputField />
              </NumberInput>
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button variant="ghost" mr={3} onClick={onClose}>
              Cancelar
            </Button>
            <Button colorScheme="blue" onClick={handleSubmit}>
              {editingFilial ? 'Salvar' : 'Adicionar'}
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  )
}

export default CompanySelect