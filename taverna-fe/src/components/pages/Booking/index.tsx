import game_alternative from '../../../assets/games.png';

import * as S from './styles';
import Header from '../../atoms/Header';
import { useState } from 'react';
import { GameListProps } from '../../../services/types';
import Dropdown from '../../atoms/Dropdown';
import Footer from '../../atoms/Footer';
import { useTavernaContext } from '../../../context';
import Calendar from '../../atoms/Calendar';
import { Dayjs } from 'dayjs';
import Modal from 'react-modal';
import { AiOutlineClose } from 'react-icons/ai';
import Button from '../../atoms/Button';
import { useSocket } from '../../../socket';
import TableDisponibilityModal from '../../template/TableDisponibilityModal';
import ConfirmationModal from '../../template/ConfirmationModal';
import TimeoutWarning from '../../template/TimeoutModal';
import bookingServices from '../../../services/booking';
import Switch from '@mui/material/Switch';

Modal.setAppElement('#root');

export function Booking() {
  // TODO: change all states to useReducer
  const [selectedGame, setSelectedGame] = useState<GameListProps>();
  const [selectedDate, setSelectedDate] = useState<Dayjs | null>(null);
  const [selectedTime, setSelectedTime] = useState<string>('');
  const [disponibility, setDisponibility] = useState<number>(0);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [modalType, setModalType] = useState<string>('');
  const [connect, setConnect] = useState<boolean>(false);
  const [checked, setChecked] = useState<boolean>(false);
  const [bookingStep, setBookingStep] = useState<number>(1);
  const { gameList, setSocket } = useTavernaContext();

  useSocket(connect, setSocket, () => console.log());

  // TODO: remove all mock data
  const timeOptions = [
    '09:00',
    '10:00',
    '11:00',
    '12:00',
    '13:00',
    '14:00',
    '15:00',
    '16:00',
    '17:00',
    '18:00',
    '19:00',
    '20:00',
    '21:00',
    '22:00',
  ];

  const options = gameList.map((item) => item.title) || [];

  const getSelectedGameInfo = (game: string) => {
    const selectedGame = gameList.find((item) => item.title === game);

    setSelectedGame(selectedGame);
  };

  const checkAvailability = async () => {
    try {
      const disponibility = await bookingServices.getTablesDisponibility();
      setDisponibility(disponibility.quantidade);
      setConnect(true);
    } catch (error) {
      setDisponibility(0);
    } finally {
      setModalType('tableDisponibility');
      setIsModalOpen(true);
    }
  };

  const onHandleContinue = () => {
    setModalType('confirmation');
    setIsModalOpen(true);
  };

  return (
    <S.Booking>
      <S.Main>
        <S.Content>
          <S.LeftContent>
            {bookingStep === 1 && (
              <>
                <S.GameSelectorWrapper>
                  <p>Data:</p>
                  <Calendar value={selectedDate} setValue={setSelectedDate} />
                </S.GameSelectorWrapper>
                {/* {selectedDate && (
                  <S.GameSelectorWrapper>
                    <p>Horário:</p>
                    <Dropdown
                      options={timeOptions}
                      onSelect={setSelectedTime}
                      label="Selecione"
                    />
                  </S.GameSelectorWrapper>
                )} */}
                {selectedDate && (
                  <Button onClick={checkAvailability}>
                    Checkar disponibilidade
                  </Button>
                )}
              </>
            )}
            {bookingStep === 2 && (
              <>
                {!checked && (
                  <S.GameSelectorWrapper>
                    <p>Selecione seu jogo:</p>
                    <Dropdown
                      options={options}
                      onSelect={getSelectedGameInfo}
                      label="Selecione"
                    />
                  </S.GameSelectorWrapper>
                )}
                <S.SwitchWrapper>
                  <span>Quero reservar somente a mesa</span>
                  <Switch
                    checked={checked}
                    onChange={() => setChecked(!checked)}
                  />
                </S.SwitchWrapper>
                {!checked && (
                  <S.GameInfoWrapper>
                    <h2>{selectedGame?.title || 'Selecione um jogo'}</h2>
                    <p>{selectedGame?.description || 'Descrição do jogo'}</p>
                    <span>
                      <strong>Categoria:</strong>{' '}
                      {selectedGame?.category || 'N/A'}
                    </span>
                    <span>
                      <strong>Quantidade:</strong> {selectedGame?.quantity || 0}
                    </span>
                  </S.GameInfoWrapper>
                )}

                {(selectedGame || checked) && (
                  <Button onClick={onHandleContinue}>Continuar</Button>
                )}
              </>
            )}
          </S.LeftContent>
          <S.RightContent>
            <img
              src={selectedGame?.imgUrl || game_alternative}
              alt={`Imagem do jogo ${selectedGame?.title}`}
            />
            <span>{selectedGame?.title || 'Venha para a diversão'}</span>
          </S.RightContent>
        </S.Content>
      </S.Main>
      <Footer />
      <Modal
        className={`react-modal-content`}
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        overlayClassName="react-modal-overlay"
      >
        <div className="close-button" onClick={() => setIsModalOpen(false)}>
          <AiOutlineClose size="24px" color="#00000099" />
        </div>
        {modalType === 'confirmation' && (
          <ConfirmationModal
            wantGame={!checked}
            gameId={selectedGame?.id || 0}
            gameTitle={selectedGame?.title || ''}
            date={selectedDate?.format('YYYY-MM-DD') || ''}
            closeModal={() => setIsModalOpen(false)}
          />
        )}
        {modalType === 'tableDisponibility' && (
          <TableDisponibilityModal
            nextStep={() => setBookingStep(2)}
            disponibleTables={disponibility}
            closeModal={() => setIsModalOpen(false)}
          />
        )}
        {modalType === 'TimeoutWarning' && (
          <TimeoutWarning closeModal={() => setIsModalOpen(false)} />
        )}
      </Modal>
    </S.Booking>
  );
}

export default Booking;
