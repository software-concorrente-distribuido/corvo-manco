import { api } from './api';
import * as T from './types';

const services = {
  getGameList: async (): Promise<T.GameListProps[]> => {
    const request = await api.get<T.GameListProps[]>(`/api/jogo`);

    return request.data;
  },
};

export default services;
