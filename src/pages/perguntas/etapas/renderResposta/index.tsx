import { Flex, HStack, Radio, RadioGroup, Td } from "@chakra-ui/react";
import { useRespostaStore } from "../../../../store/usePerguntaStore";
import { useState } from "react";

interface RespostaComponentProps {
  perguntaId: number;
  ehNegativa: boolean;
}

const RespostaComponent: React.FC<RespostaComponentProps> = ({
  perguntaId,
  ehNegativa,
}) => {
  const { setResposta } = useRespostaStore();
  const [respostaSelecionada, setRespostaSelecionada] = useState<string>("");

  const handleChange = (value: string) => {
    const pontuacao = parseFloat(value);
    setResposta(perguntaId, pontuacao);
    setRespostaSelecionada(value);
  };

  return (
    <>
      <Td>
        <Flex justify="center">
          <RadioGroup value={respostaSelecionada} onChange={handleChange}>
            <Radio value={ehNegativa ? "-10" : "0"} />
          </RadioGroup>
        </Flex>
      </Td>
      <Td>
        <Flex justify="center">
          <RadioGroup value={respostaSelecionada} onChange={handleChange}>
            <Radio value={ehNegativa ? "-7.5" : "2.5"} />
          </RadioGroup>
        </Flex>
      </Td>
      <Td>
        <Flex justify="center">
          <RadioGroup value={respostaSelecionada} onChange={handleChange}>
            <Radio value={ehNegativa ? "-5" : "5"} />
          </RadioGroup>
        </Flex>
      </Td>
      <Td>
        <Flex justify="center">
          <RadioGroup value={respostaSelecionada} onChange={handleChange}>
            <Radio value={ehNegativa ? "-2.5" : "7.5"} />
          </RadioGroup>
        </Flex>
      </Td>
      <Td>
        <Flex justify="center">
          <RadioGroup value={respostaSelecionada} onChange={handleChange}>
            <Radio value={ehNegativa ? "0" : "10"} />
          </RadioGroup>
        </Flex>
      </Td>
    </>
  );
};

export default RespostaComponent;
