import { Divider, Flex, Heading } from '@chakra-ui/react'
import Botao from '../../../../components/button/Button'
import { useEffect, useState } from 'react'
import { checkFormResponse } from '../../../../api/api'

interface IntroProps {
  nextStep: () => void
  userId: number
}

function Introducao({ nextStep, userId }: IntroProps) {
  const [isFormResponded, setIsFormResponded] = useState(false)

  useEffect(() => {
    const fetchFormResponse = async () => {
      try {
        const response = await checkFormResponse(userId)
        setIsFormResponded(response.respondeuForm)
      } catch (error) {
        console.error('Erro ao verificar o status do formulário', error)
      }
    }

    fetchFormResponse()
  }, [userId])

  return (
    <Flex direction={'column'} align={'center'} mt={'5rem'}>
      <Heading as="h1" size="3xl" textAlign="start" w={'full'}>
        reConhecimento
      </Heading>
      <br />
      <br />
      <p>
        A pesquisa reConhecimento trata sobre Cultura Organizacional.
        <br />
        <br />
        Ao refletir sobre afirmações propostas, considere como você percebe a
        realidade e não o modo como você gostaria que fosse.
        <br />
        <br />
        Não há respostas certas ou erradas; o melhor é sua percepção sincera.
        <br />
        <br />
        O questionário é composto por 3 partes e pedimos que responda na
        sequência. Em geral o tempo de resposta é de apenas 12 minutos.
        <br />
        <br />
        São 5 opções: Discordo plenamente, Discordo, Não concordo nem discordo,
        Concordo e Concordo plenamente.
        <br />
        <br />
        Por gentileza, responda até o dia 07 de julho. Muito obrigado!
      </p>
      <Divider />
      <Botao
        onClick={nextStep}
        bg={'#1F7CBF'}
        color={'white'}
        mt={'2rem'}
        mb={8}
        paddingX={'5rem'}
        isDisabled={isFormResponded}
        _hover={{ bg: 'blue.500' }}
        _active={{ bg: 'blue.600' }}
        transition="background-color 0.2s"
      >
        Começar
      </Botao>
    </Flex>
  )
}

export default Introducao
