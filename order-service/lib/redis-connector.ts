import { createClient, RedisClientType } from "redis";
import { orders } from "./orders";

export class RedisConnector {
    static readonly RESPONSE_CHAR = '>'
    protected publisher?: RedisClientType;
    protected subscriber?: RedisClientType;
    constructor(
        public readonly pSubscribe: string,
        hooks: {[channel: string]: (message: string) => (string | Buffer | void)}
    ) {
        Promise.all([
            createClient({ url: "redis://localhost:6379" }),
            createClient({ url: "redis://localhost:6379" }),
        ]).then((clients) => {
            [this.publisher, this.subscriber] = clients;

            this.subscriber?.pSubscribe(`${pSubscribe}:*`, (channel, message) => {
                const response = hooks[`${pSubscribe}:${channel}`]?.(message);
                if(response !== undefined) this.sendResponse(channel, response);
            });
        });
    }

    sendResponse(channel: string, body: string | Buffer) {
        return this.publisher?.publish(`${this.pSubscribe}:${channel}${RedisConnector.RESPONSE_CHAR}`, body);
    }
}

const redis = new RedisConnector('orders', {
    list: getOrders,
    create: createOrder,
});


function getOrders(message: string) {
    return JSON.parse(orders);
}