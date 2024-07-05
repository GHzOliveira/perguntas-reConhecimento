import { useState } from "react";
import {
  Flex,
  Input,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  FormControl,
  FormLabel,
  Button,
  useDisclosure,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import Botao from "../../components/button/Button";
import EditableText from "../../components/editableText/Text";
import { PiTrash } from "react-icons/pi";
import CustomModal from "../../components/modal/Modal";
import { createFilial, deleteFilial } from "../../api/api";

interface Filial {
  id: number;
  filial: string;
  quantidadeColaboradores: number;
}

const Home = () => {
  const { register, handleSubmit, reset } = useForm();
  const [filiais, setFiliais] = useState<Filial[]>([]);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const linkToShare = `${window.location.origin}/identificacao`;

  const onSubmit = async (data: any) => {
    if (!data.filial.trim() || !data.quantidadeColaboradores) {
      return;
    }
    const quantidadeColaboradores = Number(data.quantidadeColaboradores);
    try {
      const newFilial = await createFilial(data.filial, quantidadeColaboradores);
      setFiliais([...filiais, newFilial]);
    } catch (error) {
      console.error("Erro ao criar filial:", error);
    }
    reset();
  };

  const handleDelete = async (id: number) => {
    try {
      await deleteFilial(id);
      setFiliais(filiais.filter((filial) => filial.id !== id));
    } catch (error) {
      console.error("Erro ao excluir filial:", error);
    }
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(linkToShare);
  };

  return (
    <Flex direction="column" p={5} maxWidth="50rem" mx="auto">
      <EditableText />
      <Flex
        as="form"
        onSubmit={handleSubmit(onSubmit)}
        gap={5}
        align={"center"}
        direction={"column"}
      >
        <div style={{ display: "flex", flexDirection: "row", gap: "1rem" }}>
          <FormControl>
            <FormLabel htmlFor="filial">Filial</FormLabel>
            <Input id="filial" placeholder="Filial" {...register("filial")} />
          </FormControl>
          <FormControl>
            <FormLabel htmlFor="quantidade">Qntd. colaboradores</FormLabel>
            <Input
              id="quantidade"
              placeholder="Qntd. colaboradores"
              type="number"
              {...register("quantidadeColaboradores")}
            />
          </FormControl>
        </div>
        <div>
          <Button type="submit" bg={"#1F7CBF"} color={"white"} paddingX={20}>
            Adicionar
          </Button>
        </div>
      </Flex>
      <Table variant="simple" mt={4} mb={10}>
        <Thead>
          <Tr>
            <Th>Filial</Th>
            <Th isNumeric>Qntd. colaboradores</Th>
            <Td>Ações</Td>
          </Tr>
        </Thead>
        <Tbody>
          {filiais.map((filial, index) => (
            <Tr key={index}>
              <Td>{filial.filial}</Td>
              <Td isNumeric>{filial.quantidadeColaboradores}</Td>
              <Td>
                <Button onClick={() => handleDelete(filial.id)} variant={"ghost"}>
                  <PiTrash />
                </Button>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
      <Botao
        mt={4}
        bg={"#1F7CBF"}
        onClick={onOpen}
        isDisabled={filiais.length === 0}
      >
        Próximo
      </Botao>
      <CustomModal
        isOpen={isOpen}
        onClose={onClose}
        title="Compartilhe o Link"
        body={
          <>
            <p>
              De acordo com as informações que você cadastrou
              <br />
              <br />
              Recomendamos que a pesquisa seja respondida por
              100% deles!
              <br />
              <br />
              Abaixo está o link para a pesquisa. Para convidar seus
              colaboradores, basta copiar o link abaixo e enviar para todos
              através do seu email ou whatsapp. 
              <br />
              <br />
              Como o link é o mesmo para todos
              de sua obra, você pode criar um grupo em seu email ou whatsapp e
              enviar o link a todos de uma só vez. Ou ainda, pode pedir ajuda
              para outras pessoas da equipe para dispará-lo.
            </p>
            <Input value={linkToShare} isReadOnly mt={4} />
            <Button
              mt={4}
              onClick={handleCopyLink}
              bg={"#1F7CBF"}
              color={"white"}
              w={"full"}
            >
              Clique para copiar Link
            </Button>
          </>
        }
      />
    </Flex>
  );
};

export default Home;
