import {
  Flex,
  Heading,
  VStack,
  IconButton,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  Container,
  useBreakpointValue
} from '@chakra-ui/react'
import { useState } from 'react'
import { PiUserList } from 'react-icons/pi'
import { fetchUserResponses } from '../../../api/api'
import CustomModal from '../../../components/modal/Modal'
import { User, UserResponse } from '../interface/user'
import { useFetchUsers } from '../hook/buscaDados'
import { UserResponsesTable } from '../components/Table'

const UserTable = ({
  users,
  onViewResponses
}: {
  users: User[]
  onViewResponses: (userId: number) => void
}) => {
  const tableWidth = useBreakpointValue({ base: '300px', md: '800px' })

  return (
    <Table
      variant="simple"
      size={useBreakpointValue({ base: 'sm', md: 'md' })}
      bg={'white'}
      sx={{
        width: tableWidth,
        minHeight: '100px',
        marginLeft: useBreakpointValue({ base: '0', md: '15rem' })
      }}
    >
      <Thead>
        <Tr>
          <Th>Nome</Th>
          <Th>Visualizar</Th>
        </Tr>
      </Thead>
      <Tbody>
        {users.map(user => (
          <Tr key={user.id}>
            <Td>{user.nomeCompleto}</Td>
            <Td>
              <IconButton
                aria-label="View user"
                icon={<PiUserList />}
                onClick={() => onViewResponses(user.id)}
              />
            </Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
  )
}

export default function TabelaUsuarios() {
  const { users, loading } = useFetchUsers()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [userResponses, setUserResponses] = useState<UserResponse[]>([])

  const handleViewUserResponses = async (userId: number) => {
    try {
      const responses = await fetchUserResponses(userId)
      setUserResponses(responses)
      setIsModalOpen(true)
    } catch (error) {
      console.error('Failed to fetch user responses', error)
    }
  }

  if (loading) return <div>Loading...</div>

  return (
    <Flex>
      <Container maxW="container.xl" p={4}>
        <VStack spacing={4} align="stretch">
          <Heading size="xl">Usuários</Heading>
          <UserTable users={users} onViewResponses={handleViewUserResponses} />
        </VStack>
        <CustomModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          title="Respostas do Usuário"
          body={<UserResponsesTable responses={userResponses} />}
        />
      </Container>
    </Flex>
  )
}
