import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../helpers/renderWithRouter';
import App from '../App';

describe('Requisito 1', () => {
  it('Testa se o topo da aplicação contém um conjunto fixo de links de navegação.',
    () => {
      // render sempre
      renderWithRouter(<App />);
      // Acesse
      const linkHome = screen.getByRole('link', { name: /home/i });
      const linkAbout = screen.getByRole('link', { name: /about/i });
      const linkFav = screen.getByRole('link', { name: /favorite pokémons/i });
      // teste
      expect(linkHome).toBeInTheDocument();
      expect(linkAbout).toBeInTheDocument();
      expect(linkFav).toBeInTheDocument();
    });
  it(`Testa se a aplicação é redirecionada para a página inicial,
   na URL / ao clicar no link Home da barra de navegação.`,
  () => {
    // render sempre
    const { history } = renderWithRouter(<App />);
    // Acesse
    const linkHome = screen.getByRole('link', { name: /home/i });
    // interaja
    userEvent.click(linkHome);
    // teste
    const { location: { pathname } } = history;
    expect(pathname).toBe('/');
  });
  it(`Testa se a aplicação é redirecionada para a página de About, na URL
    /about, ao clicar no link About da barra de navegação.`,
  () => {
    // render sempre
    const { history } = renderWithRouter(<App />);
    // Acesse
    const linkAbout = screen.getByRole('link', { name: /about/i });
    // interaja
    userEvent.click(linkAbout);
    // teste
    const { location: { pathname } } = history;
    expect(pathname).toBe('/about');
  });
  it(`Teste se a aplicação é redirecionada para a página de Pokémons
  Favoritados, na URL /favorites, ao clicar no link Favorite Pokémons da barra
  de navegação.`,
  () => {
    // render sempre
    const { history } = renderWithRouter(<App />);
    // Acesse
    const linkFav = screen.getByRole('link', { name: /favorite pokémons/i });
    // interaja
    userEvent.click(linkFav);
    // teste
    const { location: { pathname } } = history;
    expect(pathname).toBe('/favorites');
  });
  it(`Teste se a aplicação é redirecionada para a página Not Found ao entrar em
  uma URL desconhecida.`, () => {
    // render sempre
    const { history } = renderWithRouter(<App />);
    history.push('/C');
    // Acesse
    const notFoundTitle = screen.getByRole(
      'heading', { name: /page requested not found/i, level: 2 },
    );
    // interaja

    // teste
    const { location: { pathname } } = history;
    expect(pathname).toBe('/C');
    expect(notFoundTitle).toBeInTheDocument();
  });
});
// render sempre

// Acesse

// interaja

// teste
