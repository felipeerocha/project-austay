import { useState, useEffect, useCallback } from "react";
import api from "../../../../../services/api";
import type { Pet } from '../../../types'


export function usePets() {
  const [pets, setPets] = useState<Pet[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchPets = useCallback(async () => {
    setIsLoading(true);

    try {
      await new Promise(resolve => setTimeout(resolve, 500)); 

      const response = await api.get<Pet[]>("/pets/");
      setPets(response.data);
      setError(null);
      
    } catch (err) {
      console.error(err);
      setError("Não foi possível carregar os pets.");
      
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPets();
  }, [fetchPets]);

  return { pets, isLoading, error, refetchPets: fetchPets };
}
