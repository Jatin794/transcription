import { Dispatch, SetStateAction, useEffect, useState } from 'react';

/**
 * Utility hook that creates a state variable based on an `initialValue` prop,
 * and updates it whenever the `initialValue` changes.
 */
export function useStateFromProp<T>(
  initialValue: T,
  extraDependency?: unknown
): [T, Dispatch<SetStateAction<T>>] {
  const [state, setState] = useState<T>(initialValue);
  useEffect(() => {
    // In case `T` is an object-type, do a deep comparison before setting state
    setState((prevState) => (initialValue !== prevState ? initialValue : prevState));
  }, [initialValue, extraDependency]);
  return [state, setState];
}
