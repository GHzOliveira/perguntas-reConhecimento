import { useState, useEffect } from 'react';

export const useGlobalCompanyFilter = () => {
  const [globalCompanyFilter, setGlobalCompanyFilter] = useState<string | null>(
    localStorage.getItem('globalCompanyFilter')
  );

  useEffect(() => {
    const handleStorageChange = () => {
      setGlobalCompanyFilter(localStorage.getItem('globalCompanyFilter'));
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  return globalCompanyFilter;
};