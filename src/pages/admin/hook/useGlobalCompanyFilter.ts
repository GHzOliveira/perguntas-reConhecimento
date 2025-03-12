import { useState, useEffect } from 'react'

export const useGlobalCompanyFilter = (): number | null => {
  const [globalCompanyFilter, setGlobalCompanyFilter] = useState<number | null>(
    () => {
      const storedValue = localStorage.getItem('globalCompanyFilter')
      return storedValue ? parseInt(storedValue, 10) : null
    }
  )

  useEffect(() => {
    const handleStorageChange = () => {
      const storedValue = localStorage.getItem('globalCompanyFilter')
      setGlobalCompanyFilter(storedValue ? parseInt(storedValue, 10) : null)
    }

    window.addEventListener('storage', handleStorageChange)
    return () => window.removeEventListener('storage', handleStorageChange)
  }, [])

  return globalCompanyFilter
}
