import socket

sock = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
sock.connect(("127.0.0.1", 80))

request = "GET / HTTP/1.1\r\nHost:127.0.0.1\r\n\r\n"
sock.send(request.encode())

response = b""
while True:
    data = sock.recv(1024)
    if not data:
        break
    response += data

print(response.decode())

sock.close()
