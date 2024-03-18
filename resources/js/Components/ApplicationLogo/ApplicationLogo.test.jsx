import { render, screen } from '@testing-library/react';
import { expect } from 'vitest';

import { ApplicationLogo } from './ApplicationLogo';

describe('ApplicationLogo', () => {
  it('should render application logo', () => {
    render(<ApplicationLogo />);

    expect(screen.getByRole('img')).toBeInTheDocument();
  });

  it('should accept svg props', () => {
    render(<ApplicationLogo width="100" height="100" fill="red" />);

    expect(screen.getByRole('img')).toHaveAttribute('width', '100');
    expect(screen.getByRole('img')).toHaveAttribute('height', '100');
    expect(screen.getByRole('img')).toHaveAttribute('fill', 'red');
  });
});
