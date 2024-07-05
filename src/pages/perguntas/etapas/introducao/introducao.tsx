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
        Essa pesquisa trata sobre o modo de sua cooperativa trabalhar.
        <br />
        <br />
        Ao refletir sobre as afirmações propostas, considere a realidade da sua
        área de atuação na cooperativa.
        <br />
        <br />
        Não há respostas certas ou erradas, o melhor é sua percepção sincera.
        <br />
        <br />
        O questionário é composto por 3 partes, <span style={{fontWeight: 'bold'}}>Filosofia, Estratégia, Método.</span>
        <br />
        <br />
        São 5 opções: Discordo plenamente, Discordo, Não concordo nem discordo,
        Concordo e Concordo plenamente. 
        <br />
        <br />
        Bom trabalho!
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
