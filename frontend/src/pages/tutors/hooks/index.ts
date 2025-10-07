import { useState, useEffect } from "react";
import api from "../../../services/api";
import type { Tutor } from "../types";

export function useTutors() {
  const [tutors, setTutors] = useState<Tutor[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchTutors = async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      await new Promise(resolve => setTimeout(resolve, 500)); 

      const response = await api.get<Tutor[]>("/tutors/"); 
      
      const tutorsWithPets = await Promise.all(
        response.data.map(async (tutor) => {
          try {
            const petsResponse = await api.get(`/tutors/${tutor.id}/pets`);
            return {
              ...tutor,
              pets: petsResponse.data || []
            };
          } catch (petsErr) {
            console.warn(`Erro ao buscar pets do tutor ${tutor.id}:`, petsErr);
            return {
              ...tutor,
              pets: []
            };
          }
        })
      );
      
      setTutors(tutorsWithPets);
    } catch (err) {
      setError("Não foi possível carregar os tutores.");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTutors();
  }, []); 
  
  return { tutors, isLoading, error, refetch: fetchTutors };
}