import { useState } from 'react'
import {
  Box,
  Text,
  Flex,
  Container,
  VStack,
  Heading,
  useToast,
  Spinner
} from '@chakra-ui/react'
import {
  dowloadExcelIndividual,
  dowloadTabeladeResultados
} from '../../../api/api'
import CustomModal from '../../../components/modal/Modal'
import { UserResponse } from '../interface/user'
import { useFetchUsers } from '../hook/buscaDados'
import { UserResponsesTable } from '../components/Table'
import DownloadAllButton from '../components/DownloadAllButton'
import UserTable from '../components/UserTable'

export default function TabelaUsuarios() {
  const { users, loading } = useFetchUsers()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [userResponses] = useState<UserResponse[]>([])
  const [isDownloading, setIsDownloading] = useState(false)
  const toast = useToast()

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
    setIsDownloading(true)
    toast({
      title: 'Preparando download',
      description: 'Aguarde enquanto geramos seu arquivo...',
      status: 'info',
      duration: null,
      isClosable: false
    })

    try {
      const response = await dowloadTabeladeResultados()
      const url = window.URL.createObjectURL(new Blob([response.data]))
      const link = document.createElement('a')
      link.href = url
      link.setAttribute('download', 'resultados.xlsx')
      document.body.appendChild(link)
      link.click()

      // Cleanup
      document.body.removeChild(link)
      window.URL.revokeObjectURL(url)

      toast.closeAll()
      toast({
        title: 'Download concluído',
        status: 'success',
        duration: 3000
      })
    } catch (error) {
      console.error('Failed to download Excel file', error)
      toast({
        title: 'Erro no download',
        description: 'Não foi possível baixar o arquivo',
        status: 'error',
        duration: 3000
      })
    } finally {
      setIsDownloading(false)
    }
  }

  if (loading) return <div>Loading...</div>

  return (
    <Flex width="100%">
      <Container maxW="container.xl" p={4}>
        <VStack spacing={4} align="stretch">
          <Heading size="xl">Usuários</Heading>
          <Box
            display="flex"
            justifyContent="flex-end"
            mb={4}
            alignItems="center"
          >
            <Text pr="1rem">Baixar Tabela de Resultados</Text>
            {isDownloading ? (
              <Spinner size="md" mr={2} />
            ) : (
              <DownloadAllButton onClick={handleDownloadAllExcel} />
            )}
          </Box>
          <UserTable users={users} onDownloadExcel={handleDownloadExcel} />
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
