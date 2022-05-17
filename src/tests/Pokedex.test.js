import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../helpers/renderWithRouter';
import App from '../App';

describe('Requisito 5', () => {
  it('Testa se a página contém um heading h2 com o texto Encountered pokémons', () => {
    renderWithRouter(<App />);
    const appTitle = screen.getByRole('heading', { name: /encountered pokémons/i });
    expect(appTitle).toBeInTheDocument();
  });

  it(`Testa se é exibido o próximo pokémon da lista quando o
  botão Próximo pokémon é clicado.`, () => {
    renderWithRouter(<App />);
    const pokeArray = [
      /pikachu/i,
      /charmander/i,
      /caterpie/i,
      /ekans/i,
      /alakazam/i,
      /mew/i,
      /rapidash/i,
      /snorlax/i,
      /dragonair/i,
      /pikachu/i,
    ];
    const nextpkmn = screen.getByRole('button', { name: /próximo pokémon/i });
    pokeArray.forEach((_pkmns, index) => {
      const pkmnNameIdTest = screen.getByTestId('pokemon-name');
      const pkmnName = screen.getByText(pokeArray[index]);
      expect(pkmnName).toBeInTheDocument();
      expect(pkmnNameIdTest).toBeInTheDocument();
      expect(pkmnNameIdTest).toBe(pkmnName);
      userEvent.click(nextpkmn);
    });
  });

  it('Testa se a Pokédex tem os botões de filtro.', () => {
    renderWithRouter(<App />);
    const buttonAll = screen.getByRole('button', { name: /all/i });
    expect(buttonAll).toBeInTheDocument();
    const filtersButtons = screen.getAllByTestId('pokemon-type-button');
    expect(filtersButtons[0]).toBeInTheDocument();

    userEvent.click(filtersButtons[2]);

    expect(filtersButtons[2]).toHaveTextContent('Bug');
    let pkmnName = screen.getByText('Caterpie');
    let pkmnType = screen.getAllByText('Bug');
    let pkmnWeight = screen.getByText('Average weight: 2.9 kg');
    expect(pkmnName).toBeInTheDocument();
    expect(pkmnType[0]).toBeInTheDocument();
    expect(pkmnWeight).toBeInTheDocument();

    userEvent.click(filtersButtons[4]);
    expect(filtersButtons[4]).toHaveTextContent('Psychic');
    pkmnName = screen.getByText('Alakazam');
    pkmnType = screen.getAllByText('Psychic');
    pkmnWeight = screen.getByText('Average weight: 48.0 kg');
    expect(pkmnName).toBeInTheDocument();
    expect(pkmnType[0]).toBeInTheDocument();
    expect(pkmnWeight).toBeInTheDocument();
  });
  it('Testa se a Pokédex contém um botão para resetar o filtro', () => {
    renderWithRouter(<App />);
    const resetButton = screen.getByRole('button', { name: /all/i });
    expect(resetButton).toBeInTheDocument();
    userEvent.click(resetButton);

    const fistPkmn = screen.getByText('Pikachu');
    const secondPkmn = screen.getAllByText('Electric');
    expect(fistPkmn).toBeInTheDocument();
    expect(secondPkmn[0]).toBeInTheDocument();
  });
});
