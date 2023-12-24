import { useMemoizedCallback } from '../hooks/useMemoizedCallback';

/**
 * Utility hook that returns a callback to set a state value.
 * Often useful for event handlers:
 *
 * @example
 * ```tsx
 * const handleShow = useSetState(setVisible, true);
 * return <Button onClick={handleShow} />;
 * ```
 */
export function useSetState<T>(setValue: (value: T) => unknown, value: T) {
  return useMemoizedCallback(() => setValue(value), [setValue, value]);
}
