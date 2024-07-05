import {
  Container,
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  Button,
} from "@chakra-ui/react";
import { perguntasEtapa1 } from "../../../../perguntas/perguntas";
import PerguntaComponent from "../renderPerguntas";
import RespostaComponent from "../renderResposta";
import { useRespostaStore } from "../../../../store/usePerguntaStore";
import { useEffect, useState } from "react";

interface Step1Props {
  nextStep: () => void;
}

export function Step1({ nextStep }: Step1Props) {
  const { respostas } = useRespostaStore();
  const [isAllAnswered, setIsAllAnswered] = useState(false);

  useEffect(() => {
    const allAnswered = perguntasEtapa1.every(
      (pergunta) => respostas[pergunta.id] !== undefined
    );
    console.log(allAnswered);
    console.log(respostas);
    setIsAllAnswered(allAnswered);
  }, [respostas]);

  return (
    <Container maxW="90rem" mt={"2rem"}>
      <Table variant="simple" size={"xl"}>
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
          {perguntasEtapa1.map((pergunta) => (
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
      {isAllAnswered && (
        <Button
          mt={4}
          colorScheme="teal"
          onClick={nextStep}
        >
          Próxima Etapa
        </Button>
      )}
    </Container>
  );
}
