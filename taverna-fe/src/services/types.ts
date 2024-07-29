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

export interface UserData {
  nome: string;
  email: string;
  telefone: string;
  login: string;
  senha: string;
}
