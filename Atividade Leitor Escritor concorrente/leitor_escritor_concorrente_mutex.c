#include <stdio.h>
#include <string.h>
#include <stdlib.h>
#include <unistd.h>
#include <pthread.h>
#include <semaphore.h>

#define ESCRITORES 10
#define LEITORES 10

int i, j, int_rand, rc, total;
float float_rand;
char phrase[500] = "";
char increment[500];

sem_t mutex;
pthread_mutex_t db;

void *reader(void *j) {
  int i = *(int *)j;
  while (1) {
    sem_wait(&mutex);
    rc = rc + 1;
    if (rc == 1)
      pthread_mutex_lock(&db);
    sem_post(&mutex);
    read_data_base(i);
    sem_wait(&mutex);
    rc = rc - 1;
    if (rc == 0)
      pthread_mutex_unlock(&db);
    sem_post(&mutex);
    use_data_read(i);

    float_rand = 0.01 * random();
    int_rand = float_rand;
    usleep(int_rand);
  }
}

void *writer(void *j) {
  int i = *(int *)j;
  while (1) {
    think_up_data(i);
    pthread_mutex_lock(&db);
    write_data_base(i);
    pthread_mutex_unlock(&db);

    float_rand = 0.01 * random();
    int_rand = float_rand;
    usleep(int_rand);
  }
}

void read_data_base(int i) {
  printf("O leitor %d le: %s\n", i, phrase);
}

void use_data_read(int i) {
  printf("O leitor %d usa o que leu.\n", i);
}

void think_up_data(int i) {
  // Generate a random character between 'a' and 'z'
  char randomChar = 'a' + (rand() % 26);
  increment[0] = ' ';
  increment[1] = randomChar;
  increment[2] = ' ';
  printf("O escritor %d inventa o dado '%c' para colocar.\n", i, randomChar);
}

void write_data_base(int i) {
  strcat(phrase, increment);
  printf("O escritor %d coloca o dado na base de dados: %s\n", i, phrase);
}

void main() {

  rc = 0;

  int res;

  total = LEITORES + ESCRITORES;
  pthread_t thread[total];

  void *thread_result;

  res = sem_init(&mutex, 0, 1);
  if (res != 0) {
    perror("Erro na inicialização do mutex!");
    exit(EXIT_FAILURE);
  }

  res = pthread_mutex_init(&db, NULL);
  if (res != 0) {
    perror("Erro na inicialização do semaforo!");
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
