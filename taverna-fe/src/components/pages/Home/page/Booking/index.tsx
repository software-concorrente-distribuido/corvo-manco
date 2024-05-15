import game_alternative from '../../../../../assets/games.png';

import * as S from './styles';
import Header from '../../atoms/Header';
import { useState } from 'react';
import { GameListProps } from '../../../../../services/types';
import Dropdown from '../../atoms/Dropdown';
import Footer from '../../atoms/Footer';

export function Booking() {
  const [selectedGame, setSelectedGame] = useState<GameListProps>();

  const temporaryList = [
    {
      title: 'Dungeons and Dragons',
      description: 'A fantasy tabletop role-playing game',
      imgUrl: 'https://wallpapercave.com/wp/wp2770233.jpg',
      category: 'Tabletop',
      quantity: 10,
    },
    {
      title: 'Magic: The Gathering',
      description: 'A collectible card game',
      imgUrl:
        'https://s2-techtudo.glbimg.com/DKc1i8alGqgvAte7bVJDqDudlqg=/0x0:875x578/1000x0/smart/filters:strip_icc()/i.s3.glbimg.com/v1/AUTH_08fbf48bc0524877943fe86e43087e7a/internal_photos/bs/2019/c/L/tK0403SrGJrDfBpdu6uw/captura-de-tela-2019-01-03-as-14.17.34.png',
      category: 'Card Game',
      quantity: 5,
    },
    {
      title: 'Warhammer 40,000',
      description: 'A miniature wargame',
      imgUrl:
        'https://store.frontlinegaming.org/cdn/shop/collections/https___trade.games-workshop.com_assets_2023_07_15-07_Trade_Header_-_Librarian_in_Warded_Terminator_Armour_1.jpg?v=1692370043',
      category: 'Tabletop',
      quantity: 3,
    },
  ];

  const options = [
    'Dungeons and Dragons',
    'Magic: The Gathering',
    'Warhammer 40,000',
  ];

  const getSelectedGameInfo = (game: string) => {
    const selectedGame = temporaryList.find((item) => item.title === game);

    setSelectedGame(selectedGame);
  };

  return (
    <S.Booking>
      <Header />
      <S.Main>
        <S.Content>
          <S.LeftContent>
            <S.GameSelectorWrapper>
              <p>Selecione seu jogo:</p>
              <Dropdown
                options={options}
                onSelect={getSelectedGameInfo}
                label="Selecione"
              />
            </S.GameSelectorWrapper>
            <S.GameInfoWrapper>
              <h2>{selectedGame?.title || 'Selecione um jogo'}</h2>
              <p>{selectedGame?.description || 'Descrição do jogo'}</p>
              <span>
                <strong>Categoria:</strong> {selectedGame?.category || 'N/A'}
              </span>
              <span>
                <strong>Quantidade:</strong> {selectedGame?.quantity || 0}
              </span>
            </S.GameInfoWrapper>
          </S.LeftContent>
          <S.RightContent>
            <img
              src={selectedGame?.imgUrl || game_alternative}
              alt={`Imagem do jogo ${selectedGame?.title}`}
            />
            <span>{selectedGame?.title || 'Venha para a diversão'}</span>
          </S.RightContent>
        </S.Content>
      </S.Main>
      <Footer />
    </S.Booking>
  );
}

export default Booking;
