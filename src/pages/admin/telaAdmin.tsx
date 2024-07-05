import {
  Box,
  Flex,
  Heading,
  Link,
  VStack,
  IconButton,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  Container,
  useBreakpointValue,
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { PiUserList } from "react-icons/pi";
import { fetchAllUsers, fetchUserResponses } from "../../api/api";
import CustomModal from "../../components/modal/Modal";

const TelaAdmin = () => {
  const [users, setUsers] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userResponses, setUserResponses] = useState([]);

  useEffect(() => {
    const fetchUsersData = async () => {
      const usersData = await fetchAllUsers();
      setUsers(usersData);
    };
    fetchUsersData();
  }, []);

  const handleViewUserResponses = async (userId: number) => {
    const responses = await fetchUserResponses(userId);
    setUserResponses(responses);
    setIsModalOpen(true);
  };

  const tableSize = useBreakpointValue({ base: "sm", md: "md" });

  return (
    <Container maxW="container.xl" p={4}>
      <Flex
        as="nav"
        align="center"
        justify="space-between"
        mb={4}
        bg="gray.200"
        p={4}
        direction={{ base: "column", md: "row" }}
        gap={4}
      >
        <Heading size="md">Painel de administração</Heading>
        <Flex>
          <Link href="/dashboard" mr={4}>
            Dashboard
          </Link>
        </Flex>
      </Flex>
      <VStack spacing={4} align="stretch">
        <Heading size="sm">Usuários</Heading>
        <Table
          variant="simple"
          size={tableSize}
          style={{ maxWidth: "600px", margin: "0 auto" }}
        >
          <Thead>
            <Tr>
              <Th>Nome</Th>
              <Th>Visualizar</Th>
            </Tr>
          </Thead>
          <Tbody>
            {users.map((user) => (
              <Tr key={user.id}>
                <Td>{user.nomeCompleto}</Td>
                <Td>
                  <IconButton
                    aria-label="View user"
                    icon={<PiUserList />}
                    onClick={() => handleViewUserResponses(user.id)}
                  />
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </VStack>
      <CustomModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Respostas do Usuário"
        body={
            <Table variant="simple">
              <Thead>
                <Tr>
                  <Th>Pergunta</Th>
                  <Th>Resposta</Th>
                </Tr>
              </Thead>
              <Tbody>
                {userResponses.map((response) => (
                  <Tr key={response.id}>
                    <Td>Pergunta {response.question}</Td>
                    <Td>{response.score}</Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          }
      />
    </Container>
  );
};

export default TelaAdmin;
