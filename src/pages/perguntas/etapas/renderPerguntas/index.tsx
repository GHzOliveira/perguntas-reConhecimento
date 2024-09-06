import { Box, Text } from '@chakra-ui/react'
import { Pergunta } from '../../../../perguntas/perguntas'

interface PerguntaComponentProps {
  pergunta: Pergunta
  numero?: number
}

const PerguntaComponent: React.FC<PerguntaComponentProps> = ({
  pergunta,
  numero
}) => {
  return (
    <Box>
      <br />
      <Text>{pergunta.texto}</Text>
      <br />
    </Box>
  )
}

export default PerguntaComponent
