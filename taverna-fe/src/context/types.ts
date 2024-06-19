import { ReactNode } from 'react';
import { GameListProps } from '../services/types';
import { Socket } from 'socket.io-client';

export interface TavernaContextData {
  gameList: GameListProps[];
  socket: Socket | null;
  setSocket: React.Dispatch<React.SetStateAction<Socket | null>>;
}

export interface TavernaProviderProps {
  children: ReactNode;
}
