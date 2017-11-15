export class UIEventObserver {
    constructor();

    hasSubscriber(target: any, domEventName: string): boolean;

    subscribe(target: any, eventName: string, handler: Function): Function;

    subscribeOnce(target: any, eventName: string, handler: Function): Function;

    unsubscribe(target: any, eventName: string, handler: Function): void;

    unsubscribeAll(): void;
}
declare module default_ {
  export function hasSubscriber(target: any, domEventName: string): boolean;

  export function subscribe(target: any, eventName: string, handler: Function): Function;

  export function subscribeOnce(target: any, eventName: string, handler: Function): Function;

  export function unsubscribe(target: any, eventName: string, handler: Function): void;

  export function unsubscribeAll(): void;
}
export default default_;
