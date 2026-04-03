import { useState, useEffect } from 'react';

export default function useLocalStorageState(initialState, key) {
  const [state, setState] = useState(() => {
    const stored = localStorage.getItem(key);

    if (!stored) {
      return typeof initialState === 'function' ? initialState() : initialState;
    }

    return JSON.parse(stored);
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(state));
  }, [state, key]);

  return [state, setState];
}
