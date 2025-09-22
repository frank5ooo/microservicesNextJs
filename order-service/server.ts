import { createClient } from "redis";
import { orders } from "./lib/orders";

async function main() {
  const publisher = createClient({ url: "redis://localhost:6379" });
  const subscriber = createClient({ url: "redis://localhost:6379" });

  publisher.on("error", (err) => console.error("Publisher Error:", err));
  subscriber.on("error", (err) => console.error("Subscriber Error:", err));

  try {
    await publisher.connect();
    await subscriber.connect();
    console.log("✅ Connected to Redis");
  } catch (err) {
    console.error("❌ Redis connection error:", err);
    return;
  }

  await subscriber.pSubscribe("orders:*", async (message, channel) => {
    try {
      console.log(`Received from ${channel}:`, message);
      if (channel === "orders:list") {
        await publisher.publish("orders:list>", JSON.stringify(orders));
        console.log("Published message");
      }
    } catch (err) {
      console.error("Error publishing:", err);
    }
    // subscriber.quit();

  });
}

main().catch(console.error);
