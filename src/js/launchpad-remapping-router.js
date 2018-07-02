(function (fluid) {
    "use strict";
    var lpg = fluid.registerNamespace("lpg");

    fluid.registerNamespace("lpg.router.remapping");

    lpg.router.remapping.handleNote = function (that, midiMessage) {
        var destination = fluid.get(that, "output.connection");
        if (destination) {
            var note = fluid.get(midiMessage, "note");
            var offset = fluid.get(lpg.offsets, note);
            if (note !== undefined && offset !== undefined) {
                var offsetMidiMessage = fluid.merge({}, midiMessage, { note: note + offset });
                destination.send(offsetMidiMessage);
            }
            else {
                destination.send(midiMessage);
            }
        }
    };

    fluid.defaults("lpg.router.remapping", {
        gradeNames: ["lpg.router"],
        invokers: {
            handleNote: {
                funcName: "lpg.router.remapping.handleNote",
                args: ["{lpg.router}", "{arguments}.0"]
            }
        }
    });
})(fluid);
