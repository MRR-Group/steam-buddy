import { render } from '@testing-library/react';
import { Mock, beforeEach, describe, expect, it, vitest } from 'vitest';
import { useCleanup } from './UseCleanup';

describe('useCleanup', () => {
  let cleanupFunction: Mock;

  beforeEach(() => {
    cleanupFunction = vitest.fn();
  });

  it('should call the cleanup function on unmount', () => {
    const ComponentWithCleanup = () => {
      useCleanup(cleanupFunction);

      return null;
    };

    const { unmount } = render(<ComponentWithCleanup />);
    unmount();

    expect(cleanupFunction).toHaveBeenCalled();
  });
});
