import { ReactNode } from 'react';
import { GameListProps } from '../services/types';

export interface TavernaContextData {
  gameList?: GameListProps[];
}

export interface TavernaProviderProps {
  children: ReactNode;
}
