namespace Atividade
{
    public class Mailbox
    {
        private string? message;
        private readonly object lockObject = new();

        public void StoreMessage(string msg)
        {
            lock (lockObject)
            {
                while (message != null)
                {
                    Monitor.Wait(lockObject);
                }
                message = msg;
                Monitor.PulseAll(lockObject);
            }
        }

        public string RetrieveMessage()
        {
            lock (lockObject)
            {
                while (message == null)
                {
                    Monitor.Wait(lockObject);
                }
                string msg = message;
                message = null;
                Monitor.PulseAll(lockObject);
                return msg;
            }
        }
    }

    public class Producer
    {
        private readonly Mailbox mailbox;
        private readonly string id;
        private readonly Thread thread;

        public Producer(Mailbox mailbox, string id)
        {
            this.mailbox = mailbox;
            this.id = id;
            thread = new Thread(Run);
        }

        public void Start() => thread.Start();

        private void Run()
        {
            int messageCount = 0;
            while (true)
            {
                string message = $"{id} mensagem {messageCount++}";
                mailbox.StoreMessage(message);
                Console.WriteLine($"{id} produziu: {message}");
                Thread.Sleep(1000);
            }
        }
    }

    public class Consumer
    {
        private readonly Mailbox mailbox;
        private readonly string id;
        private readonly Thread thread;

        public Consumer(Mailbox mailbox, string id)
        {
            this.mailbox = mailbox;
            this.id = id;
            thread = new Thread(Run);
        }

        public void Start() => thread.Start();

        private void Run()
        {
            while (true)
            {
                string message = mailbox.RetrieveMessage();
                Console.WriteLine($"{id} consumiu: {message}");
                Thread.Sleep(1500);
            }
        }
    }

    public class Test
    {
        public static void Main(string[] args)
        {
            Mailbox mailbox = new();

            Producer produtor1 = new(mailbox, "Produtor1");
            Producer produtor2 = new(mailbox, "Produtor2");

            Consumer consumidor1 = new(mailbox, "Consumidor1");
            Consumer consumidor2 = new(mailbox, "Consumidor2");

            produtor1.Start();
            produtor2.Start();
            consumidor1.Start();
            consumidor2.Start();

            Console.ReadLine();
        }
    }
}
