import debounce from 'lodash/debounce';
import { useEffect, useMemo, useRef } from 'react';

export function useDebounceCallback<A>(
  callback: (e: A) => void,
  delay?: number,
): (...args: [A]) => void;
export function useDebounceCallback<A, B>(
  callback: (a: A, b: B) => void,
  delay?: number,
): (...args: [A, B]) => void;
export function useDebounceCallback<A, B>(
  callback: (a: A, b: B) => void,
  delay = 500,
) {
  const ref = useRef<((a: A, b: B) => void) | undefined>(null);

  useEffect(() => {
    ref.current = callback;
  }, [callback]);

  const debouncedCallback = useMemo(() => {
    const func = (...args: unknown[]) => {
      ref.current?.(...(args as [A, B]));
    };

    return debounce(func, delay);
  }, [delay]);

  // Cancel on unmount
  useEffect(() => () => debouncedCallback.cancel(), [debouncedCallback]);

  return debouncedCallback;
}