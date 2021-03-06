/* eslint-env node */
"use strict";
module.exports = function (grunt) {
    grunt.initConfig({
        lintAll: {
            sources: {
                md:    [ "./*.md"],
                js:    ["./src/**/*.js", "./*.js"],
                json:  ["./*.json"],
                json5: [],
                other: ["./.*"]
            }
        }
    });

    grunt.loadNpmTasks("gpii-grunt-lint-all");
    grunt.registerTask("lint", "Perform all standard lint checks.", ["lint-all"]);
};
