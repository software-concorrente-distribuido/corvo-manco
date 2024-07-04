# Protocol Buffers
## O que é?
  Mecanismo para serializar dados estruturados, independente da linguagem ou plataforma. Usado para descrever estruturas de dados e interfaces RPC. Criado e mantido pelo Google.
# RPC
  Remote Protocol Call. Chamada Remota de Procedimento. As APIs RPC permitem chamar protocolos remotos em servidores externos como se fossem locais para o software. Por exemplo, adicionar a funcionalidade de chat à aplicação chamando remotamente as funções de mensagens em outra aplicação de chat. Uma chamada RPC é feita por um cliente para uma função no servidor remoto, como se ela tivesse sido chamada localmente para o cliente. O cliente normalmente envia parâmetros para uma função do servidor, da mesma forma que uma função local. É usado o método http POST e o nome da função, que deve ser conhecido pelo cliente juntamente dos parâmetros paara realizar a chamada. Para a transmissão de dados, pode ser utilizado serializadores de dados estruturados como JSON, XML ou Protocol Buffers.
# Como usar?
  Tendo as extensões e tecnologias como protoc, primeiro é definido como os dados devem ser estruturados em um arquivo de extensão .proto. O segundo passo é compilar essa definição, o que gera automaticamente um código na linguagem escolhida (algumas das linguagens suportadas são C++, C#, Java, Python e Go). Esse código é usado para gravar e ler os dados estruturados.
