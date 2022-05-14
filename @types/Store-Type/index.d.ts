declare module "Store-Type" {
  export namespace PubSub {
    type EventDetials = Record<string, any>;
    type EventHandler = (details: EventDetials) => any;
    type Events = Record<string, Array<EventHandler>>;
  }
}
