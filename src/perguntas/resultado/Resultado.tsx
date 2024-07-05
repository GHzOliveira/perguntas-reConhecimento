import { Box } from "@chakra-ui/react";
import { useRespostaStore } from "../../store/usePerguntaStore";


const calcularPontuacaoTotal = () => {
  const { respostas } = useRespostaStore.getState();
  return Object.values(respostas).reduce((total, pontuacao) => total + pontuacao, 0);
};

const Resultado: React.FC = () => {
  const pontuacaoTotal = calcularPontuacaoTotal();
  return <Box>Pontuação Total: {pontuacaoTotal}</Box>;
};

export default Resultado;