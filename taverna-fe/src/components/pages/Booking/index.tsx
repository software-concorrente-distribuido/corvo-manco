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
import ConfirmationModal from '../../template/ConfirmationModal';
import TimeoutWarning from '../../template/TimeoutModal';

Modal.setAppElement('#root');

export function Booking() {
  // TODO: change all states to useReducer
  const [selectedGame, setSelectedGame] = useState<GameListProps>();
  const [selectedDate, setSelectedDate] = useState<Dayjs | null>(null);
  const [selectedTime, setSelectedTime] = useState<string>('');
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [modalType, setModalType] = useState<string>('');
  const [connect, setConnect] = useState<boolean>(false);
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

  const checkAvailability = () => {
    setModalType('confirmation');
    setIsModalOpen(true);
    setConnect(true);
  };

  return (
    <S.Booking>
      <S.Main>
        <S.Content>
          <S.LeftContent>
            {bookingStep === 1 && (
              <>
                <S.GameSelectorWrapper>
                  <p>Selecione seu jogo:</p>
                  <Dropdown
                    options={options}
                    onSelect={getSelectedGameInfo}
                    label="Selecione"
                  />
                </S.GameSelectorWrapper>
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
                {selectedGame && (
                  <Button onClick={() => setBookingStep(2)}>Continuar</Button>
                )}
              </>
            )}
            {bookingStep === 2 && (
              <>
                <S.GameSelectorWrapper>
                  <p>Data:</p>
                  <Calendar value={selectedDate} setValue={setSelectedDate} />
                </S.GameSelectorWrapper>
                {selectedDate && (
                  <S.GameSelectorWrapper>
                    <p>Horário:</p>
                    <Dropdown
                      options={timeOptions}
                      onSelect={setSelectedTime}
                      label="Selecione"
                    />
                  </S.GameSelectorWrapper>
                )}
                {selectedDate && selectedTime !== '' && (
                  <Button onClick={checkAvailability}>
                    Checkar disponibilidade
                  </Button>
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
            disponibleTables={3}
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
