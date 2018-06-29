/* eslint-env node */
// The main file that is included when you run `require("launchpad-guitar")`.
"use strict";
var fluid = require("infusion");

// Register our content so it can be used with calls like fluid.module.resolvePath("%launchpad-guitar/path/to/content.js");
fluid.module.register("launchpad-guitar", __dirname, require);
