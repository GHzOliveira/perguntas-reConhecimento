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
  useBreakpointValue,
  Box,
  Text
} from '@chakra-ui/react'
import { useState } from 'react'
import { PiDownload, PiUserList } from 'react-icons/pi'
import { PiArrowFatLineDown } from 'react-icons/pi'
import {
  dowloadExcelIndividual,
  dowloadTabeladeResultados,
  fetchUserResponses
} from '../../../api/api'
import CustomModal from '../../../components/modal/Modal'
import { User, UserResponse } from '../interface/user'
import { useFetchUsers } from '../hook/buscaDados'
import { UserResponsesTable } from '../components/Table'

const UserTable = ({
  users,
  onViewResponses,
  onDownloadExcel
}: {
  users: User[]
  onViewResponses: (userId: number) => void
  onDownloadExcel: (userId: number) => void
}) => {
  const tableWidth = useBreakpointValue({ base: '300px', md: '800px' })

  return (
    <div
      style={{
        maxHeight: '600px',
        overflowY: 'auto'
      }}
    >
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
            <Th>Planilha Individual</Th>
          </Tr>
        </Thead>
        <Tbody>
          {Array.isArray(users) &&
            users.map(user => (
              <Tr key={user.id}>
                <Td>{user.nomeCompleto}</Td>
                <Td>
                  <IconButton
                    aria-label="View user"
                    icon={<PiUserList />}
                    onClick={() => onViewResponses(user.id)}
                  />
                </Td>
                <Td>
                  <IconButton
                    aria-label="Download user scores"
                    icon={<PiArrowFatLineDown />}
                    onClick={() => onDownloadExcel(user.id)}
                  />
                </Td>
              </Tr>
            ))}
        </Tbody>
      </Table>
    </div>
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

  const handleDownloadExcel = async (userId: number) => {
    try {
      const response = await dowloadExcelIndividual(userId)
      const url = window.URL.createObjectURL(new Blob([response.data]))
      const link = document.createElement('a')
      link.href = url
      link.setAttribute('download', 'scores.xlsx')
      document.body.appendChild(link)
      link.click()
    } catch (error) {
      console.error('Failed to download Excel file', error)
    }
  }

  const handleDownloadAllExcel = async () => {
    try {
      const response = await dowloadTabeladeResultados()
      const url = window.URL.createObjectURL(new Blob([response.data]))
      const link = document.createElement('a')
      link.href = url
      link.setAttribute('download', 'resultados.xlsx')
      document.body.appendChild(link)
      link.click()
    } catch (error) {
      console.error('Failed to download Excel file', error)
    }
  }

  if (loading) return <div>Loading...</div>

  return (
    <Flex>
      <Container maxW="container.xl" p={4}>
        <VStack spacing={4} align="stretch">
          <Heading size="xl">Usuários</Heading>
          <Box display="flex" justifyContent="flex-end" mb={4}>
            <Text pr="1rem">Baixar Tabela de Resultados</Text>
            <IconButton
              aria-label="Download all scores"
              icon={<PiDownload />}
              onClick={handleDownloadAllExcel}
            />
          </Box>
          <UserTable
            users={users}
            onViewResponses={handleViewUserResponses}
            onDownloadExcel={handleDownloadExcel}
          />
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
