# Utiliza uma imagem base com o JDK 17
FROM openjdk:17-jdk-slim

# Define o diretório de trabalho dentro do contêiner
WORKDIR /app

# Copia o jar da aplicação para o diretório de trabalho
COPY target/tavernateste-0.0.1-SNAPSHOT.jar app.jar

# Exponha a porta que a aplicação vai utilizar
EXPOSE 8080

# Comando para executar a aplicação
ENTRYPOINT ["java", "-jar", "app.jar"]