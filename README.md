# ui-event-observer [![Build Status](https://travis-ci.org/azu/ui-event-observer.svg?branch=master)](https://travis-ci.org/azu/ui-event-observer)

Provide performant/simple way to subscribe to browser DOM UI Events.

You can use a single `addEventListener` instead of multiple `addEventListener` for DOM UI Events by `UIEventObserver`.

![addEventListener vs, UIEventObserver](https://monosnap.com/file/0L7z5AvZcuLKbCHxqB4sTU8TjRK0pk.png)

- Left: 100x `addEventListener`
- Right: 1 `UIEventObserver`

## Features

-   Provide Observer for `addEventListener`
    -   With `subscribe-ui-event`, instead of calling multiple `window.addEventListener('scroll', eventHandler)` by different components, call `subscribe(window, 'scroll', eventHandler)`.
    -   It will only add **a single** event listener and dispatch event to those who subscribe the event via EventEmitter.
-   Lightweight: 5kb(gzip)

Related library:

-   [yahoo/subscribe-ui-event: subscribe-ui-event provides an cross-browser and performant way to subscribe to browser UI Events.](https://github.com/yahoo/subscribe-ui-event "yahoo/subscribe-ui-event: subscribe-ui-event provides an cross-browser and performant way to subscribe to browser UI Events.")

## Install

Install with [npm](https://www.npmjs.com/):

    npm install ui-event-observer

## Example

```js
// singleton
const eventObserver = require("ui-event-observer");
const handler = (event) => {
    // do something
};
// subscribe
eventObserver.subscribe(window, "scroll", handler);
// fire by interaction
const event = new Event("scroll");
window.dispatchEvent(event);
// unsubscribe
eventObserver.unsubscribe(window, "scroll", handler);
// unsubscribe all
eventObserver.unsubscribeAll();
```

You can also use `UIEventObserver` class:

```js
const UIEventObserver = require("ui-event-observer").UIEventObserver
```

## Usage

### `UIEventObserver`

UIEventObserver class provide performant/simple way to subscribe to browser DOM UI Events.

#### `subscribe(target: Object, eventName: string, handler: Function)`

registers the specified `handler` on the `targetElement` it's called `domEventName`.

**Parameters**

-   `target`: **[Object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)** - target Element Node
-   `eventName`: **[string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** - event name
-   `handler`: **[Function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/function)** - event handler

#### `unsubscribe(target: Object, eventName: string, handler: Function)`

removes the event `handler` previously registered with UIEventObserver#subscribe

**Parameters**

-   `target`: **[Object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)** - target Element Node
-   `eventName`: **[string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** - event name
-   `handler`: **[Function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/function)** - event handler

#### `unsubscribeAll()`

unsubscribe all events includes DOM Event

#### `hasListen(targetElement: Object, domEventName: string): boolean`

**Parameters**

-   `targetElement`: **[Object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)**
-   `domEventName`: **[string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)**

Returns: **[boolean](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Boolean)**

## Changelog

See [Releases page](https://github.com/azu/ui-event-observer/releases).

## Running tests

Install devDependencies and Run `npm test`:

    npm i -d && npm test

## Contributing

Pull requests and stars are always welcome.

For bugs and feature requests, [please create an issue](https://github.com/azu/ui-event-observer/issues).

1.  Fork it!
2.  Create your feature branch: `git checkout -b my-new-feature`
3.  Commit your changes: `git commit -am 'Add some feature'`
4.  Push to the branch: `git push origin my-new-feature`
5.  Submit a pull request :D

## Author

-   [github/azu](https://github.com/azu)
-   [twitter/azu_re](https://twitter.com/azu_re)

## License

MIT © azu
