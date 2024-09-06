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
import { perguntasEtapa3 } from '../../../../perguntas/perguntas3'
import { useState, useEffect } from 'react'
import { useRespostaStore } from '../../../../store/usePerguntaStore'
import CustomModal from '../../../../components/modal/Modal'
import { markFormAsResponded, submitUserResponse } from '../../../../api/api'
import { useNavigate } from 'react-router-dom'

interface Step3Props {
  nextStep: () => void
  resetToStep1: () => void
}

export function Step3({ nextStep, resetToStep1 }: Step3Props) {
  const { respostas } = useRespostaStore()
  const navigate = useNavigate()
  const [isAllAnswered, setIsAllAnswered] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  useEffect(() => {
    const allAnswered = perguntasEtapa3.every(
      pergunta => respostas[pergunta.id] !== undefined
    )
    setIsAllAnswered(allAnswered)
  }, [respostas])

  const handleSubmit = async () => {
    if (isAllAnswered) {
      const userJson = sessionStorage.getItem('userSession')
      if (userJson) {
        const user = JSON.parse(userJson)
        const userId = user.id
        if (userId) {
          const { respostas } = useRespostaStore.getState()
          try {
            await submitUserResponse(userId, respostas)
            await markFormAsResponded(userId, true)
            setIsModalOpen(true)
          } catch (error) {
            console.error('Erro ao enviar respostas', error)
            alert('Erro ao enviar respostas. Tente novamente.')
          }
        } else {
          alert('Usuário não encontrado na sessão.')
        }
      } else {
        alert('Dados do usuário não encontrados na sessão.')
      }
    } else {
      alert('Por favor, responda todas as perguntas antes de prosseguir.')
    }
  }

  const handleModalCloseAndSubmit = () => {
    window.location.reload()
    setIsModalOpen(false)
    navigate('/identificacao/questionario')
  }

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
            {perguntasEtapa3.map(pergunta => (
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
        perguntasEtapa3.map(pergunta => (
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
          colorScheme="teal"
          onClick={handleSubmit}
          size={buttonSize}
        >
          Próxima Etapa
        </Button>
      )}
      <CustomModal
        isOpen={isModalOpen}
        onClose={handleModalCloseAndSubmit}
        title="Pesquisa finalizada"
        body="Somos gratos pela sua participação!"
      />
    </Container>
  )
}

