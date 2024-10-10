import { useState, useMemo } from 'react'
import { AgGridReact } from 'ag-grid-react'
import { ColDef } from 'ag-grid-community'
import { IconButton } from '@chakra-ui/react'
import { PiArrowFatLineDown, PiTrash } from 'react-icons/pi'
import { User } from '../interface/user'
import '@ag-grid-enterprise/all-modules'
import 'ag-grid-community/styles/ag-grid.css'
import 'ag-grid-community/styles/ag-theme-alpine.css'
import { deleteUser } from '../../../api/api'

const DownloadButton = ({ onClick }: { onClick: () => void }) => (
  <IconButton
    aria-label="Download user scores"
    icon={<PiArrowFatLineDown />}
    onClick={onClick}
    size={'sm'}
    background={'none'}
  />
)

const DeleteButton = ({ onClick }: { onClick: () => void }) => (
  <IconButton
    aria-label="Delete user"
    icon={<PiTrash />}
    onClick={onClick}
    size={'sm'}
    background={'none'}
  />
)

const UserTable = ({
  users,
  onDownloadExcel
}: {
  users: User[]
  onDownloadExcel: (userId: number) => void
}) => {
  const [gridApi, setGridApi] = useState<any>(null)
  const [gridColumnApi, setGridColumnApi] = useState<any>(null)
  const [userList, setUserList] = useState<User[]>(users)

  const handleDeleteUser = async (userId: number) => {
    await deleteUser(userId)
    setUserList(prevUsers => prevUsers.filter(user => user.id !== userId))
  }

  const CustomButtonComponent = (params: any) => {
    const userId = params.data.id
    return <DownloadButton onClick={() => onDownloadExcel(userId)} />
  }

  const CustomDeleteButtonComponent = (params: any) => {
    const userId = params.data.id
    return <DeleteButton onClick={() => handleDeleteUser(userId)} />
  }

  const columnDefs: ColDef<User>[] = useMemo(
    () => [
      { headerName: 'Nome', field: 'nomeCompleto', filter: true },
      { headerName: 'Função', field: 'funcao', filter: true },
      { headerName: 'Área de Trabalho', field: 'areaTrabalho', filter: true },
      {
        headerName: 'Baixar Planilha Individual',
        field: 'planilhaButton',
        cellRenderer: CustomButtonComponent
      },
      {
        headerName: 'Deletar Usuário',
        field: 'deleteButton',
        cellRenderer: CustomDeleteButtonComponent
      }
    ],
    [onDownloadExcel]
  )

  const onGridReady = (params: any) => {
    setGridApi(params.api)
    setGridColumnApi(params.columnApi)
  }

  return (
    <div className="ag-theme-alpine" style={{ height: 600, width: '100%' }}>
      <AgGridReact<User>
        rowData={userList}
        columnDefs={columnDefs}
        pagination={true}
        paginationPageSize={10}
        onGridReady={onGridReady}
      />
    </div>
  )
}

export default UserTable
