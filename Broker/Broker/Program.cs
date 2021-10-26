using System;
using System.Threading.Tasks;
using Nito.AsyncEx;
using MongoDB.Bson;
using Realms;
using Realms.Sync;
using MQTTnet;
using MQTTnet.Server;
using System.Text;

namespace Broker
{
    class Program
    {
        static void Main(string[] args)
        {
            Console.WriteLine("Opening...");

            // parse cli args
            if (args.Length != 2)
            {
                Console.WriteLine("Need 2 args: ");
                Console.WriteLine("Program");
                Console.WriteLine("\t RealmApppID");
                Console.WriteLine("\t API Key");
                Console.WriteLine("Got: " + string.Join(",", args));
                return;
            }
            else
            {
                Console.WriteLine("Got: " + string.Join(",", args));
                //var realmAppId = args[0];
                var realmAppId = "team4-uafre";
                var apiKey = "SdkHOrS6MGwpC2T95AY340ULJSytWuwOjqtxi8cqfmEvOYd3IcP32bkrkc4N3Ne8";
                //var apiKey = args[1];

                StartAsync(realmAppId, apiKey).Wait();
            }
        }

        private static async Task StartAsync(string realmAppId, string apiKey)
        {
            // realm setup
            var app = App.Create(realmAppId);
            var user = await app.LogInAsync(Credentials.ApiKey(apiKey));
            var partition = $"user={user.Id}";
            RealmConfiguration.DefaultConfiguration = new SyncConfiguration(partition, user);

            // mqtt setup
            var optionsBuilder = new MqttServerOptionsBuilder()
                .WithConnectionBacklog(100)
                .WithDefaultEndpointPort(1883)
                .WithApplicationMessageInterceptor(context =>
                {
                    context.AcceptPublish = true;
                    HandleNewMessage(context);
                });

            var mqttServer = new MqttFactory().CreateMqttServer();
            await mqttServer.StartAsync(optionsBuilder.Build());

            // wait forever
            Console.WriteLine("Press any key to exit.");
            Console.ReadLine();

            // cleanup
            await mqttServer.StopAsync();

            // wait for Realm uploads
            AsyncContext.Run(async () =>
            {
                using var realm = Realm.GetInstance();
                await realm.GetSession().WaitForUploadAsync();
            });
        }

        private static void HandleNewMessage(MqttApplicationMessageInterceptorContext context)
        {
            Console.WriteLine("Got message!");

            using var realm = Realm.GetInstance();
            var payload = context.ApplicationMessage?.Payload == null ? null : Encoding.UTF8.GetString(context.ApplicationMessage?.Payload);
            var payloadSplit = payload.Split(","); // name, pour, remaining

            realm.Write(() =>
            {
                var msg = new BottleReadingTemp
                {
                    Pour = Int32.Parse(payloadSplit[1]),
                    Remaining = Int32.Parse(payloadSplit[2]),
                    Contents = payloadSplit[0],
                    BottleId = context.ClientId
                };

                realm.Add(msg);
            });

            Console.WriteLine("\tWritten!");
        }

        public class BottleReadingTemp : RealmObject
        {
            [PrimaryKey]
            [MapTo("_id")]
            public ObjectId Id { get; set; } = ObjectId.GenerateNewId();

            [MapTo("bottleId")]
            public string BottleId { get; set; }
            [MapTo("bottleContents")]
            public string Contents { get; set; }
            [MapTo("pourSize")]
            public int Pour { get; set; }
            [MapTo("remaining")]
            public int Remaining { get; set; }
        }
    }
}