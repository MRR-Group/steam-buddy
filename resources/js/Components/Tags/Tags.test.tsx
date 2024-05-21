import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vitest } from 'vitest';

import { TagData, Tags } from './Tags';

describe('Tags', () => {
  const tags: TagData[] = [
    { name: "tag1", games: 10},
    { name: "tag2", games: 20},
    { name: "tag3", games: 30},
    { name: "tag4", games: 40},
    { name: "tag5", games: 50},
    { name: "tag6", games: 60},
  ];
  
  it('should render tags', () => {
    render(
      <Tags
        selected={["tag1", "tag3"]}
        tags={tags} 
      />
    );

    expect(screen.getByText('tag1')).toBeInTheDocument();
    expect(screen.getByText('tag2')).toBeInTheDocument();
    expect(screen.getByText('tag3')).toBeInTheDocument();
    expect(screen.getByText('tag4')).toBeInTheDocument();
    expect(screen.getByText('tag5')).toBeInTheDocument();
    expect(screen.getByText('tag6')).toBeInTheDocument();
  });

  it('should display how many games have a given tag assigned', () => {
    render(
      <Tags
        selected={["tag1", "tag3"]}
        tags={tags} 
      />
    );

    expect(screen.getByTitle('10 games')).toBeInTheDocument();
    expect(screen.getByTitle('20 games')).toBeInTheDocument();
    expect(screen.getByTitle('30 games')).toBeInTheDocument();
    expect(screen.getByTitle('40 games')).toBeInTheDocument();
    expect(screen.getByTitle('50 games')).toBeInTheDocument();
    expect(screen.getByTitle('60 games')).toBeInTheDocument();
  });

  it('should make selected tags active', () => {
    render(
      <Tags
        selected={["tag1", "tag3"]}
        tags={tags} 
      />
    );

    expect(screen.getByText('tag1')).not.toHaveClass('text-secondary-500');
    expect(screen.getByText('tag2')).toHaveClass('text-secondary-500');
    expect(screen.getByText('tag3')).not.toHaveClass('text-secondary-500');
    expect(screen.getByText('tag4')).toHaveClass('text-secondary-500');
    expect(screen.getByText('tag5')).toHaveClass('text-secondary-500');
    expect(screen.getByText('tag6')).toHaveClass('text-secondary-500');
  });

  it('should call onSelect method when user is clicking on inactive tag', () => {
    const onSelect = vitest.fn();

    render(
      <Tags
        selected={["tag1", "tag3"]}
        tags={tags}
        onSelect={onSelect}
      />
    );

    fireEvent.click(screen.getByText("tag2"));

    expect(onSelect).toBeCalledTimes(1);
    expect(onSelect).toBeCalledWith("tag2");
  });

  it('should call onUnselect method when user is clicking on active tag', () => {
    const onUnselect = vitest.fn();

    render(
      <Tags
        selected={["tag1", "tag3"]}
        tags={tags}
        onUnselect={onUnselect}
      />
    );

    fireEvent.click(screen.getByText("tag1"));

    expect(onUnselect).toBeCalledTimes(1);
    expect(onUnselect).toBeCalledWith("tag1");
  });
});
