import socket
import os
import mimetypes

def handle_request(client_socket):
    request_data = client_socket.recv(1024).decode('utf-8')
    
    if request_data:
        request_lines = request_data.split('\r\n')
        if len(request_lines) > 0:
            request_line = request_lines[0]
            parts = request_line.split(' ')
            
            if len(parts) > 1:
                file_path = parts[1]
                
                # Resolve '/' para '/index.html'
                if file_path == '/':
                    file_path = '/index.html'
                
                # Remove o '/' inicial do caminho do arquivo
                file_path = file_path[1:]
                
                try:
                    # Abre o arquivo solicitado
                    with open(file_path, 'rb') as file:
                        response_content = file.read()
                        
                    # Obtém o tipo MIME do arquivo para o cabeçalho Content-Type
                    content_type, _ = mimetypes.guess_type(file_path)
                    if not content_type:
                        content_type = 'application/octet-stream'
                    
                    # Prepara a resposta HTTP
                    response = f'HTTP/1.1 200 OK\r\nContent-Length: {len(response_content)}\r\nContent-Type: {content_type}\r\n\r\n'.encode('utf-8') + response_content
                except FileNotFoundError:
                    # Se o arquivo não for encontrado, retorna 404 Not Found
                    response = b'HTTP/1.1 404 Not Found\r\nContent-Length: 0\r\n\r\n'
                
                # Envia a resposta ao cliente
                client_socket.sendall(response)
    
    client_socket.close()

# Configurações do servidor
HOST = '127.0.0.1'  # localhost
PORT = 8062

# Criação do socket do servidor
server_socket = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
server_socket.setsockopt(socket.SOL_SOCKET, socket.SO_REUSEADDR, 1)
server_socket.bind((HOST, PORT))
server_socket.listen(5)  # Escuta até 5 conexões simultâneas

print(f'Servidor HTTP está escutando em http://{HOST}:{PORT}')

try:
    while True:
        # Espera por conexões
        client_socket, addr = server_socket.accept()
        print(f'Requisição recebida de {addr[0]}:{addr[1]}')
        
        # Lida com a requisição em uma nova thread ou processo (opcional)
        handle_request(client_socket)

except KeyboardInterrupt:
    print('\nEncerrando servidor HTTP')

finally:
    server_socket.close()
