const writeStateEntryToElement = require('./write-state-entry-to-element');

const writeStateToElement = ({
    debug=false,
    element=document.body,
    state
}) => {
    Object.entries(state).map(([key, value]) => {
        writeStateEntryToElement({ debug, element, key, value });
    });
};

module.exports = writeStateToElement;

if (typeof window !== undefined) window.writeStateToElement = writeStateToElement;
