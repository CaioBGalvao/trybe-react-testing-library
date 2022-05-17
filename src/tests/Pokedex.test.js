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

  // it('Testa se a Pokédex tem os botões de filtro.', () => {
  //   renderWithRouter(<App />);
  //   const allBottons = [
  //     /all/i,
  //     /electric/i,
  //     /fire/i,
  //     /bug/i,
  //     /poison/i,
  //     /psychic/i,
  //     /normal/i,
  //     /dragon/i,
  //   ];
  //   const allTypes = [
  //     /electric/i,
  //     /electric/i,
  //     /fire/i,
  //     /bug/i,
  //     /poison/i,
  //     /psychic/i,
  //     /normal/i,
  //     /dragon/i,
  //   ];
  //   allBottons.forEach((type, index) => {
  //     const allButtons = screen.getByRole('button', { name: type });
  //     expect(allButtons).toBeInTheDocument();
  //     userEvent.click(allButtons);
  //     const pkmnType = screen.getByTestId('pokemon-type');
  //     console.log(pkmnType);
  //     expect(pkmnType).stringMatching(allTypes[index]);
  //   });
  // });
  it('Testa se a Pokédex contém um botão para resetar o filtro', () => {
    renderWithRouter(<App />);
    const resetButton = screen.getByRole('button', { name: /all/i });
    expect(resetButton).toBeInTheDocument();
    expect(resetButton.name).toBe(/all/i);
  });
});
