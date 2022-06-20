import PublishSubscribe from "./PublishSubscribe";
import { Store as StoreType } from "Store-Type";

export default class Store {
  private preventPublish: boolean = false;
  private actions: Record<string, StoreType.PayloadFunction<StoreType.State>>;
  private state: StoreType.State;

  readonly eventManager: PublishSubscribe;

  constructor() {
    this.actions = {};
    this.state = {};

    this.eventManager = new PublishSubscribe();
    this.setStateProxy();
  }

  private setStateProxy() {
    const setStateHandler = (
      state: StoreType.State,
      key: string,
      value: any
    ): boolean => {
      state[key] = value;

      if (!this.preventPublish) {
        this.eventManager.publish("stateChange", this.state);
      }

      return true;
    };

    this.state = new Proxy({}, { set: setStateHandler });
  }

  private mergeState(state: StoreType.State): StoreType.State {
    return Object.assign(this.state, state);
  }

  setDefaultState(accessKey: string, defaultValue: any) {
    this.preventPublish = true;
    this.state[accessKey] = defaultValue;
    this.preventPublish = false;
  }

  setAction(actionType: string, action: StoreType.Action) {
    const actionWrapper = (payload: StoreType.Payload): StoreType.State => {
      const actionResultState: StoreType.State = action({
        state: { ...this.state },
        payload,
      });

      return this.mergeState(actionResultState);
    };

    this.actions[actionType] = actionWrapper;
  }

  dispatch(actionType: string, payload: StoreType.Payload) {
    if (!this.actions.hasOwnProperty(actionType)) {
      throw Error(`Invalid action type: ${actionType}.`);
    }

    // Triggers Proxy
    this.state = this.actions[actionType](payload);
  }

  getState(accessKey: string): any {
    if (!this.state.hasOwnProperty(accessKey)) {
      throw Error(`Invalid state key: ${accessKey}.`);
    }

    return this.state[accessKey];
  }
}
