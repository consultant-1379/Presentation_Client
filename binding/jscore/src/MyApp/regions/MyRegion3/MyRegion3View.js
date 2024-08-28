define([
    "jscore/core",
    "text!./MyRegion3.html",
    "text!./MyRegion3.css"
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