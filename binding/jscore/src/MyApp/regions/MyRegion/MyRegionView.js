define([
    "jscore/core",
    "text!./MyRegion.html",
    "text!./MyRegion.css"
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