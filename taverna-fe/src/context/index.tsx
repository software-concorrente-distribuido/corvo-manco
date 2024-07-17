import { createContext, useState, useContext, useEffect } from 'react';
import { TavernaContextData, TavernaProviderProps } from './types';
import services from '../services/services';
import { GameListProps } from '../services/types';
import { Socket } from 'socket.io-client';

export const TavernaContext = createContext<TavernaContextData>(
  {} as TavernaContextData
);

export const TavernaProvider = ({ children }: TavernaProviderProps) => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [gameList, setGameList] = useState<GameListProps[]>([
    {
      title: 'Dungeons and Dragons',
      id: 1,
      description: 'A fantasy tabletop role-playing game',
      imgUrl: 'https://wallpapercave.com/wp/wp2770233.jpg',
      category: 'Tabletop',
      quantity: 10,
    },
    {
      id: 2,
      title: 'Magic: The Gathering',
      description: 'A collectible card game',
      imgUrl:
        'https://s2-techtudo.glbimg.com/DKc1i8alGqgvAte7bVJDqDudlqg=/0x0:875x578/1000x0/smart/filters:strip_icc()/i.s3.glbimg.com/v1/AUTH_08fbf48bc0524877943fe86e43087e7a/internal_photos/bs/2019/c/L/tK0403SrGJrDfBpdu6uw/captura-de-tela-2019-01-03-as-14.17.34.png',
      category: 'Card Game',
      quantity: 5,
    },
    {
      id: 3,
      title: 'Warhammer 40,000',
      description: 'A miniature wargame',
      imgUrl:
        'https://store.frontlinegaming.org/cdn/shop/collections/https___trade.games-workshop.com_assets_2023_07_15-07_Trade_Header_-_Librarian_in_Warded_Terminator_Armour_1.jpg?v=1692370043',
      category: 'Tabletop',
      quantity: 3,
    },
  ]);

  const getGameList = async () => {
    try {
      const response = await services.getGameList();
      setGameList(response);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getGameList();
  }, []);

  return (
    <TavernaContext.Provider
      value={{
        gameList,
        socket,
        setSocket,
      }}
    >
      {children}
    </TavernaContext.Provider>
  );
};

export const useTavernaContext = () => useContext(TavernaContext);
