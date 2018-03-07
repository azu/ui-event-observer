declare class UIEventObserver {
    constructor();

    hasSubscriber(target: any, domEventName: string): boolean;

    subscribe(target: any, eventName: string, handler: Function): Function;

    subscribeOnce(target: any, eventName: string, handler: Function): Function;

    unsubscribe(target: any, eventName: string, handler: Function): void;

    unsubscribeAll(): void;
}

declare const eventObserver: UIEventObserver;
export { eventObserver, UIEventObserver };
