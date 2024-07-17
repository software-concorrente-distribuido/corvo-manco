import { DefaultEventsMap } from '@socket.io/component-emitter';
import { useEffect } from 'react';
import { io, Socket } from 'socket.io-client';
import { listeners } from './listeners';

const react_socket_identifier: string = '';

const socket_server_base_url: string = 'http://localhost:8080/resources/';

export const useSocket = (
  connect: boolean,
  setSocket: React.Dispatch<
    React.SetStateAction<Socket<DefaultEventsMap, DefaultEventsMap> | null>
  >,
  showWarningModal: () => void
) =>
  useEffect(() => {
    if (!connect) return;
    const newSocket = io(socket_server_base_url, {
      extraHeaders: {
        'X-Client-Id': react_socket_identifier,
        'X-Client-Key': '',
      },
    });

    setSocket(() => newSocket);
    listeners(newSocket, showWarningModal);

    return () => {
      newSocket.disconnect();
    };
  }, [connect, setSocket, showWarningModal]);
