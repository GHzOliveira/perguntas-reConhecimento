import { useForm, SubmitHandler } from 'react-hook-form'
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Select,
  Center,
  SimpleGrid,
  Text,
  Flex,
  Divider,
  useBreakpointValue
} from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import {
  createUser,
  fetchAllFiliais,
  fetchVisibilitySettings
} from '../../api/api'
import { useFormVisibilityStore } from '../../store/store'
import { maskCPF } from '../../utils/maskCPF'
import { isValidCPF } from '../../utils/validatorCPF'
import {
  City,
  Country,
  ICity,
  ICountry,
  IState,
  State
} from 'country-state-city'
import { useNavigate } from 'react-router-dom'
import { FormData } from '../../types/FormType'

type ModifiedFormData = Omit<FormData, 'filialTrabalho'> & {
  filialTrabalho?: number | null
  filial?: { connect: { id: number } } | undefined
  filialName?: string | null
}
interface Filial {
  id: number
  filial: string
}

const Identificação = () => {
  const [countries, setCountries] = useState<ICountry[]>([])
  const [states, setStates] = useState<IState[]>([])
  const [cities, setCities] = useState<ICity[]>([])
  const [filiais, setFiliais] = useState<Filial[]>([])
  const [selectedCountry, setSelectedCountry] = useState<string>('')
  const [selectedState, setSelectedState] = useState<string>('')

  const navigate = useNavigate()

  useEffect(() => {
    const loadFiliais = async () => {
      const fetchedFiliais = await fetchAllFiliais()
      setFiliais(fetchedFiliais)
    }

    loadFiliais()
  }, [])

  useEffect(() => {
    return setCountries(Country.getAllCountries())
  }, [])

  useEffect(() => {
    if (selectedCountry) {
      setStates(State.getStatesOfCountry(selectedCountry))
    }
  }, [selectedCountry])

  useEffect(() => {
    if (selectedState) {
      setCities(City.getCitiesOfState(selectedCountry, selectedState))
    }
  }, [selectedState, selectedCountry])

  const { register, handleSubmit } = useForm<FormData>()

  const onSubmit: SubmitHandler<FormData> = async data => {
    if (data.dataNascimento && data.dataNascimento.trim() !== '') {
      data.dataNascimento += 'T00:00:00.000Z'
    } else {
      data.dataNascimento = null
    }

    const filialTrabalhoNumber = data.filialTrabalho
      ? parseInt(data.filialTrabalho.toString())
      : null

    const modifiedData: Omit<ModifiedFormData, 'filialName'> = {
      ...data,
      filialTrabalho: undefined,
      filial: filialTrabalhoNumber
        ? { connect: { id: filialTrabalhoNumber } }
        : undefined
    }

    try {
      const createdUser = await createUser(modifiedData)
      sessionStorage.setItem('userSession', JSON.stringify(createdUser))
      navigate('/identificacao/questionario')
    } catch (error) {
      console.error('Erro ao criar usuário:', error)
    }
  }

  const { visibility, setVisibility } = useFormVisibilityStore()

  useEffect(() => {
    const loadVisibilitySettings = async () => {
      const data = await fetchVisibilitySettings()
      data.forEach((item: { field: string; isVisible: boolean }) => {
        setVisibility(item.field, item.isVisible)
      })
    }

    loadVisibilitySettings()
  }, [setVisibility])

  const paddingX = useBreakpointValue({ base: '1rem', md: '20rem' })
  const marginTop = useBreakpointValue({ base: '2rem', md: '5rem' })
  const maxW = useBreakpointValue({ base: '90%', md: 'lg' })

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
          <form onSubmit={handleSubmit(onSubmit)}>
            <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
              {visibility.nomeCompleto && (
                <FormControl>
                  <FormLabel htmlFor="nomeCompleto">Nome completo</FormLabel>
                  <Input id="nomeCompleto" {...register('nomeCompleto')} />
                </FormControl>
              )}
              {visibility.dataNascimento && (
                <FormControl>
                  <FormLabel htmlFor="dataNascimento">
                    Data de nascimento
                  </FormLabel>
                  <Input
                    id="dataNascimento"
                    type="date"
                    {...register('dataNascimento')}
                  />
                </FormControl>
              )}
              {visibility.email && (
                <FormControl>
                  <FormLabel htmlFor="email">Email</FormLabel>
                  <Input id="email" type="email" {...register('email')} />
                </FormControl>
              )}
              {visibility.cpf && (
                <FormControl>
                  <FormLabel htmlFor="cpf">CPF</FormLabel>
                  <Input
                    id="cpf"
                    {...register('cpf', {
                      validate: value =>
                        isValidCPF(value ?? '') || 'CPF inválido',
                      setValueAs: value => maskCPF(value)
                    })}
                    onChange={e => {
                      const maskedValue = maskCPF(e.target.value)
                      e.target.value = maskedValue
                    }}
                  />
                </FormControl>
              )}
              {visibility.tempoEmpresa && (
                <FormControl>
                  <FormLabel htmlFor="tempoEmpresa">
                    Quanto tempo de empresa
                  </FormLabel>
                  <Select id="tempoEmpresa" {...register('tempoEmpresa')}>
                    <option value="Menos de 1 ano">Menos de 1 ano</option>
                    <option value="1 a 3 anos">1 a 3 anos</option>
                    <option value="5 a 10 anos">5 a 10 anos</option>
                    <option value="Mais de 10 anos">Mais de 10 anos</option>
                  </Select>
                </FormControl>
              )}
              {visibility.areaTrabalho && (
                <FormControl>
                  <FormLabel htmlFor="areaTrabalho">
                    Qual área trabalha
                  </FormLabel>
                  <Input id="areaTrabalho" {...register('areaTrabalho')} />
                </FormControl>
              )}
              {visibility.filialTrabalho && (
                <FormControl>
                  <FormLabel htmlFor="filialTrabalho">
                    Qual filial trabalha
                  </FormLabel>
                  <Select id="filialTrabalho" {...register('filialTrabalho')}>
                    <option value="">Selecione uma filial...</option>
                    {filiais.map(filial => (
                      <option key={filial.id} value={filial.id}>
                        {filial.filial}
                      </option>
                    ))}
                  </Select>
                </FormControl>
              )}
              {visibility.funcao && (
                <FormControl>
                  <FormLabel htmlFor="funcao">Qual a sua função?</FormLabel>
                  <Input id="funcao" {...register('funcao')} />
                </FormControl>
              )}
              {visibility.genero && (
                <FormControl>
                  <FormLabel htmlFor="genero">Gênero</FormLabel>
                  <Select id="genero" {...register('genero')}>
                    <option value="feminino">Feminino</option>
                    <option value="masculino">Masculino</option>
                    <option value="Prefiro não dizer">Prefiro não dizer</option>
                  </Select>
                </FormControl>
              )}
              {visibility.pais && (
                <FormControl>
                  <FormLabel htmlFor="pais">País</FormLabel>
                  <Select
                    id="pais"
                    {...register('pais')}
                    onChange={e => setSelectedCountry(e.target.value)}
                  >
                    {countries.map(country => (
                      <option key={country.isoCode} value={country.isoCode}>
                        {country.name}
                      </option>
                    ))}
                  </Select>
                </FormControl>
              )}
              {visibility.estado && (
                <FormControl>
                  <FormLabel htmlFor="estado">Estado</FormLabel>
                  <Select
                    id="estado"
                    {...register('estado')}
                    onChange={e => setSelectedState(e.target.value)}
                    disabled={!selectedCountry}
                  >
                    {states.map(state => (
                      <option key={state.isoCode} value={state.isoCode}>
                        {state.name}
                      </option>
                    ))}
                  </Select>
                </FormControl>
              )}
              {visibility.cidade && (
                <FormControl>
                  <FormLabel htmlFor="cidade">Cidade</FormLabel>
                  <Select
                    id="cidade"
                    {...register('cidade')}
                    disabled={!selectedState}
                  >
                    {cities.map(city => (
                      <option key={city.name} value={city.name}>
                        {city.name}
                      </option>
                    ))}
                  </Select>
                </FormControl>
              )}
            </SimpleGrid>
            {visibility.processoEducacao && (
              <FormControl mt="1rem">
                <FormLabel htmlFor="processoEducacao">
                  Já fez algum processo de educação na Metanoia/Capital
                  Relacional?
                </FormLabel>
                <Select
                  id="educacaoMetanoia"
                  {...register('educacaoMetanoia', {
                    setValueAs: value => value === 'true'
                  })}
                >
                  <option value="true">Sim</option>
                  <option value="false">Não</option>
                </Select>
              </FormControl>
            )}
            <Button type="submit" bg={'#1F7CBF'} color={'white'} mt={'4rem'}>
              Iniciar Pesquisa
            </Button>
          </form>
        </Box>
      </Center>
    </Flex>
  )
}

export default Identificação
