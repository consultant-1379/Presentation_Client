define([
    'Titan',
    'template!./template.html',
    'styles!./styles.less'
], function (Titan, template, styles) {

    return  Titan.View.extend({

        template: template,

        styles: styles,

        init: function() {
            this.options.eventBus.bind("pageClicked", Titan.bind(this.pageClicked, this));
        },

        pageClicked: function(e) {
            if(e.target != this.options.infoButton) {
                this.hide();
            }
        },

        show: function (content) {
            if (content) {
                this.$(".w-Tooltip-content-text").html(content);
            }
            this.$el.css({display: "block"});
        },

        hide: function () {
            this.$el.css({display: "none"});
        }
    });


});