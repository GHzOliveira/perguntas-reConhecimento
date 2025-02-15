import { useState, useEffect } from 'react'
import { User } from '../interface/user'
import { UsersService } from '../../../api/users/users.api'

export const useFetchUsers = () => {
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const usersData = await UsersService.fetchAll()
        setUsers(usersData)
      } catch (error) {
        console.error('Failed to fetch users', error)
      } finally {
        setLoading(false)
      }
    }

    fetchUsers()
  }, [])

  return { users, loading }
}
