import React, { useEffect, useState } from 'react'
import { useParams, Navigate } from 'react-router-dom'
import { CompanyService } from '../api/company/company.api'

interface CompanyProtectedRouteProps {
  children: React.ReactNode
}

const CompanyProtectedRoute: React.FC<CompanyProtectedRouteProps> = ({ children }) => {
  const { companyId } = useParams()
  const [isValidating, setIsValidating] = useState(true)
  const [isValid, setIsValid] = useState(false)

  useEffect(() => {
    const validateCompany = async () => {
      if (companyId) {
        const isValidCompany = await CompanyService.validateCompany(Number(companyId))
        setIsValid(isValidCompany)
      }
      setIsValidating(false)
    }

    validateCompany()
  }, [companyId])

  if (isValidating) {
    return <div>Carregando...</div>
  }

  if (!isValid) {
    return <Navigate to="/" replace />
  }

  return <>{children}</>
}

export default CompanyProtectedRoute