declare module "PubSub-Type" {
  export namespace PubSub {
    type EventDetials = Record<string, any>;
    type EventHandler = (details: EventDetials) => any;
    type Events = Record<string, Array<EventHandler>>;

    interface AbstractPubSub {
      subscribe(eventType: string, callBack: EventHandler): number;
      publish(eventType: string, details: EventDetials): Array<any>;
    }
  }
}
