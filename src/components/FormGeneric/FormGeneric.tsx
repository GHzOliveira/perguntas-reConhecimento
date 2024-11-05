import { FormControl, FormLabel, Input, Select, Stack } from '@chakra-ui/react'
import { ICity, ICountry, IState } from 'country-state-city'
import { SubmitHandler, useForm } from 'react-hook-form'
import { maskCPF } from '../../utils/maskCPF'
import { isValidCPF } from '../../utils/validatorCPF'
import { Filial, FormData } from '../../types/FormType'
import { useMemo } from 'react'

interface FormFieldsProps {
  visibility: { [key: string]: boolean }
  countries: ICountry[]
  states: IState[]
  cities: ICity[]
  filiais: Filial[]
  selectedCountry: string
  selectedState: string
  setSelectedCountry: (country: string) => void
  setSelectedState: (state: string) => void
  onSubmit: SubmitHandler<FormData>
}

export const GenericForm: React.FC<FormFieldsProps> = ({
  visibility,
  countries,
  states,
  cities,
  filiais,
  selectedCountry,
  selectedState,
  setSelectedCountry,
  setSelectedState,
  onSubmit
}) => {
  const { register, handleSubmit } = useForm<FormData>()
  const visibleFieldsCount = useMemo(
    () => Object.values(visibility).filter(Boolean).length,
    [visibility]
  )

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack
        spacing={4}
        maxHeight={visibleFieldsCount > 6 ? '500px' : undefined}
        overflowY={visibleFieldsCount > 6 ? 'auto' : undefined}
        mb={4}
      >
        {visibility.nomeCompleto && (
          <FormControl>
            <FormLabel htmlFor="nomeCompleto">Nome completo</FormLabel>
            <Input id="nomeCompleto" {...register('nomeCompleto')} />
          </FormControl>
        )}
        {visibility.dataNascimento && (
          <FormControl>
            <FormLabel htmlFor="dataNascimento">Data de nascimento</FormLabel>
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
                validate: value => isValidCPF(value || '') || 'CPF inválido',
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
            <Input id="tempoEmpresa" {...register('tempoEmpresa')} />
          </FormControl>
        )}
        {visibility.areaTrabalho && (
          <FormControl>
            <FormLabel htmlFor="areaTrabalho">Qual área trabalha</FormLabel>
            <Input id="areaTrabalho" {...register('areaTrabalho')} />
          </FormControl>
        )}
        {visibility.filialId && (
          <FormControl>
            <FormLabel htmlFor="filialId">Qual filial trabalha</FormLabel>
            <Select id="filialId" {...register('filialId')}>
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
              <option value="outro">Outro</option>
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
        {visibility.quantidadeLivros && (
          <FormControl>
            <FormLabel htmlFor="quantidadeLivros">
              Quantos livros lê por ano?
            </FormLabel>
            <Input id="quantidadeLivros" {...register('quantidadeLivros')} />
          </FormControl>
        )}
        {visibility.hobbie && (
          <FormControl>
            <FormLabel htmlFor="hobbie">
              Principal atividade nas horas vagas
            </FormLabel>
            <Input id="hobbie" {...register('hobbie')} />
          </FormControl>
        )}
        {visibility.tempoCasaTrab && (
          <FormControl>
            <FormLabel htmlFor="tempoCasaTrab">
              Tempo que leva de casa ao trabalho (00h00m)
            </FormLabel>
            <Input id="tempoCasaTrab" {...register('tempoCasaTrab')} />
          </FormControl>
        )}
        {visibility.modeloTrabalho && (
          <FormControl>
            <FormLabel htmlFor="modeloTrabalho">
              Modelo de trabalho?
            </FormLabel>
            <Select id="modeloTrabalho" {...register('modeloTrabalho')}>
              <option value="Presencial">Presencial</option>
              <option value="Híbrido">Híbrido</option>
              <option value="Remoto">Remoto</option>
            </Select>
          </FormControl>
        )}
        {visibility.partGrupos && (
          <FormControl>
            <FormLabel htmlFor="partGrupos">
              Participação em associações ou grupos comunitários?
            </FormLabel>
            <Input id="partGrupos" {...register('partGrupos')} />
          </FormControl>
        )}
        {visibility.processoEducacao && (
          <FormControl mt="1rem">
            <FormLabel htmlFor="processoEducacao">
              Já fez algum processo de educação na Metanoia/Capital Relacional?
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
      </Stack>
    </form>
  )
}