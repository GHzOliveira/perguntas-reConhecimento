import { useState } from 'react'
import {
  Box,
  Text,
  Flex,
  VStack,
  Heading,
  useToast,
  Spinner,
  useBreakpointValue
} from '@chakra-ui/react'
import CustomModal from '../../../components/modal/Modal'
import { UserResponse } from '../interface/user'
import { useFetchUsers } from '../hook/buscaDados'
import { UserResponsesTable } from '../components/Table'
import DownloadAllButton from '../components/DownloadAllButton'
import UserTable from '../components/UserTable'
import { CalcService } from '../../../api/calculo/calc.api'
import { useGlobalCompanyFilter } from '../hook/useGlobalCompanyFilter'

export default function TabelaUsuarios() {
  const globalCompanyFilter = useGlobalCompanyFilter();
  const { users, loading } = useFetchUsers(globalCompanyFilter)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [userResponses] = useState<UserResponse[]>([])
  const [isDownloading, setIsDownloading] = useState(false)
  const toast = useToast()

  const padding = useBreakpointValue({ base: '4', md: '6', lg: '8' })
  const width = useBreakpointValue({ base: '95%', md: '90%', lg: '100%' })

  const handleDownloadExcel = async (userId: number) => {
    try {
      const response = await CalcService.downloadExcelIndividual(userId)
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
      const response = await CalcService.downloadTabelaResultados()
      const url = window.URL.createObjectURL(new Blob([response.data]))
      const link = document.createElement('a')
      link.href = url
      link.setAttribute('download', 'resultados.xlsx')
      document.body.appendChild(link)
      link.click()

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

  if (loading) return <Box p={4}>Carregando...</Box>

  return (
    <Box 
      maxW="1200px"
      w="100%"
      mx="auto"
      p={padding}
    >
      <VStack spacing={6} align="stretch" w="100%">
        <Flex justify="space-between" align="center" wrap="wrap" gap={4}>
          <Heading size="xl">Usuários</Heading>
          <Flex align="center" gap={2}>
            <Text>Baixar Tabela de Resultados</Text>
            {isDownloading ? (
              <Spinner size="md" />
            ) : (
              <DownloadAllButton onClick={handleDownloadAllExcel} />
            )}
          </Flex>
        </Flex>

        <Box 
          bg="white" 
          borderRadius="md" 
          shadow="sm"
          overflowX="auto"
          w="100%"
        >
          <UserTable users={users} onDownloadExcel={handleDownloadExcel} />
        </Box>
      </VStack>

      <CustomModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Respostas do Usuário"
        body={<UserResponsesTable responses={userResponses} />}
      />
    </Box>
  )
}
