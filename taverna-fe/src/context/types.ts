import { ReactNode } from 'react';
import { GameListProps } from '../services/types';
import { Socket } from 'socket.io-client';
import { UserProfile } from '../models/User';

export interface TavernaContextData {
  gameList: GameListProps[];
  socket: Socket | null;
  setSocket: React.Dispatch<React.SetStateAction<Socket | null>>;
}

export interface TavernaProviderProps {
  children: ReactNode;
}

export interface AuthContextType {
  usuario: UserProfile | null;
  signIn: (data: any) => Promise<void>;
  singOut: () => void;
  signed: boolean;
}

export interface AuthProviderProps {
  children: ReactNode;
}
