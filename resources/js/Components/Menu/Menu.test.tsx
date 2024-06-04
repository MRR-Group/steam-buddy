import { render, screen } from '@testing-library/react';
import { afterAll, afterEach, describe, expect, it, vitest } from 'vitest';

import { Menu, MenuItem } from './Menu';

describe('MobileMenu', () => {
  const items: MenuItem[] = [
    ["test", "test/1"],
    ["test 1", "test/2"],
    ["test 2", "test/3"],
  ];

  const matchMediaSpy = vitest.spyOn(window, 'matchMedia');

  afterEach(() => { matchMediaSpy.mockClear(); });
  afterAll(() => { matchMediaSpy.mockRestore(); });

  const mockMediaQuery = (value: boolean) => matchMediaSpy
    .mockReturnValue({ 
      matches: value, 
      addEventListener: () => {},
      removeEventListener: () => {},
    } as unknown as MediaQueryList);


  it('should render mobile version on small screen', () => {
    mockMediaQuery(false);
    render(<Menu items={items} />);

    expect(screen.getByRole('button')).toBeDefined();
    expect(screen.getByText('test')).not.toBeVisible();
  });

  it('should render pc version on big screen', () => {
    mockMediaQuery(true);
    render(<Menu items={items} />);

    expect(screen.queryByRole('button')).toBeNull();
    expect(screen.getByText('test')).toBeVisible();
  });
});
