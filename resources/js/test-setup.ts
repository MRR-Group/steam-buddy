/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */

import '@testing-library/jest-dom';
import { expect, afterEach, vitest, Mock } from 'vitest';
import { cleanup } from '@testing-library/react';
import * as matchers from '@testing-library/jest-dom/matchers';

expect.extend(matchers);

declare global {
  interface Window {
    __routeSpy: Mock<any[], string>;
    __routeCurrentSpy: Mock<[], boolean>;
    route: (...args: any[]) => string | { current: () => string | boolean };
  }
}

/** Mocked version of the Ziggy's route function */
window.__routeSpy = vitest.fn(() => '/');
window.__routeCurrentSpy = vitest.fn(() => false);
window.route = ((...args: any[]) => {
  if (args.length > 0) {
    return window.__routeSpy(...args);
  }

  return {
    current: window.__routeCurrentSpy,
  };
}) as any;

afterEach(() => {
  cleanup();
  window.__routeSpy = vitest.fn(() => '/');
  window.__routeCurrentSpy = vitest.fn(() => false);
});
