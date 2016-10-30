// LICENSE : MIT
"use strict";
const EventEmitter = require("events");
/**
 * The EventEmitter bind `eventName`
 */
export default class DOMEventEmitter extends EventEmitter {
    constructor(eventName) {
        super();
        this.eventName = eventName;
        this.setMaxListeners(0);
    }

    on(handler) {
        super.on(this.eventName, handler);
    }

    emit(event) {
        super.emit(this.eventName, event);
    }

    removeListener(handler) {
        super.removeListener(this.eventName, handler);
    }
}
