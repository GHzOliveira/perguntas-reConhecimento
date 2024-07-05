import { Button, Divider, Flex, Heading } from "@chakra-ui/react";
import useAdminStore from "../../../../store/useAdminStore";
import { useRespostaStore } from "../../../../store/usePerguntaStore";
import Botao from "../../../../components/button/Button";

interface IntroProps {
  nextStep: () => void;
  isCompleted: boolean;
}

function Introducao({ nextStep, isCompleted }: IntroProps) {
  const { resetRespostas } = useRespostaStore();
  const { isAdmin, isLoggedIn } = useAdminStore();

  console.log(isCompleted)
  
  return (
    <Flex direction={"column"} align={"center"} mt={"8rem"}>
      <Heading as="h1" size="3xl" textAlign="start" w={"full"}>
        reConhecimento
      </Heading>
      <br />
      <br />
      <p>
        A pesquisa reConhecimento trata sobre Cultura Organizacional.
        <br />
        <br />
        Ao refletir sobre afirmações propostas, considere como você percebe a realidade e não o modo como você gostaria que fosse.
        <br />
        <br />
        Não há respostas certas ou erradas; o melhor é sua percepção sincera.
        <br />
        <br />
        O questionário é composto por 3 partes e pedimos que responda na sequência. Em geral o tempo de resposta é de apenas 12 minutos.
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
        bg={"#0AAE4B"}
        color={"white"}
        mt={"2rem"}
        paddingX={"5rem"}
        isDisabled={isCompleted}
      >
        Começar
      </Botao>
      {isLoggedIn && isAdmin && (
        <Button
          onClick={resetRespostas}
          bg={"red.500"}
          color={"white"}
          mt={"2rem"}
          paddingX={"5rem"}
        >
          Resetar Respostas
        </Button>
      )}
    </Flex>
  );
}

export default Introducao;
