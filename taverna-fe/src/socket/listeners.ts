import { Socket } from 'socket.io-client';

export const listeners = (socket: Socket, showTimeoutModal: () => void) => {
  socket.on('no_longer_available', () => {
    showTimeoutModal();
  });
};
