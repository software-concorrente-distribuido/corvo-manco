export interface GameListProps {
  title: string;
  description: string;
  imgUrl: string;
  category: string;
  quantity: number;
  id: number;
}

export interface BookingProps {
  usuario: number;
  idMesa: number;
  inicio: string;
  fim: string;
  idJogo?: number;
}
