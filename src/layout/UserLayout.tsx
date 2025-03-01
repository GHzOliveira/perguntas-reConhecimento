import React from 'react'
import { Box } from '@chakra-ui/react'
import { Header } from '../components/header/Header'
import { AdminHeader } from '../pages/admin/components/Headeradmin'
import useAdminStore from '../store/useAdminStore'

interface UserLayoutProps {
  children: React.ReactNode
}

export const UserLayout: React.FC<UserLayoutProps> = ({ children }) => {
  const isAdmin = useAdminStore((state) => state.isLoggedIn)

  return (
    <Box>
      {isAdmin ? <AdminHeader /> : <Header />}
      <Box as="main">{children}</Box>
    </Box>
  )
}