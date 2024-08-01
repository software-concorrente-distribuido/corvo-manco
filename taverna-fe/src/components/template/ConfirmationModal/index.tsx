import { useAuth } from '../../../context/useAuth';
import bookingServices from '../../../services/booking';
import Button from '../../atoms/Button';

import * as S from './styles';

export function TableDisponibilityModal({
  gameId,
  gameTitle,
  wantGame,
  date,
  closeModal,
  setConnect,
}: {
  gameId: number;
  gameTitle: string;
  date: string;
  wantGame: boolean;
  closeModal: () => void;
  setConnect: (connect: boolean) => void;
}) {
  const { user } = useAuth();
  const onHandleClick = async () => {
    try {
      await bookingServices.postBooking({
        usuario: user?.id!,
        idMesa: 1,
        inicio: date,
        fim: date,
        ...(wantGame && { idJogo: gameId }),
      });
      setConnect(false);
      closeModal();
    } catch (error) {
      setConnect(false);
      closeModal();
    }
  };

  return (
    <S.ConfirmationModal>
      <h1>Resumo:</h1>
      <p>Data: {date}</p>
      {wantGame && <h3>Jogo: {gameTitle}</h3>}
      <h3>Mesa: 1</h3>
      <h3>Deseja confirmar a reserva?</h3>
      <S.ButtonWrapper>
        <Button onClick={onHandleClick}>Sim</Button>
        <Button onClick={closeModal}>Não</Button>
      </S.ButtonWrapper>
    </S.ConfirmationModal>
  );
}

export default TableDisponibilityModal;
