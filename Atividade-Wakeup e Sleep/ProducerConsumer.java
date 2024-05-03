public class ProducerConsumer {
    private static final int BUFFER_CAPACITY = 5; 
    private int[] buffer = new int[BUFFER_CAPACITY];
    private int count = 0; 

    public synchronized void produce() throws InterruptedException {
        while (true) {
            while (count == BUFFER_CAPACITY) {
                System.out.println("Buffer cheio. Produtor esperando...");
                wait();
            }

            int item = (int) (Math.random() * 100); 
            buffer[count++] = item;
            System.out.println("Produzido: " + item);
            notify(); 

            Thread.sleep(1000); 
        }
    }

    public synchronized void consume() throws InterruptedException {
        while (true) {
            while (count == 0) {
                System.out.println("Buffer vazio. Consumidor esperando...");
                wait(); 
            }

            int item = buffer[--count]; 
            System.out.println("Consumido: " + item);
            notify(); 

            Thread.sleep(1000); 
        }
    }

    public static void main(String[] args) {
        ProducerConsumer example = new ProducerConsumer();
        Thread producerThread = new Thread(() -> {
            try {
                example.produce();
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
        });

        Thread consumerThread = new Thread(() -> {
            try {
                example.consume();
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
        });

        producerThread.start();
        consumerThread.start();
    }
}
