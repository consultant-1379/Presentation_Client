define([
    "jscore/core",
    "text!./MyRegion4.html",
    "text!./MyRegion4.css"
], function(core, template, style) {

    return core.View.extend({

        getTemplate: function() {
            return template;
        },

        getStyle: function() {
            return style;
        }

    });

});