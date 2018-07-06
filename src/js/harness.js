
(function (fluid) {
    "use strict";
    var lpg = fluid.registerNamespace("lpg");
    fluid.registerNamespace("lpg.harness");

    lpg.harness.forwardNote = function (that, midiMessage) {
        var inputConnection = fluid.get(that, "input.connection");
        if (inputConnection) {
            inputConnection.events.note.fire(midiMessage);
        }
    };

    fluid.defaults("lpg.harness", {
        gradeNames: ["fluid.viewComponent"],
        components: {
            ui: {
                type: "lpg.router.ui",
                container: ".ui-router",
                options: {
                    components: {
                        svg: {
                            options: {
                                listeners: {
                                    "note.forwardNote": {
                                        funcName: "lpg.harness.forwardNote",
                                        args:     ["{lpg.router.remapping}", "{arguments}.0"]
                                    }
                                }
                            }
                        }
                    }
                }
            },
            remapping: {
                type: "lpg.router.remapping",
                container: ".remapping-router"
            }
        }
    });
})(fluid);
