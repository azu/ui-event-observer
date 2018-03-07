import { eventObserver, UIEventObserver } from "../src";

eventObserver.subscribe(document.body, "scroll", () => {
});
eventObserver.subscribeOnce(document.body, "scroll", () => {
});
eventObserver.unsubscribe(document.body, "scroll", () => {
});
eventObserver.unsubscribeAll();
eventObserver.hasSubscriber(document.body, "scroll");

const newEventObserver = new UIEventObserver();
