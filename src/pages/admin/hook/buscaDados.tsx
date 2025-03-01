import { useState, useEffect } from 'react'
import { User } from '../interface/user'
import { UsersService } from '../../../api/users/users.api'

export const useFetchUsers = (companyFilter?: string | null) => {
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        let usersData;
        if (companyFilter) {
          // Busca usuários apenas da empresa selecionada
          usersData = await UsersService.fetchByCompany(companyFilter);
        } else {
          // Busca todos os usuários
          usersData = await UsersService.fetchAll();
        }
        setUsers(usersData);
      } catch (error) {
        console.error('Failed to fetch users', error)
      } finally {
        setLoading(false)
      }
    }

    fetchUsers()
  }, [companyFilter])

  return { users, loading }
}
