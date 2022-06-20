declare module "Store-Type" {
  export namespace Store {
    type State = Record<string, any>;
    type Payload = Record<string, any>;
    type PayloadFunction<T> = (payload: Payload) => T;
    type Action = ({
      state,
      payload,
    }: {
      state: State;
      payload: Payload;
    }) => State;

    interface AbstractStore {
      eventManager: import("PubSub-Type").PubSub.AbstractPubSub;

      setDefaultState(accessKey: string, defaultValue: any): void;
      setAction(actionType: string, action: StoreType.Action): void;
      dispatch(actionType: string, payload: StoreType.Payload): void;
      getState(accessKey: string): any;
    }
  }
}
