(function (fluid) {
    "use strict";
    fluid.defaults("lpg.router", {
        gradeNames: ["fluid.viewComponent"],
        selectors: {
            input:  ".midi-input",
            output: ".midi-output"
        },
        invokers: {
            handleRawInput: {
                funcName: "fluid.notImplemented",
                args:     ["{lpg.router}", "{arguments}.0.data"] // component, MIDI message
            }
        },
        components: {
            midiInputSelector: {
                type: "flock.ui.midiConnector",
                container: "{that}.dom.input",
                options: {
                    portType: "input",
                    components: {
                        connection: {
                            options: {
                                listeners: {
                                    raw: {
                                        func: "{lpg.router}.handleRawInput"
                                    }
                                }
                            }
                        }
                    }
                }
            },
            midiOutputSelector: {
                type: "flock.ui.midiConnector",
                container: "{that}.dom.output",
                options: {
                    portType: "output"
                }
            }
        }
    });
})(fluid);
