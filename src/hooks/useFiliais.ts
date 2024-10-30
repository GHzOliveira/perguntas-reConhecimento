import { useEffect, useState } from 'react';
import { Filial } from '../types/FormType';
import { fetchAllFiliais } from '../api/api';

export const useFiliais = () => {
  const [filiais, setFiliais] = useState<Filial[]>([]);

  useEffect(() => {
    const loadFiliais = async () => {
      const fetchedFiliais = await fetchAllFiliais();
      setFiliais(fetchedFiliais);
    };

    loadFiliais();
  }, []);

  return filiais;
};