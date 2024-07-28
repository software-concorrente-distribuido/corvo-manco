import { api } from './api';
import * as T from './types';


const bookingServices = {
  getTablesDisponibility: async (): Promise<{ quantidade: number }> => {
    const token = localStorage.getItem('token');
    const request = await api.get<{ quantidade: number }>(`/api/mesas/1`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    console.log(request.data);
    return request.data;
  },

  getBookingList: async (): Promise<T.GameListProps[]> => {
    const request = await api.get<T.GameListProps[]>(`/api/jogos`);

    return request.data;
  },

  postBooking: async (
    bookingData: T.BookingProps
  ): Promise<T.GameListProps[]> => {
    const request = await api.post<T.GameListProps[]>(
      `/api/jogos`,
      bookingData
    );

    return request.data;
  },
};

export default bookingServices;
