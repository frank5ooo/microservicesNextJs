import { randomUUID } from "crypto";
import { createClient, RedisClientType } from "redis";
import { filter, firstValueFrom, Subject } from "rxjs";

export interface Transporter {
  send<TResult = unknown, TInput = unknown>(
    channel: string,
    body: TInput
  ): Promise<TResult>;
  emit<TInput = unknown>(channel: string, body: TInput): Promise<void>;
}

export class RedisTransporter implements Transporter {
  private readonly responseSubject = new Subject<{
    response: unknown;
    id: string;
  }>();
  private readonly publisher: RedisClientType;
  private readonly subscriber: RedisClientType;

  constructor(url: string) {
    this.publisher = createClient({ url });
    this.publisher.on("error", (err) => console.error("Redis error:", err));

    this.subscriber = createClient({ url });
    this.subscriber.on("error", (err) => console.error("Redis error:", err));

    createClient({ url }).pSubscribe("*.reply", (message) => {
      const response = this.deserialize(message);
      this.responseSubject.next(response);
    });
  }

  async connect() {
    await this.publisher.connect();
    await this.subscriber.connect();

    this.subscriber.pSubscribe("*.reply", (message) => {
      const response = this.deserialize(message);
      this.responseSubject.next(response);
    });
  }

  async send<TResult = unknown, TInput = unknown>(
    channel: string,
    body: TInput
  ): Promise<TResult> {
    await this.connect();

    const payload = this.payload(channel, body);
    const serializedPayload = this.serialize(payload);
    await this.publisher?.publish(channel, serializedPayload);
    const result = await firstValueFrom(
      this.responseSubject.pipe(filter(({ id }) => id === payload.id))
    );

    return result.response as TResult;
  }

  async emit<TInput = unknown>(channel: string, body: TInput): Promise<void> {
    await this.publisher.publish(
      channel,
      this.serialize(this.payload(channel, body))
    );
  }

  async quit(): Promise<void> {
    await this.publisher.quit();
  }

  protected payload(pattern: string, body: unknown) {
    const id = randomUUID();
    return {
      id,
      body,
      pattern,
    };
  }

  protected serialize(payload: unknown) {
    return JSON.stringify(payload);
  }

  protected deserialize(serializedString: string) {
    return JSON.parse(serializedString) as { response: unknown; id: string };
  }
}

// const redis = new RedisTransporter('');

// redis.send('');
