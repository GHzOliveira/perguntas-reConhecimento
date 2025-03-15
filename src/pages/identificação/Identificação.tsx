import { useState, useEffect } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Box,
  Button,
  Center,
  SimpleGrid,
  Text,
  Flex,
  Divider,
  Heading,
  useBreakpointValue,
  VStack,
  Spinner,
  Alert,
  AlertIcon,
  AlertTitle,
} from '@chakra-ui/react';
import { useFiliais } from '../../hooks/useFiliais';
import { useCountriesStatesCities } from '../../hooks/useCountriesStatesCities';
import { FormData } from '../../types/FormType';
import FormField from '../../components/FormField/formField';
import { UsersService } from '../../api/users/users.api';
import { FormBuilderService } from '../../api/formBuilder/formBuilder.api';

interface SchemaField {
  type: string;
  title: string;
  enum?: Array<string | number>;
  enumNames?: string[];
  format?: string;
}

interface SchemaProperties {
  [key: string]: SchemaField;
}

interface FormSchema {
  properties: SchemaProperties;
  required?: string[];
}

interface UiSection {
  title: string;
  fields: string[];
}

interface UiSchema {
  'ui:sections'?: UiSection[];
  [key: string]: any;
}

const Identificação = () => {
  const { companyId } = useParams<{ companyId: string }>();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [formSchema, setFormSchema] = useState<FormSchema | null>(null);
  const [formUiSchema, setFormUiSchema] = useState<UiSchema | null>(null);
  const [formTitle, setFormTitle] = useState<string>('Formulário de Identificação');

  const {
    countries,
    states,
    cities,
    selectedCountry,
    setSelectedCountry,
    selectedState,
    setSelectedState
  } = useCountriesStatesCities();
  
  const { filiais, isLoading: filiaisLoading } = useFiliais(companyId ? parseInt(companyId) : undefined);
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm<FormData>();

  useEffect(() => {
    const fetchForm = async () => {
      if (!companyId) {
        setError('ID da empresa não encontrado na URL');
        setIsLoading(false);
        return;
      }

      try {
        setIsLoading(true);
        const response = await FormBuilderService.getFormsByCompanyId(parseInt(companyId));
        
        if (!response.success || response.data.length === 0) {
          setError('Não foi encontrado um formulário para esta empresa');
          setIsLoading(false);
          return;
        }

        const defaultForm = response.data.find(form => form.isDefault);
        const selectedForm = defaultForm || response.data[0];
        
        setFormTitle(selectedForm.name);
        setFormSchema(selectedForm.formData.schema);
        setFormUiSchema(selectedForm.formData.uiSchema || {});
        setIsLoading(false);
      } catch (error) {
        console.error('Erro ao carregar formulário:', error);
        setError('Erro ao carregar o formulário');
        setIsLoading(false);
      }
    };

    fetchForm();
  }, [companyId]);

  const onSubmit: SubmitHandler<FormData> = async data => {
    try {
      const processedData: Record<string, any> = {...data};
    
      // Processar os campos existentes
      if (processedData.dataNascimento && processedData.dataNascimento.trim() !== '') {
        processedData.dataNascimento += 'T00:00:00.000Z';
      } else {
        processedData.dataNascimento = null;
      }
  
      ['filhos', 'quantidadeLivros', 'filialId'].forEach(field => {
        if (processedData[field] !== null && processedData[field] !== undefined) {
          processedData[field] = Number(processedData[field]);
        }
      });
  
      if (typeof processedData.educacaoMetanoia === 'string') {
        processedData.educacaoMetanoia = processedData.educacaoMetanoia === 'true';
      }

      if (companyId && !processedData.companyId) {
        processedData.companyId = Number(companyId);
      }
  
      if (!processedData.companyId) {
        throw new Error("ID da empresa não encontrado. Por favor, verifique a URL ou selecione uma empresa.");
      }
  
      const createdUser = await UsersService.create(processedData);
      sessionStorage.setItem('userSession', JSON.stringify(createdUser));
      navigate('/identificacao/questionario');
    } catch (error) {
      console.error('Erro ao criar usuário:', error);
    }
  };

  const paddingX = useBreakpointValue({ base: '1rem', md: '10rem' });
  const marginTop = useBreakpointValue({ base: '2rem', md: '5rem' });
  const maxW = useBreakpointValue({ base: '90%', md: '2xl' });

  const groupFieldsBySection = (schema: FormSchema, uiSchema: UiSchema | null) => {
    if (!schema || !schema.properties) return {};
    
    const defaultSections = {
      "Dados Pessoais": [],
      "Endereço": [],
      "Empresa": [],
      "Outros": []
    };

    if (!uiSchema || !uiSchema['ui:sections']) {
      Object.entries(schema.properties).forEach(([fieldName, fieldSchema]) => {
        const fieldInfo = {
          name: fieldName,
          ...fieldSchema
        };
        
        if (["pais", "estado", "cidade"].includes(fieldName)) {
          defaultSections["Endereço"].push(fieldInfo);
        } else if (["filialId", "areaTrabalho", "funcao", "tempoEmpresa", "modeloTrabalho", "tempoCasaTrab", "partGrupos", "educacaoMetanoia"].includes(fieldName)) {
          defaultSections["Empresa"].push(fieldInfo);
        } else {
          defaultSections["Dados Pessoais"].push(fieldInfo);
        }
      });
    } else {
      const sections: Record<string, any[]> = {};
      const fieldMap: Record<string, any> = {};
      
      Object.entries(schema.properties).forEach(([fieldName, fieldSchema]) => {
        fieldMap[fieldName] = {
          name: fieldName,
          ...fieldSchema
        };
      });
      
      uiSchema['ui:sections'].forEach(section => {
        sections[section.title] = [];
        section.fields.forEach(fieldName => {
          if (fieldMap[fieldName]) {
            sections[section.title].push(fieldMap[fieldName]);
            delete fieldMap[fieldName];
          }
        });
      });
      
      if (Object.keys(fieldMap).length > 0) {
        sections["Outros"] = sections["Outros"] || [];
        Object.values(fieldMap).forEach(field => {
          sections["Outros"].push(field);
        });
      }
      
      return sections;
    }
    
    return Object.fromEntries(
      Object.entries(defaultSections).filter(([_, fields]) => fields.length > 0)
    );
  };

  const renderFormField = (field: any) => {
    const fieldName = field.name;
    const fieldTitle = field.title;
    const fieldType = field.type;
    
    let fieldProps: any = {
      id: fieldName,
      label: fieldTitle,
      register: register
    };

    if (fieldName === 'filialId') {
      fieldProps.options = filiais.map(filial => ({
        value: filial.id,
        label: filial.filial
      }));
      
      fieldProps.isLoading = filiaisLoading;
      if (filiais.length === 0 && !filiaisLoading) {
        fieldProps.placeholder = "Nenhuma filial encontrada para esta empresa";
      }
    }

    if (field.format === 'date') {
      fieldProps.type = 'date';
    } else if (fieldType === 'number' || fieldType === 'integer') {
      fieldProps.type = 'number';
    } else if (fieldType === 'boolean') {
      fieldProps.type = 'checkbox';
    } else if (field.enum && field.enum.length) {
      fieldProps.options = field.enum.map((value: any, index: number) => ({
        value: value,
        label: field.enumNames?.[index] || value
      }));
    }
    
    if (fieldName === 'pais') {
      fieldProps.options = countries.map(country => ({
        value: country.isoCode,
        label: country.name
      }));
      fieldProps.onChange = (e: React.ChangeEvent<HTMLSelectElement>) => setSelectedCountry(e.target.value);
    } else if (fieldName === 'estado') {
      fieldProps.options = states.map(state => ({
        value: state.isoCode,
        label: state.name
      }));
      fieldProps.onChange = (e: React.ChangeEvent<HTMLSelectElement>) => setSelectedState(e.target.value);
      fieldProps.disabled = !selectedCountry;
    } else if (fieldName === 'cidade') {
      fieldProps.options = cities.map(city => ({
        value: city.name,
        label: city.name
      }));
      fieldProps.disabled = !selectedState;
    } else if (fieldName === 'filialId') {
      fieldProps.options = filiais.map(filial => ({
        value: filial.id,
        label: filial.filial
      }));
    }
    
    return <FormField key={fieldName} {...fieldProps} />;
  };

  if (isLoading) {
    return (
      <Center height="100vh">
        <Spinner size="xl" color="#1F7CBF" />
      </Center>
    );
  }

  if (error) {
    return (
      <Center height="100vh">
        <Alert status="error" borderRadius="md" maxW="md">
          <AlertIcon />
          <AlertTitle>{error}</AlertTitle>
        </Alert>
      </Center>
    );
  }

  const sections = formSchema ? groupFieldsBySection(formSchema, formUiSchema) : {};
  const sectionNames = Object.keys(sections);

  return (
    <Flex direction={'column'} mb={'2rem'}>
      <Text
        mb="5rem"
        paddingX={paddingX}
        mt={marginTop}
        fontSize={{ base: 'md', md: 'lg' }}
      >
        Receba nossas boas-vindas! Antes de preencher sua pesquisa, gostaríamos
        de um conhecer um pouco mais sobre você. Seus dados são confidenciais e
        serão utilizados para compreendermos o perfil da empresa. Seus
        resultados individuais não serão compartilhados. Por favor, preencha os
        campos abaixo e bom trabalho!
      </Text>
      <Divider />
      <Center>
        <Box w="full" maxW={maxW} mt={'5rem'}>
          <Heading as="h2" size="lg" mb="1rem" textAlign="center">
            {formTitle}
          </Heading>
          <Box
            p={8}
            borderWidth={1}
            borderRadius="lg"
            boxShadow="lg"
            bg="white"
            w="full"
          >
            <form onSubmit={handleSubmit(onSubmit)}>
              <VStack spacing={8}>
                {sectionNames.map(sectionName => (
                  <Box key={sectionName} w="full">
                    <Heading as="h3" size="md" mb="1rem">
                      {sectionName}
                    </Heading>
                    <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
                      {sections[sectionName].map(field => renderFormField(field))}
                    </SimpleGrid>
                    {sectionName !== sectionNames[sectionNames.length - 1] && <Divider mt={4} />}
                  </Box>
                ))}
              </VStack>
              <Button type="submit" bg={'#1F7CBF'} color={'white'} mt={'4rem'} w={'full'}>
                Iniciar Pesquisa
              </Button>
            </form>
          </Box>
        </Box>
      </Center>
    </Flex>
  );
};

export default Identificação;