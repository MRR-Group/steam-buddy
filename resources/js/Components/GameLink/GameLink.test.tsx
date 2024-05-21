import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { GameLink } from './GameLink';

describe('GameLink', () => {
  it('should add aria label for link', () => {
    render(
      <GameLink 
        game_id={0}
        game_cover='/example.png'
        game_name='WarThunder'
        user_id={1}
        user_name='Amon'
      />
    );

    expect(screen.getByLabelText(`Navigate to Amon statistics for the game "WarThunder"`)).toBeInTheDocument();
  });

  it('should add alt to the cover image', () => {
    render(
      <GameLink 
        game_id={0}
        game_cover='/example.png'
        game_name='WarThunder'
        user_id={0}
        user_name='Amon'
      />
    );

    expect(screen.getByAltText(`Cover image of the game "WarThunder"`)).toBeInTheDocument();
  });

  it('should add link to user statists for the game', () => {
    render(
      <GameLink 
        game_id={0}
        game_cover='/example.png'
        game_name='WarThunder'
        user_id={0}
        user_name='Amon'
      />
    );

    expect(screen.getByLabelText(`Navigate to Amon statistics for the game "WarThunder"`)).toHaveAttribute('href', route("profile.games.show", [ 1, 0 ]));
  });

  it("should accept inertiajs's Link props", () => {
    render(
      <GameLink 
        game_id={0}
        game_cover='/example.png'
        game_name='WarThunder'
        user_id={0}
        user_name='Amon'
        as='div'
      />
    );

    expect(screen.getByLabelText(`Navigate to Amon statistics for the game "WarThunder"`).tagName).toBe("DIV");
  });
});
