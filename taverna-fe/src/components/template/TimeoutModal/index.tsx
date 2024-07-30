import Button from '../../atoms/Button';
import { ButtonWrapper } from '../TableDisponibilityModal/styles';

export function TimeoutModal({ closeModal }: { closeModal: () => void }) {
  return (
    <>
      <h2>Ops!</h2>
      <h2>Sua mesa ou jogo pode não estar mais disponível</h2>
      <h2>Por favor, tente novamente</h2>
      <ButtonWrapper>
        <Button onClick={closeModal}>Entendi</Button>
      </ButtonWrapper>
    </>
  );
}

export default TimeoutModal;
