import { render, screen } from '@testing-library/react';
import { MockInstance, afterAll, beforeAll, describe, expect, it, vitest } from 'vitest';

import { GameLink } from './GameLink';
import * as i18n from 'laravel-react-i18n';
import ContextInterface from 'laravel-react-i18n/dist/interfaces/context';

const translations: Record<string, string> = {
  "Navigate to user statistics for the game": "Navigate to :user statistics for the game \":game\"",
}

describe('GameLink', () => {
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
