// LICENSE : MIT
"use strict";
import DOMEventEmitter from "./DOMEventEmitter";
import EventTargetMap from "./EventTargetMap";
/**
 * UIEventObserver class provide performant/simple way to subscribe to browser DOM UI Events.
 * @public
 */
export default class UIEventObserver {
    constructor() {
        this._eventTargetMap = new EventTargetMap();
        this._eventHandlerMap = new EventTargetMap();
    }

    /**
     * registers the specified `handler` on the `target` element it's called `eventName`.
     * @param {Object} target target Element Node
     * @param {string} eventName event name
     * @param {Function} handler event handler
     * @public
     */
    subscribe(target, eventName, handler) {
        let domEventEmitter = this._eventTargetMap.get([eventName, target]);
        if (!domEventEmitter) {
            domEventEmitter = this._createEventEmitter(domEventEmitter);
            this._eventTargetMap.set([eventName, target], domEventEmitter);
            const handler = (event) => {
                domEventEmitter.emit(event);
            };
            this._eventHandlerMap.set([eventName, target], handler);
            target.addEventListener(eventName, handler);
        }
        domEventEmitter.on(handler);
    }

    /**
     * removes the event `handler` previously registered with UIEventObserver#subscribe
     * @param {Object} target target Element Node
     * @param {string} eventName event name
     * @param {Function} handler event handler
     * @public
     */
    unsubscribe(target, eventName, handler) {
        const domEventEmitter = this._eventTargetMap.get([eventName, target]);
        if (!domEventEmitter) {
            return;
        }
        domEventEmitter.removeListener(handler);
        target.removeEventListener(eventName, handler);
        this._eventHandlerMap.delete([eventName, target]);
    }

    /**
     * unsubscribe all events with DOM Event
     * @public
     */
    unsubscribeAll() {
        this._eventTargetMap.forEach((target, eventName) => {
            const handler = this._eventHandlerMap.get([eventName, target]);
            if (handler) {
                this.unsubscribe(target, eventName, handler);
            }
        });
    }

    /**
     * if has a subscriber at least one, return true
     * @param {Object} targetElement
     * @param {string} domEventName
     * @returns {boolean}
     * @public
     */
    hasSubscriber(targetElement, domEventName,) {
        return this._eventHandlerMap.has([domEventName, targetElement]);
    }

    /**
     * @param eventName
     * @returns {DOMEventEmitter}
     * @private
     */
    _createEventEmitter(eventName) {
        return new DOMEventEmitter(eventName);
    }
}