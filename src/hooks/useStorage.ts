import { useCallback, useState } from "react";

const useStorage = (key: string, value: string) => {
  const [storedValues, setStoredValue] = useState(() => {
    let storageValue;

    try {
      storageValue = sessionStorage.getItem(key);

      return storageValue ? JSON.parse(storageValue) : value;
    } catch (error) {
      console.error(error);

      return storageValue;
    }
  });

  const setStorageValue = useCallback(
    (value: string) => {
      try {
        setStoredValue(value);
        sessionStorage.setItem(key, JSON.stringify(value));
      } catch (error) {
        console.error(error);
      }
    },
    [key]
  );

  return [storedValues, setStorageValue];
};

export default useStorage;
