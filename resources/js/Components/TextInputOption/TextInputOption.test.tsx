import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { TextInputOption } from './TextInputOption';

describe('TextInputOption', () => {
  it('should render', () => {
    render(
      <TextInputOption
        href="/test"
        left="left text"
        linkText="link text"
        right="right text"
      />,
    );

    expect(screen.getByText('left text')).toBeInTheDocument();
    expect(screen.getByText('link text')).toBeInTheDocument();
    expect(screen.getByText('right text')).toBeInTheDocument();
  });

  it('should render link', () => {
    render(
      <TextInputOption
        href="/test"
        left="left text"
        linkText="link text"
        right="right text"
      />,
    );

    expect(screen.getByText('link text')).toHaveAttribute('href', '/test');
  });
});
