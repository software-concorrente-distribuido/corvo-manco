import { Socket } from 'socket.io-client';

export const listeners = (socket: Socket, showWarningModal: () => void) => {
  socket.on('alert_timeout_booking', () => {
    showWarningModal();
  });
};
