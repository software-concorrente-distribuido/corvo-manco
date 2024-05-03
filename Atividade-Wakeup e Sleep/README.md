Wrong case - The producer is waiting for the consumer to consume all items before producing more, and the consumer is waiting for the producer to produce more items before consuming them

```
Produzido: 57
Produzido: 11
Produzido: 38
Produzido: 6
Produzido: 36
Buffer cheio. Produtor esperando...
Consumido: 36
Consumido: 6
Consumido: 38
Consumido: 11
Consumido: 57
Buffer vazio. Consumidor esperando...
Produzido: 16
Produzido: 14
Produzido: 32
Produzido: 81
Produzido: 95
Buffer cheio. Produtor esperando...
Consumido: 95
Consumido: 81
Consumido: 32
Consumido: 14
Consumido: 16
```
