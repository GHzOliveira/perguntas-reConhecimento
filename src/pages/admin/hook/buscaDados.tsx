import { useState, useEffect } from 'react'
import { fetchAllUsers } from '../../../api/api'
import { User } from '../interface/user'

export const useFetchUsers = () => {
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const usersData = await fetchAllUsers()
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
