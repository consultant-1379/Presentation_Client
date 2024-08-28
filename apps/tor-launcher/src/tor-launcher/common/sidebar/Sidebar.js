define([
    'Titan',
    'template!./template.html',
    'styles!./styles.less',
    'tor-launcher/config/sortlist'
], function (Titan, template, styles, sortList) {

    var STYLE_SELECTED = 'w-Sidebar-listItemLink_selected';

    return  Titan.View.extend({

        template: template,

        styles: styles,

        sortList: sortList,

        events: {
            'click .w-Sidebar-handle': 'onHandleClicked'
        },

        setSelectedFolder: function (link) {
            this.$('.w-Sidebar-listItemLink').removeClass(STYLE_SELECTED);
            this.$('.w-Sidebar-listItemLink[data-id="' + link + '"]').addClass(STYLE_SELECTED);
        },

        onHandleClicked: function (e) {
            var $this=this;

            if ($this.$(e.currentTarget).hasClass("w-Sidebar-handle_collapsed")) {

                $this.options.eventBus.trigger("collapseSidebar", false);

                // TODO: do not try to find classes outside widget!
                $this.$el.closest(".tor-Launcher-sidebar").animate({
                    left: "0"
                }, function() {
                    $this.$(e.currentTarget).removeClass("w-Sidebar-handle_collapsed");
                });

            } else {
                $this.options.eventBus.trigger("collapseSidebar", true);

                // TODO: do not try to find classes outside widget!
                $this.$el.closest(".tor-Launcher-sidebar").animate({
                    left: "-240px"
                }, function() {
                    $this.$(e.currentTarget).addClass("w-Sidebar-handle_collapsed");
                });

            }
        }

    });


});