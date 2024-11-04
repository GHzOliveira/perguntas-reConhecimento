import { Divider, Flex, Text, useBreakpointValue } from '@chakra-ui/react'
import { useFormVisibilityStore } from '../../../store/store'
import { GenericForm } from '../../../components/FormGeneric/FormGeneric'
import { ICountry, IState, ICity } from 'country-state-city'
import { useState } from 'react'
import { Filial } from '../../../types/FormType'
import AdminPanel from '../../identificação/components/painelADM/PainelADM'

export default function ConfigIdentificacao() {
  const { visibility } = useFormVisibilityStore()
  const [countries] = useState<ICountry[]>([])
  const [states] = useState<IState[]>([])
  const [cities] = useState<ICity[]>([])
  const [filiais] = useState<Filial[]>([])
  const [selectedCountry, setSelectedCountry] = useState('')
  const [selectedState, setSelectedState] = useState('')

  const paddingX = useBreakpointValue({ base: '1rem', md: '20rem' })
  const marginTop = useBreakpointValue({ base: '2rem', md: '5rem' })
  const gap = useBreakpointValue({ base: '1rem', md: '7rem' })
  const marginLeft = useBreakpointValue({ base: '0', md: '7rem' })

  return (
    <Flex direction={'column'} alignItems="center" ml={marginLeft}>
      <Text
        mb="1rem"
        paddingX={paddingX}
        mt={marginTop}
        fontSize={{ base: 'md', md: 'lg' }}
      >
        Configuração de Visibilidade dos Campos de Identificação
      </Text>
      <Divider />
      <Flex
        paddingX={paddingX}
        mt="2rem"
        bg={'white'}
        flexDirection={'row'}
        gap={gap}
        border="1px solid white"
        borderRadius="md"
        justifyContent="center"
        alignItems="center"
        width="auto"
      >
        <div>
          <AdminPanel />
        </div>
        <div>
          <GenericForm
            visibility={visibility}
            countries={countries}
            states={states}
            cities={cities}
            filiais={filiais}
            selectedCountry={selectedCountry}
            selectedState={selectedState}
            setSelectedCountry={setSelectedCountry}
            setSelectedState={setSelectedState}
            onSubmit={() => {}}
          />
        </div>
      </Flex>
    </Flex>
  )
}
