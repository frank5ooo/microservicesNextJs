import { createClient } from "redis";

async function main() {
  const subscriber = createClient({ url: "redis://localhost:6379" });
  const publisher = createClient({ url: "redis://localhost:6379" });

  subscriber.on("error", (err) => console.error("Subscriber Error", err));
  publisher.on("error", (err) => console.error("Publisher Error", err));

  await subscriber.connect();
  await publisher.connect();

  console.log("Connected to Redis");

  await subscriber.pSubscribe("orders:*", async (message, channel) => {
    console.log(`Received message from ${channel}: ${message}`);

    if (channel === "orders:list") {
      try {
        const value = await publisher.publish("orders:list>", channel);
        console.log("Mensajes publicados:", value);
        
      } catch (err) {
        console.error("Error al publicar:", err);
      }
    }
  });

}

main();
