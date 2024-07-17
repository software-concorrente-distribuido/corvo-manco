import Button from '../../atoms/Button';

import * as S from './styles';

export function TableDisponibilityModal({
  disponibleTables,
  closeModal,
  nextStep,
}: {
  disponibleTables: number;
  closeModal: () => void;
  nextStep: () => void;
}) {
  const onHandleClick = () => {
    nextStep();
    closeModal();
  };

  return (
    <S.TableDisponibilityModal>
      {disponibleTables > 0 ? (
        <h2>{disponibleTables} mesas disponíveis no horário escolhido</h2>
      ) : (
        <h2>Não há mesas disponíveis nesse horário</h2>
      )}
      {disponibleTables > 0 && (
        <>
          <h1>Deseja reservar uma delas?</h1>
          <S.ButtonWrapper>
            <Button onClick={onHandleClick}>Sim</Button>
            <Button onClick={closeModal}>Não</Button>
          </S.ButtonWrapper>
        </>
      )}
    </S.TableDisponibilityModal>
  );
}

export default TableDisponibilityModal;
