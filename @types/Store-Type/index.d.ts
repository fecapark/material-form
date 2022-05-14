declare module "Store-Type" {
  export namespace PubSub {
    type EventDetials = Record<string, any>;
    type EventHandler = (details: EventDetials) => any;
    type Events = Record<string, Array<EventHandler>>;
  }

  export namespace Store {
    type State = Record<string, any>;
    type Payload = Record<string, any>;
    type PayloadFunction<T> = (payload: Payload) => T;
    type Action = (state: State, payload: Payload) => State;
  }
}
