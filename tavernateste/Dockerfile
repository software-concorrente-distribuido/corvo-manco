# Utiliza uma imagem base com o JDK 17
FROM openjdk:17-jdk-slim

COPY . .

RUN ./mvnw clean install -DskipTests

# Comando para executar a aplicação
ENTRYPOINT ["java", "-jar", "target","target/tavernateste-0.0.1-SNAPSHOT.jar app.jar"]