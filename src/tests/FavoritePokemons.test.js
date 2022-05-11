import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../helpers/renderWithRouter';
import App from '../App';

describe('Requisito 3', () => {
  it(`Testa se é exibida na tela a mensagem No favorite
  pokemon found, caso a pessoa não tenha pokémons favoritos.`, () => {
    renderWithRouter(<App />);
    const linkFav = screen.getByRole('link', { name: /Favorite Pokémons/i });
    userEvent.click(linkFav);
    const notFoundText = screen.getByText('No favorite pokemon found');
    expect(notFoundText).toBeInTheDocument();
  });
  it('Testa se são exibidos todos os cards de pokémons favoritados.', () => {
    renderWithRouter(<App />);
    const moreDetails = screen.getByRole('link', { name: /more details/i });
    userEvent.click(moreDetails);
    const checkFav = screen.getByRole('checkbox', { name: /pokémon favoritado\?/i });
    userEvent.click(checkFav);
    const linkFav = screen.getByRole('link', { name: /Favorite Pokémons/i });
    userEvent.click(linkFav);
    const pkmnFavName = screen.getByText(/pikachu/i);
    expect(pkmnFavName).toBeInTheDocument();
  });
});
