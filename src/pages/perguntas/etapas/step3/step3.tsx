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
} from "@chakra-ui/react";
import PerguntaComponent from "../renderPerguntas";
import RespostaComponent from "../renderResposta";
import { perguntasEtapa3 } from "../../../../perguntas/perguntas3";
import { useState, useEffect } from "react";
import { useRespostaStore } from "../../../../store/usePerguntaStore";
import CustomModal from "../../../../components/modal/Modal";
import { submitUserResponse } from "../../../../api/api";

interface Step3Props {
  nextStep: () => void;
  resetToStep1: () => void;
}

export function Step3({ nextStep, resetToStep1 }: Step3Props) {
  const { respostas } = useRespostaStore();
  const [isAllAnswered, setIsAllAnswered] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const allAnswered = perguntasEtapa3.every(
      (pergunta) => respostas[pergunta.id] !== undefined
    );
    console.log(allAnswered);
    console.log(respostas);
    setIsAllAnswered(allAnswered);
    if (allAnswered) {
      setIsModalOpen(true);
    }
  }, [respostas]);

const handleSubmit = async () => {
  const userJson = sessionStorage.getItem("userSession"); 
  if (userJson) {
    const user = JSON.parse(userJson); 
    const userId = user.id; 
    if (userId) {
      const { respostas } = useRespostaStore.getState();
      try {
        await submitUserResponse(userId, respostas);
        alert("Respostas enviadas com sucesso!");
        nextStep();
      } catch (error) {
        console.error("Erro ao enviar respostas", error);
        alert("Erro ao enviar respostas. Tente novamente.");
      }
    } else {
      alert("Usuário não encontrado na sessão.");
    }
  } else {
    alert("Dados do usuário não encontrados na sessão.");
  }
};

  const handleCloseModal = () => {
    setIsModalOpen(false);
    resetToStep1();
  };

  const handleModalCloseAndSubmit = () => {
    handleSubmit();
  };

  const containerSize = useBreakpointValue({ base: "90%", md: "80%", lg: "70%" });
  const buttonSize = useBreakpointValue({ base: "sm", md: "md" });

  return (
    <Container  maxW={containerSize} mt={"2rem"}>
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
          {perguntasEtapa3.map((pergunta) => (
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
          <Button mt={4} colorScheme="teal" onClick={handleSubmit} size={buttonSize}>
            Próxima Etapa
          </Button>
      )}
      <CustomModal
        isOpen={isModalOpen}
        onClose={handleModalCloseAndSubmit}
        title="Pesquisa finalizada"
        body="Muito obrigado pela sua participação!"
      />
    </Container>
  );
}
