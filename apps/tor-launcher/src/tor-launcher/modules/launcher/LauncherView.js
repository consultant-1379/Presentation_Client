define([
    'Titan',
    'template!./template.html',
    'styles!./styles.less'
], function (Titan, template, styles) {

    return Titan.View.extend({

        template:template,

        styles:styles,

        groupSelectorCollapse: function(collapsed) {
            if (collapsed) {
                this.$(".tor-Launcher-content").animate({
                    left: "0"
                });
            } else {
                this.$(".tor-Launcher-content").animate({
                    left: "240px"
                })
            }
        }

    });

});