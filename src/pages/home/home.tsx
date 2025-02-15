import { useState } from 'react'
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
  useDisclosure
} from '@chakra-ui/react'
import { useForm } from 'react-hook-form'
import Botao from '../../components/button/Button'
import EditableText from '../../components/editableText/Text'
import { PiTrash } from 'react-icons/pi'
import CustomModal from '../../components/modal/Modal'
import { FilialService } from '../../api/filiais/filiais.api'

interface Filial {
  id?: number
  filial: string
  quantidadeColaboradores: number
  companyId?: number
  linkUnico?: string
}

const Home = () => {
  const { register, handleSubmit, reset } = useForm()
  const [filiais, setFiliais] = useState<Filial[]>([])
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [linkToShare, setLinkToShare] = useState<string>('')
  const [tempFiliais, setTempFiliais] = useState<
    Omit<Filial, 'id' | 'companyId' | 'linkUnico'>[]
  >([])

  const onSubmit = async (data: any) => {
    if (!data.filial.trim() || !data.quantidadeColaboradores) {
      return
    }

    const newFilial = {
      filial: data.filial,
      quantidadeColaboradores: Number(data.quantidadeColaboradores)
    }

    setTempFiliais([...tempFiliais, newFilial])
    reset()
  }

  const handleGenerateLink = async () => {
    try {
      const response = await FilialService.createMany({ filiais: tempFiliais })
      setFiliais(response.filiais)
      setLinkToShare(response.linkUnico)
      setTempFiliais([])
      onOpen()
    } catch (error) {
      console.error('Erro ao criar filiais:', error)
    }
  }

  const handleCopyLink = () => {
    navigator.clipboard.writeText(linkToShare)
  }

  return (
    <Flex direction="column" p={5} maxWidth="50rem" mx="auto">
      <EditableText />
      <Flex
        as="form"
        onSubmit={handleSubmit(onSubmit)}
        gap={5}
        align={'center'}
        direction={'column'}
      >
        <div style={{ display: 'flex', flexDirection: 'row', gap: '1rem' }}>
          <FormControl>
            <FormLabel htmlFor="filial">Filial</FormLabel>
            <Input id="filial" placeholder="Filial" {...register('filial')} />
          </FormControl>
          <FormControl>
            <FormLabel htmlFor="quantidade">Qntd. colaboradores</FormLabel>
            <Input
              id="quantidade"
              placeholder="Qntd. colaboradores"
              type="number"
              {...register('quantidadeColaboradores')}
            />
          </FormControl>
        </div>
        <div>
          <Button type="submit" bg={'#1F7CBF'} color={'white'} paddingX={20}>
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
          {tempFiliais.map((filial, index) => (
            <Tr key={index}>
              <Td>{filial.filial}</Td>
              <Td isNumeric>{filial.quantidadeColaboradores}</Td>
              <Td>
                <Button
                  onClick={() => {
                    const newTempFiliais = [...tempFiliais]
                    newTempFiliais.splice(index, 1)
                    setTempFiliais(newTempFiliais)
                  }}
                  variant={'ghost'}
                >
                  <PiTrash />
                </Button>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
      <Botao
        mt={4}
        bg={'#1F7CBF'}
        onClick={handleGenerateLink}
        isDisabled={tempFiliais.length === 0}
      >
        Gerar Link
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
              Recomendamos que a pesquisa seja respondida por 100% deles!
              <br />
              <br />
              Abaixo está o link para a pesquisa. Para convidar seus
              colaboradores, basta copiar o link abaixo e enviar para todos
              através do seu email ou whatsapp.
              <br />
              <br />
              Como o link é o mesmo para todos de sua obra, você pode criar um
              grupo em seu email ou whatsapp e enviar o link a todos de uma só
              vez. Ou ainda, pode pedir ajuda para outras pessoas da equipe para
              dispará-lo.
            </p>
            <Input value={linkToShare} isReadOnly mt={4} />
            <Button
              mt={4}
              onClick={handleCopyLink}
              bg={'#1F7CBF'}
              color={'white'}
              w={'full'}
            >
              Clique para copiar Link
            </Button>
          </>
        }
      />
    </Flex>
  )
}

export default Home
