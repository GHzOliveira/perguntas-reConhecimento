import {
  Container,
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  Button,
  useBreakpointValue,
  Radio,
  RadioGroup,
  Stack,
  Text
} from '@chakra-ui/react'
import PerguntaComponent from '../renderPerguntas'
import RespostaComponent from '../renderResposta'
import { perguntasEtapa2 } from '../../../../perguntas/perguntas2'
import { useState, useEffect } from 'react'
import { useRespostaStore } from '../../../../store/usePerguntaStore'

interface Step2Props {
  nextStep: () => void
}

export function Step2({ nextStep }: Step2Props) {
  const { respostas } = useRespostaStore()
  const [isAllAnswered, setIsAllAnswered] = useState(false)

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  useEffect(() => {
    const allAnswered = perguntasEtapa2.every(
      pergunta => respostas[pergunta.id] !== undefined
    )
    setIsAllAnswered(allAnswered)
  }, [respostas])

  const containerSize = useBreakpointValue({
    base: '90%',
    md: '80%',
    lg: '70%'
  })
  const buttonSize = useBreakpointValue({ base: 'sm', md: 'md' })
  const isMobile = useBreakpointValue({ base: true, md: false })

  return (
    <Container maxW={containerSize} mt={'2rem'}>
      {!isMobile ? (
        <Table variant="simple" size={'xl'}>
          <Thead>
            <Tr>
              <Th textAlign="center" p={2}>
                Pergunta
              </Th>
              <Th textAlign="center" p={2}>
                Discordo plenamente
              </Th>
              <Th textAlign="center" p={2}>
                Discordo
              </Th>
              <Th textAlign="center" p={2}>
                Não concordo nem discordo
              </Th>
              <Th textAlign="center" p={2}>
                Concordo
              </Th>
              <Th textAlign="center" p={2}>
                Concordo plenamente
              </Th>
            </Tr>
          </Thead>
          <Tbody>
            {perguntasEtapa2.map(pergunta => (
              <Tr key={pergunta.id}>
                <Td>
                  <PerguntaComponent pergunta={pergunta} />
                </Td>
                <RespostaComponent
                  perguntaId={pergunta.id}
                  ehNegativa={pergunta.ehNegativa}
                />
              </Tr>
            ))}
          </Tbody>
        </Table>
      ) : (
        perguntasEtapa2.map(pergunta => (
          <Stack key={pergunta.id} mb={4}>
            <Text as="div" fontWeight="bold">
              <PerguntaComponent pergunta={pergunta} />
            </Text>
            <RadioGroup
              onChange={value =>
                useRespostaStore
                  .getState()
                  .setResposta(pergunta.id, parseInt(value))
              }
            >
              <Stack direction="column">
                <Radio value="1">Discordo plenamente</Radio>
                <Radio value="2">Discordo</Radio>
                <Radio value="3">Não concordo nem discordo</Radio>
                <Radio value="4">Concordo</Radio>
                <Radio value="5">Concordo plenamente</Radio>
              </Stack>
            </RadioGroup>
          </Stack>
        ))
      )}
      {isAllAnswered && (
        <Button
          mt={4}
          mb={4}
          size={buttonSize}
          colorScheme="teal"
          onClick={nextStep}
        >
          Próxima Etapa
        </Button>
      )}
    </Container>
  )
}
