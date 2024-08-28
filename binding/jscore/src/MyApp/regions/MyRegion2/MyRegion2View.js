define([
    "jscore/core",
    "text!./MyRegion2.html",
    "text!./MyRegion2.css"
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