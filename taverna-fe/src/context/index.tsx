import { createContext, useState, useContext, useEffect } from 'react';
import { TavernaContextData, TavernaProviderProps } from './types';
import services from '../services/services';
import { GameListProps } from '../services/types';

export const BossYaContext = createContext<TavernaContextData>(
  {} as TavernaContextData
);

export const BossYaProvider = ({ children }: TavernaProviderProps) => {
  const [gameList, setGameList] = useState<GameListProps[]>();

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
    <BossYaContext.Provider
      value={{
        gameList,
      }}
    >
      {children}
    </BossYaContext.Provider>
  );
};

export const useTavernaContext = () => useContext(BossYaContext);
