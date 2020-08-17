function writeStateEntryToElement ({
    debug=false,
    element=document.body,
    key,
    value=null
}) {
    if (debug) console.log("starting writeStateEntryToBody with", [ key, value ]);
    if (value === undefined || value === null) value = 'none';
    if (key instanceof Promise) return; // don't write promises
    element.setAttribute('data-state-' + key, value);
};

module.exports = writeStateEntryToElement;

if (typeof window !== undefined) window.writeStateEntryToElement = writeStateEntryToElement;
