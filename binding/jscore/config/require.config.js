/*global require*/
require.config({
    "baseUrl": "src",
    "paths": {
        "text": "../lib/require/text",
        "jscore/handlebars/handlebars": "../lib/handlebars/handlebars",
        "template": "../lib/require/template",
        "jscore/less/less": "../lib/less/less",
        "styles": "../lib/require/styles",
    },
    shim: {
        "jscore/ext/drawing/Pie": {
            deps: ["jscore/ext/drawing"]
        },
        "jscore/ext/mvp": {
            deps: ["jscore/core"]
        }
    }
});