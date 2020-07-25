(function (fluid) {
    "use strict";
    var lpg = fluid.registerNamespace("lpg");
    fluid.registerNamespace("lpg.colours");
    lpg.colours.velocityByNote = {
        // Eighth "high D" string is playable but unlit.
        0: 0,
        1: 0,
        2: 0,
        3: 0,
        4: 0,
        5: 0,
        6: 0,
        7: 0,
        8: 0,
        // Seventh "high A"string is playable but unlit.
        16: 0,
        17: 0,
        18: 0,
        19: 0,
        20: 0,
        21: 0,
        22: 0,
        23: 0,
        24: 0,
        // "high E" string => 15
        32: 15,
        33: 15,
        34: 15,
        35: 15,
        36: 15,
        37: 15,
        38: 15,
        39: 15,
        40: 15,
        // "B" string => 60
        48: 60,
        49: 60,
        50: 60,
        51: 60,
        52: 60,
        53: 60,
        54: 60,
        55: 60,
        56: 60,
        // "G" string => 63
        64: 63,
        65: 63,
        66: 63,
        67: 63,
        68: 63,
        69: 63,
        70: 63,
        71: 63,
        72: 63,
        // "D" string => 29
        80: 29,
        81: 29,
        82: 29,
        83: 29,
        84: 29,
        85: 29,
        86: 29,
        87: 29,
        88: 29,
        // "A" string => 58
        96: 58,
        97: 58,
        98: 58,
        99: 58,
        100: 58,
        101: 58,
        102: 58,
        103: 58,
        104: 58,
        // "low E" string => 15
        112: 15,
        113: 15,
        114: 15,
        115: 15,
        116: 15,
        117: 15,
        118: 15,
        119: 15,
        120: 15
    };

    lpg.colours.htmlColourByVelocity = {
        12: "white",
        15: "#c71a1a",
        29: "#716631",
        58: "#d9cf3a",
        60: "#32c045",
        63: "#dfb379"
    };
})(fluid);
