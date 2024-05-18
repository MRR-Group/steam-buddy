import { useEffect } from 'react';

// cleanupFunction is not used within the effect; it's used only during unmounting of the component.
// Adding it to the deps array might cause the component's state to loop.
/* eslint-disable react-hooks/exhaustive-deps */
export const useCleanup = (cleanupFunction) => {
  useEffect(() => {
    return cleanupFunction;
  }, []);
};
