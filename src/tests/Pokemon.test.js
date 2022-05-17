import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../helpers/renderWithRouter';
import App from '../App';

describe('Requisito 6', () => {
  it('Testa se é renderizado um card com as informações de determinado pokémon.', () => {
    renderWithRouter(<App />);

    let pkmnName = screen.getByText(/pikachu/i);
    const pkmnTypeID = screen.getByTestId('pokemon-type');
    let pkmnWeight = screen.getByText('Average weight: 6.0 kg');
    let pkmnSprite = screen.getByRole('img', { name: 'Pikachu sprite' });
    let spriteURL = 'https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png';
    expect(pkmnName).toBeInTheDocument();
    expect(pkmnTypeID).toBeInTheDocument();
    expect(pkmnTypeID).toHaveTextContent('Electric');
    expect(pkmnWeight).toBeInTheDocument();
    expect(pkmnSprite).toHaveAttribute('src', spriteURL);

    const nextButton = screen.getByRole('button', { name: /próximo pokémon/i });
    expect(nextButton).toBeInTheDocument();
    userEvent.click(nextButton);

    pkmnName = screen.getByText('Charmander');
    pkmnWeight = screen.getByText('Average weight: 8.5 kg');
    pkmnSprite = screen.getByRole('img', { name: 'Charmander sprite' });
    spriteURL = 'https://cdn2.bulbagarden.net/upload/0/0a/Spr_5b_004.png';
    expect(pkmnName).toBeInTheDocument();
    expect(pkmnTypeID).toBeInTheDocument();
    expect(pkmnTypeID).toHaveTextContent('Fire');
    expect(pkmnWeight).toBeInTheDocument();
    expect(pkmnSprite).toHaveAttribute('src', spriteURL);
  });

  it(`Testa se o card do pokémon indicado na Pokédex contém um link de
  navegação para exibir detalhes deste pokémon. O link deve possuir a URL 
  pokemons/<id>, onde <id> é o id do pokémon exibido;`, () => {
    renderWithRouter(<App />);

    const moreDetails = screen.getByRole('link', { name: /more details/i });
    expect(moreDetails).toBeInTheDocument();
    expect(moreDetails).toHaveAttribute('href', '/pokemons/25');
  });

  it(`Testa se ao clicar no link de navegação do pokémon, é feito o
  redirecionamento da aplicação para a página de detalhes de pokémon.`, () => {
    const { history } = renderWithRouter(<App />);

    const moreDetails = screen.getByRole('link', { name: /more details/i });
    expect(moreDetails).toBeInTheDocument();
    const nextButton = screen.getByRole('button', { name: /próximo pokémon/i });
    expect(nextButton).toBeInTheDocument();
    userEvent.click(nextButton);

    userEvent.click(moreDetails);
    const { location: { pathname } } = history;
    expect(pathname).toBe('/pokemons/4');
  });

  it('Testa se existe um ícone de estrela nos pokémons favoritados', () => {
    renderWithRouter(<App />);
    const moreDetails = screen.getByRole('link', { name: /more details/i });
    expect(moreDetails).toBeInTheDocument();
    userEvent.click(moreDetails);

    const favoriteInput = screen.getByRole('checkbox');
    expect(favoriteInput).toBeInTheDocument();
    userEvent.click(favoriteInput);

    let favIcon = screen.getByRole('img', { name: 'Pikachu is marked as favorite' });
    expect(favIcon).toBeInTheDocument();
    expect(favIcon).toHaveAttribute('src', '/star-icon.svg');
    const homeButton = screen.getByRole('link', { name: 'Home' });
    expect(homeButton).toBeInTheDocument();
    userEvent.click(homeButton);

    const nextButton = screen.getByRole('button', { name: /próximo pokémon/i });
    expect(nextButton).toBeInTheDocument();

    favIcon = screen.getByRole('img', { name: 'Pikachu is marked as favorite' });
    expect(favIcon).toBeInTheDocument();

    userEvent.click(nextButton);

    expect(favIcon).not.toBeInTheDocument();
  });
});
