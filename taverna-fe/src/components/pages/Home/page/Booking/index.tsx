import game_alternative from '../../../../../assets/games.png';

import * as S from './styles';
import Header from '../../atoms/Header';
import { useState } from 'react';
import { GameListProps } from '../../../../../services/types';
import Dropdown from '../../atoms/Dropdown';
import Footer from '../../atoms/Footer';
import { useTavernaContext } from '../../../../../context';

export function Booking() {
  const [selectedGame, setSelectedGame] = useState<GameListProps>();
  const { gameList } = useTavernaContext();

  const options = gameList.map((item) => item.title) || [];

  const getSelectedGameInfo = (game: string) => {
    const selectedGame = gameList.find((item) => item.title === game);

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
