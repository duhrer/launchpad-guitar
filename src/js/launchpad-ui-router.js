/* globals flock */
(function (fluid, flock) {
    "use strict";
    var lpg = fluid.registerNamespace("lpg");

    fluid.registerNamespace("lpg.router.ui");

    lpg.router.ui.handleRawInput = function (that, midiMessage) {
        var payloadAsJson = flock.midi.read(midiMessage);
        var destination = fluid.get(that, "output.connection");
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

    lpg.router.ui.paintColours = function (that) {
        fluid.each(lpg.colours, function (velocity, note) {
            var notePaintMesage = flock.midi.write({
                type: "noteOn",
                note: note,
                velocity: velocity
            });
            that.sendRaw(notePaintMesage);
        });
    };

    fluid.defaults("lpg.router.ui", {
        gradeNames: ["lpg.router"],
        invokers: {
            handleRawInput: {
                funcName: "lpg.router.ui.handleRawInput",
                args: ["{lpg.router}", "{arguments}.0.data"]
            }
        },
        components: {
            output: {
                options: {
                    components: {
                        connection: {
                            options: {
                                listeners: {
                                    "onReady.paintColours": {
                                        funcName: "lpg.router.ui.paintColours",
                                        args: ["{that}"]
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    });
})(fluid, flock);
