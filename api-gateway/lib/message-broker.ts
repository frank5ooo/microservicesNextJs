import { randomUUID } from "crypto";
import { RedisClientType } from "redis"

type MessageEvents = Record<string, (message: unknown) => unknown>;
interface Order {name: string}

export class MessageBroker<Name extends string,Ev extends MessageEvents> {
    protected  publisher!: RedisClientType;
    protected  subscriber!: RedisClientType;

    constructor(
        protected readonly name: Name,
    ) {}

    async send<Ch extends string & keyof Ev>(channel: Ch, body: Parameters<Ev[Ch]>[0]): Promise<ReturnType<Ev[Ch]>> {
        const request = new Promise((r,x) => {
            const requestId = randomUUID();
            setTimeout(x, 2000, Error("Service timed out"));
            this.subscriber.subscribe(`${this.name}:${channel}|${requestId}>`, r);
            this.publisher.publish(`${channel}|${requestId}`, body?.toString() ?? "");
        });
        return await request;
    }

    emit(channel: string, body: unknown) {
        return this.publisher.publish()
    }
}

const ordersService = new MessageBroker<'orders', {
    list(): Order[],
}>('orders');

async function miAction() {
    const orders = await ordersService.send("list", undefined);
}

ordersService.send('list', undefined).then(orders => {
    orders
});
