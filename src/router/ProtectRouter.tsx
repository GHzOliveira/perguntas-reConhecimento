// Importações necessárias
import { ReactNode } from 'react'
import { Navigate } from 'react-router-dom'
import useAdminStore from '../store/useAdminStore'

interface ProtectedRouteProps {
  children: ReactNode
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { isLoggedIn, isAdmin } = useAdminStore()

  if (!isLoggedIn || !isAdmin) {
    return <Navigate to="/" replace />
  }
  return <>{children}</>
}

export default ProtectedRoute
