import { Table, Thead, Tr, Th, Tbody, Td } from '@chakra-ui/react'
import { UserResponse } from '../interface/user'

export const UserResponsesTable = ({
  responses
}: {
  responses: UserResponse[]
}) => {
  return (
    <Table variant="simple" size="xl">
      <Thead>
        <Tr>
          <Th>Pergunta</Th>
          <Th>Resposta</Th>
        </Tr>
      </Thead>
      <Tbody>
        {responses.map(response => (
          <Tr key={response.id}>
            <Td>Pergunta {response.question}</Td>
            <Td>{response.score}</Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
  )
}
