import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../helpers/renderWithRouter';
import App from '../App';

describe('Requisito 2', () => {
  it('Teste se a página contém um heading h2 com o texto About Pokédex.', () => {
    renderWithRouter(<App />);
    const linkAbout = screen.getByRole('link', { name: /about/i });
    userEvent.click(linkAbout);
    const aboutTitle = screen.getByRole('heading', { name: /about pokédex/i, level: 2 });
    expect(aboutTitle).toBeInTheDocument();
  });
  it('Teste se a página contém dois parágrafos com texto sobre a Pokédex.', () => {
    renderWithRouter(<App />);
    const linkAbout = screen.getByRole('link', { name: /about/i });
    userEvent.click(linkAbout);
    const fistParagraph = screen.getByText(/this application simulates a pokédex,/i);
    const secondParagraph = screen.getByText(/one can filter pokémons by type,/i);
    expect(fistParagraph).toBeInTheDocument();
    expect(secondParagraph).toBeInTheDocument();
  });
  it('Teste se a página contém a seguinte imagem de uma Pokédex: https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png.',
    () => {
      renderWithRouter(<App />);
      const linkAbout = screen.getByRole('link', { name: /about/i });
      userEvent.click(linkAbout);
      const imgSrc = 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png';
      const img = screen.getByRole('img', { name: /pokédex/i });
      expect(img.src).toContain(imgSrc);
      expect(img).toBeInTheDocument();
    });
});
// render sempre

// Acesse

// interaja

// teste
