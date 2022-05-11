import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../helpers/renderWithRouter';
import App from '../App';

describe('Requisito 4', () => {
  it('Teste se a página contém um heading h2 com o texto Page requested not found 😭',
    () => {
      const { history } = renderWithRouter(<App />);
      history.push('/C');
      const notFoundTitle = screen.getByRole(
        'heading', { name: /page requested not found/i, level: 2 },
      );
      expect(notFoundTitle).toBeInTheDocument();
    });
  it('Teste se a página mostra a imagem https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/C');
    const imgSrc = 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif';
    const img = screen
      .getByRole('img', {
        name: /pikachu crying because the page requested was not found/i,
      });
    expect(img.src).toContain(imgSrc);
    expect(img).toBeInTheDocument();
  });
});
