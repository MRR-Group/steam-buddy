import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { Game } from './Game';

describe('Game', () => {
  it('should add alt to the cover images', () => {
    render(
      <Game 
        game_cover='/example.png'
        game_name='WarThunder'
      />
    );

    expect(screen.getByAltText(`Cover image of the game "WarThunder"`)).toBeInTheDocument();
    expect(screen.getByAltText(`Blurred cover image of the game "WarThunder"`)).toBeInTheDocument();
  });

  it('should add css styles', () => {
    render(
      <Game 
        game_cover='/example.png'
        game_name='WarThunder'
        className='w-10'
        imgClassName='w-20'
        blurredImgClassName='w-30'

      />
    );

    expect(screen.getByAltText(`Cover image of the game "WarThunder"`).parentElement?.parentElement).toHaveClass("w-10");
    expect(screen.getByAltText(`Cover image of the game "WarThunder"`)).toHaveClass("w-20");
    expect(screen.getByAltText(`Blurred cover image of the game "WarThunder"`)).toHaveClass("w-30");
  });
});
