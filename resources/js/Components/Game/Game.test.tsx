import { render, screen } from '@testing-library/react';
import { MockInstance, afterAll, beforeAll, describe, expect, it, vitest } from 'vitest';

import { Game } from './Game';
import * as i18n from 'laravel-react-i18n';
import ContextInterface from 'laravel-react-i18n/dist/interfaces/context';

const translations: Record<string, string> = {
  "Cover image of the game": "Cover image of the :game game",
  "Blurred cover image of the game": "Blurred cover image of the :game game",
}

describe('Game', () => {
  let spy: MockInstance<[], ContextInterface<string>>;

  beforeAll(() => {
    spy = vitest.spyOn(i18n, "useLaravelReactI18n").mockImplementation((() => ({
      t: (name: string, args: Record<string, string> = {}) => {
        let text = translations[name.replace("app.", "")] ?? "";
        Object.keys(args).forEach((key) => { text = text.replaceAll(`:${key}`, args[key]) });
      
        return text;
      } 
    } as ContextInterface<string>)));
  })

  afterAll(() => {
    spy.mockRestore();
  })

  it('should add alt to the cover images', () => {
    render(
      <Game 
        game_cover='/example.png'
        game_name='WarThunder'
      />
    );

    expect(screen.getByAltText(`Cover image of the WarThunder game`)).toBeInTheDocument();
    expect(screen.getByAltText(`Blurred cover image of the WarThunder game`)).toBeInTheDocument();
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

    expect(screen.getByAltText(`Cover image of the WarThunder game`).parentElement?.parentElement).toHaveClass("w-10");
    expect(screen.getByAltText(`Cover image of the WarThunder game`)).toHaveClass("w-20");
    expect(screen.getByAltText(`Blurred cover image of the WarThunder game`)).toHaveClass("w-30");
  });
});
