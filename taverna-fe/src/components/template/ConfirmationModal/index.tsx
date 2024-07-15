import Button from '../../atoms/Button';

export function ConfirmationModal({
  disponibleTables,
  closeModal,
}: {
  disponibleTables: number;
  closeModal: () => void;
}) {
  return (
    <>
      {disponibleTables > 0 ? (
        <>
          <h2>{disponibleTables} mesas disponíveis no horário escolhido</h2>
          Quantidade: 1 +
        </>
      ) : (
        <h2>Não há mesas disponíveis nesse horário</h2>
      )}
      {disponibleTables > 0 && (
        <>
          <h1>Deseja confirmar a reserva?</h1>
          <Button onClick={() => console.log()}>Sim</Button>
          <Button onClick={closeModal}>Não</Button>
        </>
      )}
    </>
  );
}

export default ConfirmationModal;
