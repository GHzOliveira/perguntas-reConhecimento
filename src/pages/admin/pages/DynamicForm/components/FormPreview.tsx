import { Box, Button, Heading, useDisclosure, Text, VStack, Divider, Center, SimpleGrid } from '@chakra-ui/react';
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalCloseButton } from '@chakra-ui/react';
import { useMemo, useState, useEffect } from 'react';
import Form from '@rjsf/core';
import validator from '@rjsf/validator-ajv8';
import { Country, State, City } from 'country-state-city';
import { useFiliais } from '../../../../../hooks/useFiliais';

interface FormPreviewProps {
  schema: any;
  uiSchema: any;
  formName: string;
}

export const IdentificacaoTemplate = {
  FieldTemplate: (props: any) => {
    const { label, required, children, errors, help } = props;
    return (
      <Box mb={4}>
        <Text fontWeight="medium" mb={1}>
          {label}
          {required && <span style={{ color: 'red' }}>*</span>}
        </Text>
        {children}
        {errors}
        {help}
      </Box>
    );
  },
  ObjectFieldTemplate: (props: any) => {
    const { properties, uiSchema } = props;
  
    const sections = useMemo(() => {
      const uiSections = uiSchema && uiSchema["ui:sections"];
      
      if (uiSections) {
        return uiSections.map((section: any) => ({
          title: section.title,
          fields: properties.filter((prop: any) => 
            section.fields.includes(prop.name)
          )
        }));
      }

      const fieldsBySection: Record<string, any[]> = {
        "Dados Pessoais": [],
        "Endereço": [],
        "Empresa": []
      };
      
      properties.forEach((prop: any) => {
        const name = prop.name;
        
        if (["pais", "estado", "cidade"].includes(name)) {
          fieldsBySection["Endereço"].push(prop);
        } else if (["filialId", "areaTrabalho", "funcao", "tempoEmpresa", "modeloTrabalho", "tempoCasaTrab", "partGrupos", "educacaoMetanoia"].includes(name)) {
          fieldsBySection["Empresa"].push(prop);
        } else {
          fieldsBySection["Dados Pessoais"].push(prop);
        }
      });
      
      return Object.entries(fieldsBySection)
        .filter(([_, fields]) => fields.length > 0)
        .map(([sectionTitle, fields]) => ({
          title: sectionTitle,
          fields: fields
        }));
    }, [properties, uiSchema]);

    return (
      <VStack spacing={8} align="stretch" w="full">
        {sections.map((section, idx) => (
          <Box key={idx} w="full">
            <Heading as="h3" size="md" mb="1rem">
              {section.title}
            </Heading>
            <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
              {section.fields.map((element: any) => element.content)}
            </SimpleGrid>
            {idx < sections.length - 1 && <Divider mt={4} />}
          </Box>
        ))}
      </VStack>
    );
  },
  widgets: {
    SelectWidget: (props: any) => {
      const { id, options, value, onChange, disabled } = props;
      const { enumOptions } = options;
      const isCountryField = id.includes("pais");
      const isStateField = id.includes("estado");
      const isCityField = id.includes("cidade");
      
      const [countries, setCountries] = useState<any[]>([]);
      const [states, setStates] = useState<any[]>([]);
      const [cities, setCities] = useState<any[]>([]);
      const [selectedCountry, setSelectedCountry] = useState<string>("");
      const [selectedState, setSelectedState] = useState<string>("");
      
      useEffect(() => {
        if (isCountryField) {
          const allCountries = Country.getAllCountries();
          setCountries(allCountries);
        }
      }, [isCountryField]);
      
      useEffect(() => {
        if (isStateField && selectedCountry) {
          const countryStates = State.getStatesOfCountry(selectedCountry);
          setStates(countryStates);
        }
      }, [isStateField, selectedCountry]);
      
      useEffect(() => {
        if (isCityField && selectedCountry && selectedState) {
          const stateCities = City.getCitiesOfState(selectedCountry, selectedState);
          setCities(stateCities);
        }
      }, [isCityField, selectedCountry, selectedState]);
      
      let currentOptions = enumOptions;
      
      if (isCountryField) {
        currentOptions = countries.map((country) => ({
          value: country.isoCode,
          label: country.name
        }));
      } else if (isStateField) {
        currentOptions = states.map((state) => ({
          value: state.isoCode,
          label: state.name
        }));
      } else if (isCityField) {
        currentOptions = cities.map((city) => ({
          value: city.name,
          label: city.name
        }));
      }
      
      const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const newValue = e.target.value;
        onChange(newValue);
        
        if (isCountryField) {
          setSelectedCountry(newValue);
          setSelectedState("");
        } else if (isStateField) {
          setSelectedState(newValue);
        }
      };
      
      return (
        <select
          id={id}
          value={value || ""}
          onChange={handleChange}
          disabled={disabled || (isStateField && !selectedCountry) || (isCityField && !selectedState)}
          className="chakra-select"
          style={{
            width: "100%",
            padding: "8px 12px",
            borderRadius: "0.375rem",
            borderColor: "#E2E8F0",
            backgroundColor: "white"
          }}
        >
          <option value="">Selecione...</option>
          {currentOptions?.map((option: any) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      );
    }
  }
};

const FormPreview: React.FC<FormPreviewProps> = ({ schema, uiSchema, formName }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const hasFields = useMemo(() => {
    return schema && schema.properties && Object.keys(schema.properties).length > 0;
  }, [schema]);
  
  const storedCompanyId = localStorage.getItem('globalCompanyFilter');
  const { filiais } = useFiliais(storedCompanyId ? parseInt(storedCompanyId) : undefined);
  
  const enhancedSchema = useMemo(() => {
    if (!schema) return schema;
    
    const newSchema = {...schema};

    if (newSchema.properties && newSchema.properties.filialId) {
      newSchema.properties.filialId.enum = filiais.map(filial => filial.id);
      newSchema.properties.filialId.enumNames = filiais.map(filial => filial.filial);
    }
    
    return newSchema;
  }, [schema, filiais]);

  return (
    <>
      <Button 
        colorScheme="teal" 
        variant="outline"
        onClick={onOpen}
        isDisabled={!hasFields}
        mb={4}
        w="100%"
      >
        Pré-visualizar Formulário
      </Button>

      <Modal isOpen={isOpen} onClose={onClose} size="5xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{formName || 'Pré-visualização do Formulário'}</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            {hasFields ? (
              <Center>
                <Box w="full" maxW="2xl" mt={4} mb={4}>
                  <Heading as="h2" size="lg" mb="1rem" textAlign="center">
                    {formName || 'Formulário Dinâmico'}
                  </Heading>
                  <Box
                    p={8}
                    borderWidth={1}
                    borderRadius="lg"
                    boxShadow="lg"
                    bg="white"
                    w="full"
                  >
                    <Form
                      schema={enhancedSchema}
                      uiSchema={uiSchema}
                      validator={validator}
                      onSubmit={() => {}}
                      formData={{}}
                      templates={IdentificacaoTemplate}
                    >
                      <Button 
                        type="submit" 
                        bg={'#1F7CBF'} 
                        color={'white'} 
                        mt={'2rem'}
                        w={'full'}
                      >
                        Enviar Formulário
                      </Button>
                    </Form>
                  </Box>
                </Box>
              </Center>
            ) : (
              <Text color="gray.500">Nenhum campo adicionado ao formulário ainda.</Text>
            )}
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default FormPreview;