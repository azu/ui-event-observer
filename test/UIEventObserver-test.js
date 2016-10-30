// LICENSE : MIT
"use strict";
const assert = require("assert");
import UIEventObserver from "../src/UIEventObserver";
describe("UIEventObserver", () => {
    let eventObserver;
    beforeEach(() => {
        eventObserver = new UIEventObserver();
    });
    afterEach(() => {
        // should release all
        eventObserver.unsubscribeAll();
    });
    describe("#subscribe", () => {
        context("target is document.body", () => {
            it("add handler is called when the event is fired", (done) => {
                const handler = (event) => {
                    assert(event instanceof Event);
                    done();
                };
                eventObserver.subscribe(document.body, "scroll", handler);
                const event = new Event("scroll");
                document.body.dispatchEvent(event);
            });
        });
        context("target is window", () => {
            it("add handler is called when the event is fired", (done) => {
                const handler = (event) => {
                    assert(event instanceof Event);
                    done();
                };
                eventObserver.subscribe(window, "scroll", handler);
                const event = new Event("scroll");
                window.dispatchEvent(event);
            });
        });
        context("when listen multiple events", () => {
            it("all events are called at once", () => {
                const called = [];
                eventObserver.subscribe(window, "scroll", (event) => {
                    called.push(1);
                });
                eventObserver.subscribe(window, "scroll", (event) => {
                    called.push(2);
                });
                const event = new Event("scroll");
                window.dispatchEvent(event);
                assert.deepEqual(called, [
                    1,
                    2
                ]);
            });
        });
    });
    describe("#unsubscribe", () => {
        it("unSubscribe all -> Actual removeEventListener", () => {
            const handler = () => {
            };
            eventObserver.subscribe(window, "scroll", handler);
            assert(eventObserver.hasListen(window, "scroll"));
            eventObserver.unsubscribe(window, "scroll", handler);
            assert(eventObserver.hasListen(window, "scroll") === false);
        });
    });
    describe("#unsubscribeAll", () => {
        it("unsubscribe all", () => {
            const handler = () => {
            };
            eventObserver.subscribe(window, "scroll", handler);
            eventObserver.subscribe(window, "resize", handler);
            eventObserver.subscribe(document.body, "scroll", handler);
            eventObserver.unsubscribeAll();
            assert(eventObserver.hasListen(window, "scroll") === false);
            assert(eventObserver.hasListen(window, "resize") === false);
            assert(eventObserver.hasListen(document.body, "scroll") === false);
        });
    });
});