import { useState, useMemo, useCallback } from 'react'
import { AgGridReact } from 'ag-grid-react'
import { ColDef, GridApi, GridReadyEvent } from 'ag-grid-community'
import { IconButton, useToast } from '@chakra-ui/react'
import { PiArrowFatLineDown, PiTrash } from 'react-icons/pi'
import { User } from '../interface/user'
import 'ag-grid-community/styles/ag-grid.css'
import 'ag-grid-community/styles/ag-theme-alpine.css'
import { deleteUser } from '../../../api/api'
import { ColumnApi } from '@ag-grid-enterprise/all-modules'

interface ButtonProps {
  onClick: () => void
  disabled?: boolean
}

const DownloadButton = ({ onClick, disabled }: ButtonProps) => (
  <IconButton
    aria-label="Download user scores"
    icon={<PiArrowFatLineDown />}
    onClick={onClick}
    size="sm"
    background="none"
    isDisabled={disabled}
    _hover={{ bg: 'gray.100' }}
  />
)

const DeleteButton = ({ onClick, disabled }: ButtonProps) => (
  <IconButton
    aria-label="Delete user"
    icon={<PiTrash />}
    onClick={onClick}
    size="sm"
    background="none"
    isDisabled={disabled}
    _hover={{ bg: 'red.100' }}
  />
)

interface UserTableProps {
  users: User[]
  onDownloadExcel: (userId: number) => Promise<void>
}

const UserTable = ({ users, onDownloadExcel }: UserTableProps) => {
  const [, setGridApi] = useState<GridApi | null>(null)
  const [userList, setUserList] = useState<User[]>(users)
  const [loading, setLoading] = useState<boolean>(false)
  const toast = useToast()

  const handleDeleteUser = useCallback(
    async (userId: number) => {
      try {
        setLoading(true)
        await deleteUser(userId)
        setUserList(prevUsers => prevUsers.filter(user => user.id !== userId))
        toast({
          title: 'Usuário deletado com sucesso',
          status: 'success',
          duration: 3000
        })
      } catch (error) {
        toast({
          title: 'Erro ao deletar usuário',
          description: 'Tente novamente mais tarde',
          status: 'error',
          duration: 3000
        })
      } finally {
        setLoading(false)
      }
    },
    [toast]
  )

  const CustomButtonComponent = useCallback(
    ({ data }: { data: User }) => (
      <DownloadButton
        onClick={() => onDownloadExcel(data.id)}
        disabled={loading}
      />
    ),
    [onDownloadExcel, loading]
  )

  const CustomDeleteButtonComponent = useCallback(
    ({ data }: { data: User }) => (
      <DeleteButton
        onClick={() => handleDeleteUser(data.id)}
        disabled={loading}
      />
    ),
    [handleDeleteUser, loading]
  )

  const columnDefs: ColDef<User>[] = useMemo(
    () => [
      {
        headerName: 'Nome',
        field: 'nomeCompleto',
        filter: true,
        sortable: true,
        flex: 2,
        resizable: true
      },
      {
        headerName: 'Função',
        field: 'funcao',
        filter: true,
        sortable: true,
        flex: 1,
        resizable: true
      },
      {
        headerName: 'Área de Trabalho',
        field: 'areaTrabalho',
        filter: true,
        sortable: true,
        flex: 1,
        resizable: true
      },
      {
        headerName: 'Ações',
        field: 'id', // Mudamos para um campo que existe no User
        flex: 1,
        cellRenderer: (params: any) => (
          <div style={{ display: 'flex', gap: '8px' }}>
            <CustomButtonComponent data={params.data} />
            <CustomDeleteButtonComponent data={params.data} />
          </div>
        ),
        sortable: false,
        filter: false,
        resizable: true
      }
    ],
    [CustomButtonComponent, CustomDeleteButtonComponent]
  )

  const onGridReady = useCallback((params: GridReadyEvent) => {
    setGridApi(params.api)
    // Remova a linha que usa columnApi
    params.api.sizeColumnsToFit()
  }, [])

  const defaultColDef = useMemo(
    () => ({
      sortable: true,
      filter: true,
      resizable: true
    }),
    []
  )

  return (
    <div className="ag-theme-alpine" style={{ height: 600, width: '100%' }}>
      <AgGridReact<User>
        rowData={userList}
        columnDefs={columnDefs}
        defaultColDef={defaultColDef}
        pagination={true}
        paginationPageSize={10}
        paginationAutoPageSize={true}
        onGridReady={onGridReady}
        animateRows={true}
        enableCellTextSelection={true}
        suppressMovableColumns={true}
        suppressLoadingOverlay={false}
        rowSelection="multiple"
        cacheQuickFilter={true}
      />
    </div>
  )
}

export default UserTable
