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
        context("return values", () => {
            it("is unsubscribe function bind arguments", () => {
                const called = [];
                const handler = (event) => {
                    called.push(event);
                };
                const unsubscribe = eventObserver.subscribe(window, "scroll", handler);
                assert(typeof unsubscribe === "function");
                assert(called.length === 0);
                // unsubscribe
                unsubscribe();
                // fire
                const event = new Event("scroll");
                window.dispatchEvent(event);
                assert(called.length === 0);
            });
        });
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
    describe("#subscribeOnce", () => {
        context("when fire it once", () => {
            it("should automatically unsubscribe", () => {
                const called = [];
                const handler = (event) => {
                    called.push(event);
                };
                const unsubscribe = eventObserver.subscribeOnce(window, "scroll", handler);
                assert(typeof unsubscribe === "function");
                assert(called.length === 0);
                // fire
                window.dispatchEvent(new Event("scroll"));
                assert(called.length === 1);
                // fire twice, but is not called
                window.dispatchEvent(new Event("scroll"));
                assert(called.length === 1);
            });
        });
    });
    describe("#unsubscribe", () => {
        it("unSubscribe all -> Actual removeEventListener", () => {
            const handler = () => {
            };
            eventObserver.subscribe(window, "scroll", handler);
            assert(eventObserver.hasSubscriber(window, "scroll"));
            eventObserver.unsubscribe(window, "scroll", handler);
            assert(eventObserver.hasSubscriber(window, "scroll") === false);
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
            assert(eventObserver.hasSubscriber(window, "scroll") === false);
            assert(eventObserver.hasSubscriber(window, "resize") === false);
            assert(eventObserver.hasSubscriber(document.body, "scroll") === false);
        });
    });
});