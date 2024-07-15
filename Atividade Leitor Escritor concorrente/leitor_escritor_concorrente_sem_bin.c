#include <stdio.h>
#include <string.h>
#include <stdlib.h>
#include <unistd.h>
#include <semaphore.h>

#define ESCRITORES 20
#define LEITORES 20

int i, j, int_rand, rc, total;
float float_rand;
char frase[500] = "";
char incremento[500];

sem_t sem_writer, sem_readers;

void *reader(void *j) {
  int i = *(int *)j;
  while (1) {
    sem_wait(&sem_readers);
    rc++;
    if (rc == 1) {
      sem_wait(&sem_writer);
    }
    sem_post(&sem_readers);

    read_data_base(i);

    sem_wait(&sem_readers);
    rc--;
    if (rc == 0) {
      sem_post(&sem_writer); 
    }
    sem_post(&sem_readers);

    use_data_read(i);

    float_rand = 0.01 * random();
    int_rand = float_rand;
    usleep(int_rand);
  }
}

void *writer(void *j) {
  int i = *(int *)j;
  while (1) {
    sem_wait(&sem_writer); 

    think_up_data(i);

    write_data_base(i);

    sem_post(&sem_writer);

    float_rand = 0.01 * random();
    int_rand = float_rand;
    usleep(int_rand);
  }
}

void read_data_base(int i) {
  printf("O leitor %d lê: %s\n", i, frase);
}

void use_data_read(int i) {
  printf("O leitor %d usa o que leu.\n", i);
}

void think_up_data(int i) {
  char randomChar = 'a' + (rand() % 26);
  incremento[0] = ' ';
  incremento[1] = randomChar;
  incremento[2] = ' ';
  printf("O escritor %d pensa em '%c' para escrever.\n", i, randomChar);
}

void write_data_base(int i) {
  strcat(frase, incremento);
  printf("O escritor %d coloca o dado no banco de dados: %s\n", i, frase);
}

void main() {

  rc = 0;

  int res;

  total = LEITORES + ESCRITORES;
  pthread_t thread[total];

  void *thread_result;

  res = sem_init(&sem_writer, 0, 1);
  if (res != 0) {
    perror("Erro na inicialização do semáforo writer!");
    exit(EXIT_FAILURE);
  }

  res = sem_init(&sem_readers, 0, 1);
  if (res != 0) {
    perror("Erro na inicialização do semáforo readers!");
    exit(EXIT_FAILURE);
  }

  for (i = 0; i < ESCRITORES; i++) {
    res = pthread_create(&thread[i], NULL, writer, &i);
    if (res != 0) {
      perror("Erro na inicialização da thread!");
      exit(EXIT_FAILURE);
    }
  }

  for (i = ESCRITORES; i < total; i++) {
    res = pthread_create(&thread[i], NULL, reader, &i);
    if (res != 0) {
      perror("Erro na inicialização da thread!");
      exit(EXIT_FAILURE);
    }
  }

  for (i = 0; i < total; i++) {
    res = pthread_join(thread[i], &thread_result);
    if (res != 0) {
      perror("Erro ao fazer join nas threads!");
      exit(EXIT_FAILURE);
    }
  }
}