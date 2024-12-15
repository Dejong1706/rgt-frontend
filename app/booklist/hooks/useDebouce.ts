import { useEffect, useState } from "react";

export const useDebounce = (value: string) => {
  const [debounceValue, setDebounceValue] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebounceValue(value);
    }, 500);
    return () => {
      clearTimeout(timer);
    };
  }, [value]);

  return debounceValue;
};
