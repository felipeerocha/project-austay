// EXEMPLO

import { useState, useCallback } from "react";

export function useExample() {
  const [isSomething, setIsSomething] = useState(false);

  const toggle = useCallback(() => setIsSomething((prev) => !prev), []);

  return { isSomething, toggle };
}