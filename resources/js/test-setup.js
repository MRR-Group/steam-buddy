import '@testing-library/jest-dom';
import { expect, afterEach, vitest } from 'vitest';
import { cleanup } from '@testing-library/react';
import * as matchers from '@testing-library/jest-dom/matchers';

expect.extend(matchers);

/** Mocked version of the Ziggy's route function */
window.__routeSpy = vitest.fn(() => '/');
window.__routeCurrentSpy = vitest.fn(() => false);
window.route = (...args) => {
  if (args.length > 0) {
    return window.__routeSpy(...args);
  }

  return {
    current: window.__routeCurrentSpy,
  };
};

afterEach(() => {
  cleanup();
  window.__routeSpy = vitest.fn(() => '/');
  window.__routeCurrentSpy = vitest.fn(() => false);
});
