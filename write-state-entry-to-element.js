function writeStateEntryToElement (key, value, options) {
    var debug = options && options.debug || false;
    if (debug) console.log("starting writeStateEntryToElement with", [ key, value ]);
    var element = options && options.element || document.body;
    if (value === undefined || value === null) value = 'none';
    if (key instanceof Promise) return; // don't write promises
    element.setAttribute('data-state-' + key, value);
}
