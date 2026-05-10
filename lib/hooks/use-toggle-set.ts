import { useCallback, useState } from 'react';

export function useToggleSet<T>() {
  const [set, setSet] = useState<Set<T>>(new Set());

  const toggle = useCallback((item: T) => {
    setSet(prev => {
      const next = new Set(prev);
      if (next.has(item)) {
        next.delete(item);
      } else {
        next.add(item);
      }
      return next;
    });
  }, []);

  return [set, toggle] as const;
}
