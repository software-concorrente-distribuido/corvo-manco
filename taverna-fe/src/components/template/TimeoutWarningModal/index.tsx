import { useState } from 'react';
import Button from '../../atoms/Button';
import { ButtonWrapper } from '../TableDisponibilityModal/styles';

export function TimeoutWarningModal({
  closeModal,
}: {
  closeModal: () => void;
}) {
  const [seconds, setSeconds] = useState(30);

  setTimeout(() => {
    if (seconds === 0) {
      closeModal();
    }
    setSeconds(seconds - 1);
  }, 1000);
  return (
    <>
      <h2>Não iremos conseguir segurar sua reserva por muito tempo</h2>
      <h2>Por favor, finalize a reserva para garantir sua mesa</h2>
      <h2>Tempo restante: {seconds}</h2>
      <ButtonWrapper>
        <Button onClick={closeModal}>Entendi</Button>
      </ButtonWrapper>
    </>
  );
}

export default TimeoutWarningModal;
