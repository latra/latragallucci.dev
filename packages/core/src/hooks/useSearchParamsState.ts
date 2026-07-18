import { useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';

/** Persists a single piece of filter state in the URL so filtered views stay deep-linkable. */
export function useSearchParamsState(key: string, defaultValue?: string) {
  const [searchParams, setSearchParams] = useSearchParams();
  const value = searchParams.get(key) ?? defaultValue;

  const setValue = useCallback(
    (next: string | undefined) => {
      setSearchParams((prev) => {
        const updated = new URLSearchParams(prev);
        if (next === undefined || next === '') updated.delete(key);
        else updated.set(key, next);
        return updated;
      });
    },
    [key, setSearchParams],
  );

  return [value, setValue] as const;
}
