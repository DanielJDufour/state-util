const writeStateEntryToElement = require('./write-state-entry-to-element');
const writeStateToElement = require('./write-state-to-element');

const connectStateToElement = ({
    debug=false,
    element=document.body,
    state
}) => {
    if (debug) console.log("[state-util] connecting state to an element");
    // initialize state that will hold state values
    const _state = {};

    // save existing state properties to an internal element called _state
    Object.assign(_state, state);

    // replace values with proxies
    for (let key in state) {
        if (state.hasOwnProperty(key)) {
            Object.defineProperty(state, key, {
                get: function () {
                    return this._state[key];
                },
                set: function (value) {
                    if (debug) console.log(`setting ${key} to`, value);
                    this._state[key] = value;
                    if (debug) console.log(`writing ${key} to`, element);
                    writeStateEntryToElement({ debug, element, key, value });
                }
            })
        }
    }

    // reconnect old state
    Object.defineProperty(state, '_state', {
        configurable: false,
        enumerable: false,
        writable: false,
        value: _state
    });

    // first write of state to element
    writeStateToElement({ debug, element, state: state._state });

    if (debug) console.log("[state-util] finished connecting state to an element");
};

module.exports = connectStateToElement;

if (typeof window !== undefined) window.connectStateToElement = connectStateToElement;
