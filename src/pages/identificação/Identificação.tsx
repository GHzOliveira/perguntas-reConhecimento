import { useForm, SubmitHandler } from "react-hook-form";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Flex,
  Text,
  useBreakpointValue,
  Center,
} from "@chakra-ui/react";
import { createUser } from "../../api/api";
import { useFormVisibilityStore } from "../../store/store";
import { useNavigate } from "react-router-dom";

type FormData = {
  nomeCompleto: string | null;
};

const Identificação = () => {
  const navigate = useNavigate();

  const { register, handleSubmit } = useForm<FormData>();
  const onSubmit: SubmitHandler<FormData> = async (data) => {
    try {
      const createdUser = await createUser(data);
      console.log("Usuário criado com sucesso!");
      sessionStorage.setItem('userSession', JSON.stringify(createdUser));
      navigate('/identificacao/questionario');
    } catch (error) {
      console.error("Erro ao criar usuário:", error);
    }
  };

  const { visibility } = useFormVisibilityStore();

  const paddingX = useBreakpointValue({ base: "1rem", md: "20rem" });
  const marginTop = useBreakpointValue({ base: "2rem", md: "5rem" });
  const maxW = useBreakpointValue({ base: "90%", md: "lg" });

  return (
    <Flex direction={"column"}>
      <Text mb="5rem" paddingX={paddingX} mt={marginTop} fontSize={{ base: "md", md: "lg" }}>
        Receba as nossas boas-vindas!
        <br/>
        <br/>
        Chegou o momento de tirarmos uma fotografia para o "reConhecimento" do momento atual da cultura.
        <br/>
        <br/>
        Antes de iniciarmos, precisamos da sua identificação. Seus dados são confidenciais e as suas percepções individuais não serão compartilhadas.
        <br/>
        <br/>
        Preencha todos os campos abaixo e bom trabalho.
        <br/>
        <br/>
        Caso tenha alguma dúvida, por favor fique à vontade para nos procurar.
      </Text>
      <Center>
        <Box w="full" maxW={maxW} mt={"1rem"}>
          <form onSubmit={handleSubmit(onSubmit)}>
            {visibility.nomeCompleto && (
              <FormControl>
                <FormLabel htmlFor="nomeCompleto">Nome completo</FormLabel>
                <Input id="nomeCompleto" {...register("nomeCompleto")} />
              </FormControl>
            )}
            <Button type="submit" bg={"#1F7CBF"} color={"white"} mt={"4rem"}>
              Iniciar Pesquisa
            </Button>
          </form>
        </Box>
      </Center>
    </Flex>
  );
};

export default Identificação;