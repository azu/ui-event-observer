// LICENSE : MIT
"use strict";
const {MapLike} = require("map-like");
/**
 * EventTargetMap use `eventName` and `target` as a key.
 * It means that [eventName, target] tuple object as a key.
 */
export default class EventTargetMap {
    constructor() {
        this._eventMap = new MapLike();
    }

    /**
     * @param {string} eventName
     * @param {Object} target
     * @param {*} handler
     */
    set([eventName, target], handler) {
        const targetMap = this._getTargetMap(eventName);
        targetMap.set(target, handler)
    }

    /**
     *
     * @param {string} eventName
     * @param {Object} target
     * @returns {MapLike}
     */
    get([eventName, target]) {
        const targetMap = this._getTargetMap(eventName);
        return targetMap.get(target);
    }

    /**
     * @param {string} eventName
     * @param {Object} target
     * @returns {boolean}
     */
    has([eventName, target]) {
        const targetMap = this._getTargetMap(eventName);
        return targetMap.has(target);
    }

    /**
     * @param {function(target,eventName)}handler
     */
    forEach(handler) {
        this._eventMap.forEach((targetMap, eventName) => {
            targetMap.forEach((targetEventEmitter, target) => {
                handler(target, eventName);
            });
        });
    }

    /**
     * @param {string} eventName
     * @param {Object} target
     * @returns {boolean}
     */
    delete([eventName, target]) {
        const targetMap = this._getTargetMap(eventName);
        if (targetMap) {
            targetMap.delete(target);
        }
    }

    /**
     *
     * @param {string} eventName
     * @returns {MapLike} targetMap
     * @private
     */
    _getTargetMap(eventName) {
        let targetMap = this._eventMap.get(eventName);
        if (!targetMap) {
            targetMap = new MapLike();
            this._eventMap.set(eventName, targetMap);
        }
        return targetMap;
    }
}