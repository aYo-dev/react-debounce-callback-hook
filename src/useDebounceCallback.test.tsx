import { act, renderHook } from '@testing-library/react';
import { useState } from 'react';

import { useDebounceCallback } from './useDebounceCallback';

// Mock the debounce function from lodash
jest.mock('lodash', () => ({
  // eslint-disable-next-line @typescript-eslint/ban-types
  debounce: jest.fn((fn: Function, delay: number) => {
    // Return a function that directly calls the callback after the delay
    return <T,>(...args: T[]) => {
      setTimeout(() => {
        fn(...args);
      }, delay);
    };
  }),
}));

describe('useDebounceCallback', () => {
  let callback: jest.Mock;

  beforeEach(() => {
    callback = jest.fn();
  });

  it('should debounce the callback and call it after the delay', async () => {
    const { result } = renderHook(() => useDebounceCallback(callback, 500));

    // Invoke debounced callback multiple times within the delay
    act(() => {
      result.current('event1');
      result.current('event2');
      result.current('event3');
    });

    // Expect the callback not to be called immediately
    expect(callback).not.toHaveBeenCalled();

    // Wait for the debounce delay to pass
    await new Promise((resolve) => setTimeout(resolve, 600));

    // After delay, the callback should be called once
    expect(callback).toHaveBeenCalledTimes(1);
    expect(callback).toHaveBeenCalledWith('event3');
  });

  it('should respect the custom delay', async () => {
    const { result } = renderHook(() => useDebounceCallback(callback, 1000));

    act(() => {
      result.current('event1');
      result.current('event2');
    });

    expect(callback).not.toHaveBeenCalled();

    // Wait for the custom delay to pass
    await new Promise((resolve) => setTimeout(resolve, 1000));

    expect(callback).toHaveBeenCalledTimes(1);
    expect(callback).toHaveBeenCalledWith('event2');
  });

  it('should call the latest callback after delay', async () => {
    const { result } = renderHook(() => {
      const [cb, setCb] = useState(() => callback);
      const debouncedCallback = useDebounceCallback(cb, 500);

      return { debouncedCallback, setCb };
    });

    act(() => {
      result.current.debouncedCallback('event1');
    });

    // Expect the callback not to be called immediately
    expect(callback).not.toHaveBeenCalled();

    // Change the callback mid-way before the delay
    const newCallback = jest.fn();
    result.current.setCb(() => newCallback);

    act(() => {
      result.current.debouncedCallback('event2');
    });

    // Wait for the debounce delay to pass
    await new Promise((resolve) => setTimeout(resolve, 600));

    // After delay, the latest callback should be called
    expect(newCallback).toHaveBeenCalledTimes(1);
    expect(newCallback).toHaveBeenCalledWith('event2');
    expect(callback).not.toHaveBeenCalled();
  });

  it('should not call callback after component unmounts', async () => {
    const { result, unmount } = renderHook(() =>
      useDebounceCallback(callback, 500),
    );

    act(() => {
      result.current('event1');
    });

    unmount();

    // Wait for the debounce delay to pass
    await new Promise((resolve) => setTimeout(resolve, 600));

    // Callback should not be called after unmount
    expect(callback).not.toHaveBeenCalled();
  });
});
