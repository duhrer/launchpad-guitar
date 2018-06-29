/* globals flock */
(function (fluid, flock) {
    "use strict";
    var environment = flock.init(); // eslint-disable-line no-unused-vars

    var lpg = fluid.registerNamespace("lpg");

    fluid.registerNamespace("lpg.router.ui");

    lpg.router.ui.handleRawInput = function (that, midiMessage) {
        var payloadAsJson = flock.midi.read(midiMessage);
        var destination = fluid.get(that, "midiOutputSelector.connection");
        if (destination) {
            // On a NoteOff event, send a noteOn to the note in question with the right colour (velocity).
            if (payloadAsJson.type === "noteOff") {
                var colourForNote = payloadAsJson.type = fluid.get(lpg.colours, payloadAsJson.note) || 12;
                var colouredJsonPayload = fluid.merge({}, payloadAsJson, { type: "noteOn", velocity: colourForNote });
                destination.sendRaw(flock.midi.write(colouredJsonPayload));
            }
            // On a NoteOn event, send a noteOn to the note in question with a velocity of 12 (off).
            else {
                var uncolouredJsonPayload = fluid.merge({}, payloadAsJson, { velocity: 12 });
                destination.sendRaw(flock.midi.write(uncolouredJsonPayload));
            }
        }
    };

    // TODO: Send notes to the instrument once the output is connected so that we can "paint" it with the starting colours.

    fluid.defaults("lpg.router.ui", {
        gradeNames: ["lpg.router"],
        invokers: {
            handleRawInput: {
                funcName: "lpg.router.ui.handleRawInput",
                args: ["{lpg.router}", "{arguments}.0.data"]
            }
        }
    });
})(fluid, flock);
