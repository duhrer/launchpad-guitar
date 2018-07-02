(function (fluid) {
    "use strict";
    var lpg = fluid.registerNamespace("lpg");
    fluid.registerNamespace("lpg.router");

    lpg.router.handleMessage = function (that, midiMessage) {
        if (["noteOn", "noteOff"].indexOf(fluid.get(midiMessage, "type")) === -1) {
            var destination = fluid.get(that, "output.connection");
            if (destination) {
                destination.send(midiMessage);
            }
        }
    };

    fluid.defaults("lpg.router", {
        gradeNames: ["fluid.viewComponent"],
        selectors: {
            input:  ".midi-input",
            output: ".midi-output"
        },
        invokers: {
            handleMessage: {
                funcName: "lpg.router.handleMessage",
                args:     ["{lpg.router}", "{arguments}.0"] // component, MIDI message
            },
            handleNote: {
                funcName: "fluid.notImplemented",
                args:     ["{lpg.router}", "{arguments}.0"] // component, MIDI message
            }
        },
        components: {
            enviro: {
                type: "flock.enviro"
            },
            input: {
                type: "flock.ui.midiConnector",
                container: "{that}.dom.input",
                options: {
                    portType: "input",
                    components: {
                        connection: {
                            options: {
                                listeners: {
                                    message: {
                                        func: "{lpg.router}.handleMessage"
                                    },
                                    note: {
                                        func: "{lpg.router}.handleNote"
                                    }
                                }
                            }
                        }
                    }
                }
            },
            output: {
                type: "flock.ui.midiConnector",
                container: "{that}.dom.output",
                options: {
                    portType: "output"
                }
            }
        }
    });
})(fluid);
