(function (fluid) {
    "use strict";
    var lpg = fluid.registerNamespace("lpg");

    fluid.registerNamespace("lpg.router.ui");

    lpg.router.ui.handleNote = function (that, midiMessage) {
        var destination = fluid.get(that, "output.connection");
        if (destination) {
            // On a NoteOff event, send a noteOn to the note in question with the right colour (velocity).
            if (midiMessage.type === "noteOff") {
                var colourForNote = midiMessage.type = fluid.get(lpg.colours, midiMessage.note) || 12;
                var colouredMidiMessage = fluid.merge({}, midiMessage, { type: "noteOn", velocity: colourForNote });
                destination.send(colouredMidiMessage);
            }
            // On a NoteOn event, send a noteOn to the note in question with a velocity of 12 (off).
            else {
                var uncolouredMidiMessage = fluid.merge({}, midiMessage, { velocity: 12 });
                destination.send(uncolouredMidiMessage);
            }
        }
    };

    lpg.router.ui.paintColours = function (that) {
        fluid.each(lpg.colours, function (velocity, note) {
            that.send({
                type: "noteOn",
                note: note,
                velocity: velocity
            });
        });
    };

    fluid.defaults("lpg.router.ui", {
        gradeNames: ["lpg.router"],
        invokers: {
            handleNote: {
                funcName: "lpg.router.ui.handleNote",
                args: ["{lpg.router}", "{arguments}.0"]
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
})(fluid);
