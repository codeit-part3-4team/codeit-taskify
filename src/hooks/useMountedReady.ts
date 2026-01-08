import { useEffect, useState } from 'react';

export function useMountedReady() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    requestAnimationFrame(() => {
      setReady(true);
    });
  }, []);

  return ready;
}