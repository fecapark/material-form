import { PubSub } from "PubSub-Type";

export default class PublishSubscribe implements PubSub.AbstractPubSub {
  private events: PubSub.Events = {};

  subscribe(eventType: string, callBack: PubSub.EventHandler): number {
    if (!this.events.hasOwnProperty(eventType)) {
      this.events[eventType] = [];
    }

    return this.events[eventType].push(callBack);
  }

  // Todo: Type Reference: https://pa-pico.tistory.com/112
  // -> 근데 사실상 불가능한 게, 동적으로 변하는 events 객체의 타입을 추론할 방법이 거의 없음.
  publish(eventType: string, details: PubSub.EventDetials = {}): Array<any> {
    if (!this.events.hasOwnProperty(eventType)) {
      return [];
    }

    return this.events[eventType].map((callBack) => callBack(details));
  }
}
