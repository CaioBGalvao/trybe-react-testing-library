import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../helpers/renderWithRouter';
import App from '../App';

describe('Requisito 7', () => {
  it(`Testa se as informações detalhadas do pokémon selecionado
  são mostradas na tela`, () => {
    renderWithRouter(<App />);

    const moreDetails = screen.getByRole('link', { name: /more details/i });
    expect(moreDetails).toBeInTheDocument();
    userEvent.click(moreDetails);

    expect(moreDetails).not.toBeInTheDocument();

    const title = screen.getByRole('heading', { name: 'Pikachu Details', level: 2 });
    expect(title).toBeInTheDocument();

    const summary = screen.getByRole('heading', { name: 'Summary', level: 2 });
    expect(summary).toBeInTheDocument();

    const description = screen.getByText(/this intelligent Pokémon/i);
    expect(description).toBeInTheDocument();
  });

  it(`Testa se existe na página uma seção com os mapas
  contendo as localizações do pokémon`, () => {
    renderWithRouter(<App />);

    const moreDetails = screen.getByRole('link', { name: /more details/i });
    expect(moreDetails).toBeInTheDocument();
    userEvent.click(moreDetails);

    const titleLocation = screen.getByRole(
      'heading', { name: 'Game Locations of Pikachu', level: 2 },
    );
    expect(titleLocation).toBeInTheDocument();

    const fistRegion = screen.getByText('Kanto Viridian Forest');
    const secoundRegion = screen.getByText('Kanto Power Plant');
    const maps = screen.getAllByRole('img', { name: 'Pikachu location' });
    expect(fistRegion).toBeInTheDocument();
    expect(secoundRegion).toBeInTheDocument();
    expect(maps).toHaveLength(2);
    expect(maps[0]).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png');
    expect(maps[1]).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/b/bd/Kanto_Celadon_City_Map.png');
  });

  it('Testa se o usuário pode favoritar um pokémon através da página de detalhes', () => {
    renderWithRouter(<App />);

    const moreDetails = screen.getByRole('link', { name: /more details/i });
    expect(moreDetails).toBeInTheDocument();
    userEvent.click(moreDetails);

    const favInput = screen.getByRole('checkbox', { name: 'Pokémon favoritado?' });
    expect(favInput).toBeInTheDocument();
    userEvent.click(favInput);

    const favIcon = screen.getByRole('img', { name: 'Pikachu is marked as favorite' });
    expect(favIcon).toBeInTheDocument();
    expect(favIcon).toHaveAttribute('src', '/star-icon.svg');

    userEvent.click(favInput);
    expect(favIcon).not.toBeInTheDocument();
  });
});
