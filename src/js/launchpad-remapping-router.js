/* globals flock */
(function (fluid, flock) {
    "use strict";
    var lpg = fluid.registerNamespace("lpg");

    fluid.registerNamespace("lpg.router.remapping");

    lpg.router.remapping.handleRawInput = function (that, midiMessage) {
        var payloadAsJson = flock.midi.read(midiMessage);
        var destination = fluid.get(that, "output.connection");
        if (destination) {
            var note = fluid.get(payloadAsJson, "note");
            var offset = fluid.get(lpg.offsets, note);
            if (note !== undefined && offset !== undefined) {
                var remappedJsonPayload = fluid.merge({}, payloadAsJson, { note: note + offset });
                destination.sendRaw(flock.midi.write(remappedJsonPayload));
            }
            else {
                destination.sendRaw(midiMessage);
            }
        }
    };

    fluid.defaults("lpg.router.remapping", {
        gradeNames: ["lpg.router"],
        invokers: {
            handleRawInput: {
                funcName: "lpg.router.remapping.handleRawInput",
                args: ["{lpg.router}", "{arguments}.0.data"]
            }
        }
    });
})(fluid, flock);
