import { useForm, SubmitHandler } from 'react-hook-form'
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
  Stack
} from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom'
import { useFiliais } from '../../hooks/useFiliais'
import { useCountriesStatesCities } from '../../hooks/useCountriesStatesCities'
import { useFormVisibilityStore } from '../../store/store'
import { createUser } from '../../api/api'
import { FormData } from '../../types/FormType'
import FormField from '../../components/FormField/formFiel'

const Identificação = () => {
  const {
    countries,
    states,
    cities,
    selectedCountry,
    setSelectedCountry,
    selectedState,
    setSelectedState
  } = useCountriesStatesCities()
  const filiais = useFiliais()
  const navigate = useNavigate()
  const { register, handleSubmit } = useForm<FormData>()
  const { visibility } = useFormVisibilityStore()

  const onSubmit: SubmitHandler<FormData> = async data => {
    try {
      if (data.dataNascimento && data.dataNascimento.trim() !== '') {
        data.dataNascimento += 'T00:00:00.000Z'
      } else {
        data.dataNascimento = null
      }
  
      if (data.filhos !== null && data.filhos !== undefined) {
        data.filhos = Number(data.filhos)
      }
  
      if (data.quantidadeLivros !== null && data.quantidadeLivros !== undefined) {
        data.quantidadeLivros = Number(data.quantidadeLivros)
      }
  
      if (data.filialId !== null && data.filialId !== undefined) {
        data.filialId = Number(data.filialId)
      }
  
      if (typeof data.educacaoMetanoia === 'string') {
        data.educacaoMetanoia = data.educacaoMetanoia === 'true'
      }
  
      const createdUser = await createUser(data)
      sessionStorage.setItem('userSession', JSON.stringify(createdUser))
      navigate('/identificacao/questionario')
    } catch (error) {
      console.error('Erro ao criar usuário:', error)
    }
  }

  const paddingX = useBreakpointValue({ base: '1rem', md: '10rem' })
  const marginTop = useBreakpointValue({ base: '2rem', md: '5rem' })
  const maxW = useBreakpointValue({ base: '90%', md: '2xl' })

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
            Formulário de Identificação
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
                <Box w="full">
                  <Heading as="h3" size="md" mb="1rem">
                    Dados Pessoais
                  </Heading>
                  <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
                    {visibility.nomeCompleto && (
                      <FormField
                        id="nomeCompleto"
                        label="Nome completo"
                        register={register}
                      />
                    )}
                    {visibility.dataNascimento && (
                      <FormField
                        id="dataNascimento"
                        label="Data de nascimento"
                        type="date"
                        register={register}
                      />
                    )}
                    {visibility.email && (
                      <FormField
                        id="email"
                        label="Email"
                        type="email"
                        register={register}
                      />
                    )}
                    {visibility.cpf && (
                      <FormField id="cpf" label="CPF" register={register} />
                    )}
                    {visibility.genero && (
                      <FormField
                        id="genero"
                        label="Gênero"
                        register={register}
                        options={[
                          { value: '', label: '' },
                          { value: 'Masculino', label: 'Masculino' },
                          { value: 'Feminino', label: 'Feminino' },
                          { value: 'Prefiro não dizer', label: 'Prefiro não dizer' },
                        ]}
                      />
                    )}
                    {visibility.estadoCivil && (
                      <FormField
                        id="estadoCivil"
                        label="Estado Civil"
                        register={register}
                        options={[
                          { value: 'Solteiro(a)', label: 'Solteiro(a)' },
                          { value: 'Casado(a)', label: 'Casado(a)' },
                          { value: 'Divorciado(a)', label: 'Divorciado(a)' },
                          { value: 'Viúvo(a)', label: 'Viúvo(a)' }
                        ]}
                      />
                    )}
                    {visibility.filhos && (
                      <FormField
                        id="filhos"
                        label="Número de filhos"
                        type="number"
                        register={register}
                      />
                    )}
                    {visibility.quantidadeLivros && (
                      <FormField
                        id="quantidadeLivros"
                        label="Quantos livros lê por ano?"
                        type="number"
                        register={register}
                      />
                    )}
                    {visibility.hobbie && (
                      <FormField
                        id="hobbie"
                        label="Principal atividade nas horas vagas"
                        register={register}
                      />
                    )}
                  </SimpleGrid>
                </Box>
                <Divider />
                <Box w="full">
                  <Heading as="h3" size="md" mb="1rem">
                    Endereço
                  </Heading>
                  <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
                    {visibility.pais && (
                      <FormField
                        id="pais"
                        label="País"
                        register={register}
                        options={countries.map(country => ({
                          value: country.isoCode,
                          label: country.name
                        }))}
                        onChange={e => setSelectedCountry(e.target.value)}
                      />
                    )}
                    {visibility.estado && (
                      <FormField
                        id="estado"
                        label="Estado"
                        register={register}
                        options={states.map(state => ({
                          value: state.isoCode,
                          label: state.name
                        }))}
                        onChange={e => setSelectedState(e.target.value)}
                        disabled={!selectedCountry}
                      />
                    )}
                    {visibility.cidade && (
                      <FormField
                        id="cidade"
                        label="Cidade"
                        register={register}
                        options={cities.map(city => ({
                          value: city.name,
                          label: city.name
                        }))}
                        disabled={!selectedState}
                      />
                    )}
                  </SimpleGrid>
                </Box>
                <Divider />
                <Box w="full">
                  <Heading as="h3" size="md" mb="1rem">
                    Empresa
                  </Heading>
                  <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
                    {visibility.filialId && (
                      <FormField
                        id="filialId"
                        label="Qual filial trabalha"
                        register={register}
                        options={filiais.map(filial => ({
                          value: filial.id,
                          label: filial.filial
                        }))}
                      />
                    )}
                    {visibility.areaTrabalho && (
                      <FormField
                        id="areaTrabalho"
                        label="Qual área trabalha?"
                        register={register}
                      />
                    )}
                    {visibility.funcao && (
                      <FormField
                        id="funcao"
                        label="Qual a sua função?"
                        register={register}
                      />
                    )}
                    {visibility.tempoEmpresa && (
                      <FormField
                        id="tempoEmpresa"
                        label="Tempo de empresa"
                        register={register}
                        options={[
                          { value: '', label: '' },
                          { value: 'Menos de 1 ano', label: 'Menos de 1 ano' },
                          { value: '1 a 3 anos', label: '1 a 3 anos' },
                          { value: '5 a 10 anos', label: '5 a 10 anos' },
                          { value: 'Mais de 10 anos', label: 'Mais de 10 anos' },
                        ]}
                      />
                    )}
                    {visibility.modeloTrabalho && (
                      <FormField
                        id="modeloTrabalho"
                        label="Modelo de trabalho?"
                        register={register}
                        options={[
                          { value: '', label: '' },
                          { value: 'Presencial', label: 'Presencial' },
                          { value: 'Híbrido', label: 'Híbrido' },
                          { value: 'Remoto', label: 'Remoto' },
                        ]}
                      />
                    )}
                    {visibility.tempoCasaTrab && (
                      <FormField
                        id="tempoCasaTrab"
                        label="Tempo que leva de casa ao trabalho (00h00m)"
                        register={register}
                      />
                    )}
                    {visibility.partGrupos && (
                      <FormField
                        id="partGrupos"
                        label="Participação em associações ou grupos comunitários?"
                        register={register}
                      />
                    )}
                    {visibility.educacaoMetanoia && (
                      <FormField
                        id="educacaoMetanoia"
                        label="Já fez algum processo de educação Metanoia/Capital ?"
                        register={register}
                      />
                    )}
                  </SimpleGrid>
                </Box>
              </VStack>
              <Button type="submit" bg={'#1F7CBF'} color={'white'} mt={'4rem'}>
                Iniciar Pesquisa
              </Button>
            </form>
          </Box>
        </Box>
      </Center>
    </Flex>
  )
}

export default Identificação