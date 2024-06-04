import { fireEvent, render, screen } from '@testing-library/react';
import { afterAll, beforeAll, beforeEach, describe, expect, it } from 'vitest';

import { MenuMobile } from './MenuMobile';
import { MenuItem } from './Menu';
import { MockTimeline, mockTimeline } from '../../Hooks/Animation/GsapTimelineMock';

describe('MobileMenu', () => {
  let tl: MockTimeline
  const items: MenuItem[] = [
    ["test", "test/1"],
    ["test 1", "test/2"],
    ["test 2", "test/3"],
  ];

  beforeAll(() => {
    tl = mockTimeline();
  });

  beforeEach(() => {
    tl.mockClear();
  });

  afterAll(() => {
    tl.mockRestore();
  });

  it('should render hidden', () => {
    render(<MenuMobile items={items} />);

    expect(screen.getByRole('button')).toBeDefined();
    expect(screen.getByText('test')).not.toBeVisible();
    expect(screen.getByText('test')).not.toBeVisible();
    expect(screen.getByText('test 1')).not.toBeVisible();
    expect(screen.getByText('test 2')).not.toBeVisible();
  });

  it('should toggle visibility when the menu button is clicked', () => {
    render(<MenuMobile items={items} />);

    expect(screen.getByText('test')).not.toBeVisible();
    expect(screen.getByText('test 1')).not.toBeVisible();
    expect(screen.getByText('test 2')).not.toBeVisible();
    
    fireEvent.click(screen.getByRole('button'));

    expect(screen.getByText('test')).toBeVisible();
    expect(screen.getByText('test 1')).toBeVisible();
    expect(screen.getByText('test 2')).toBeVisible();

    fireEvent.click(screen.getByRole('button'));

    expect(screen.getByText('test')).not.toBeVisible();
    expect(screen.getByText('test 1')).not.toBeVisible();
    expect(screen.getByText('test 2')).not.toBeVisible();
  });
});
