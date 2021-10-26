using System;
using System.Threading;
using System.Threading.Tasks;
using MQTTnet;
using MQTTnet.Client.Options;
using Nito.AsyncEx;

namespace Generator
{
    class Program
    {

        static void Main(string[] args)
        {
            if (args.Length != 5)
            {
                Console.WriteLine("Need 5 args: ");
                Console.WriteLine("Program");
                Console.WriteLine("\t MQTT Broker IP Address");
                Console.WriteLine("\t Device ID");
                Console.WriteLine("\t MQTT Topic");
                Console.WriteLine("\t Initial starting size of bottle");
                Console.WriteLine("\t Device Name");
                Console.WriteLine("Got: " + string.Join(",", args ));
            }
            else
            {
                string broker = args[0];
                string clientId = args[1];
                string topic = args[2];
                string size = args[3];
                string name = args[4];
                Console.WriteLine("Got Args: " + string.Join(",", args));

                Console.WriteLine("Sending to: " + broker);

                bool firstRun = true;

                while (true)
                {
                    if(!firstRun) {
                        clientId = (Int32.Parse(clientId) + 3).ToString();
                        firstRun = false;
                    }
                    AsyncContext.Run(async () => await AsyncMain(broker, clientId, topic, size, name));
                }
            }
        }

        private static async Task AsyncMain(string broker, string clientId, string topic, string size, string name)
        {
            // Create a new MQTT client.
            var factory = new MqttFactory();
            var mqttClient = factory.CreateMqttClient();
            var options = new MqttClientOptionsBuilder()
                .WithClientId(clientId)
                .WithTcpServer(broker)
                .Build();
            await mqttClient.ConnectAsync(options, CancellationToken.None);

            // track state
            int remaining = Int32.Parse(size);
            int pour = 1;

            while (remaining > pour)
            {
                Console.WriteLine("Pouring " + pour.ToString() + " with " + remaining.ToString() + " remaining on bottle " + clientId);
                remaining = remaining - pour;
                string payload = name + "," + pour.ToString() + "," + remaining.ToString();
                Console.WriteLine("Sending message...");
                var message = new MqttApplicationMessageBuilder()
                    .WithTopic(topic)
                    .WithPayload(payload)
                    .Build();

                await mqttClient.PublishAsync(message, CancellationToken.None);

                Random random = new Random();
                int delay = random.Next(15, 65);
                await Task.Delay(delay*1000);
            }

        }
    }
}