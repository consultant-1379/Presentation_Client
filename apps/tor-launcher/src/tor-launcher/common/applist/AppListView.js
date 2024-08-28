define([
    'Titan',
    'template!./template.html',
    'styles!./styles.less'
], function(Titan, template, styles) {

    return Titan.View.extend({

        template: template,

        styles: styles,

        events: {
            'mousewheel .w-AppList-list': 'onAppListScroll',
            'click .w-AppList-list-header': 'toggleVisible',
            'click .w-AppList-scrollRight': 'onScrollRightClicked',
            'click .w-AppList-scrollLeft': 'onScrollLeftClicked'
        },

        init: function() {
            var self = this;
            this.$(".w-AppList-container").bind("scroll", function(e) {
                self.checkScroller();
            });
            this.checkScroller();
            this.options.eventBus.bind("tor-launcher-ApplicationListView-checkScroller", Titan.bind(this.checkScroller, this));
        },

        toggleVisible: function(e) {
            var $this = (new Titan.Element(e.currentTarget)).$el;
            if ($this.hasClass("w-AppList-listHeader_collapsed")) {
                this.$('.w-AppList-listItem[data-group-id=' + $this.attr("data-group-id") + "]:not(.w-AppList-listHeader)").css({
                    display: 'block'
                });
                $this.removeClass('w-AppList-listHeader_collapsed');
            } else {
                this.$('.w-AppList-listItem[data-group-id=' + $this.attr("data-group-id") + "]:not(.w-AppList-listHeader)").css({
                    display: 'none'
                });
                $this.addClass('w-AppList-listHeader_collapsed');
            }
            var self = this;
            self.options.eventBus.trigger("reflowApps", true);
        },

        onAppListScroll: function(e) {
            var scrollChange = e.originalEvent.wheelDeltaY;
            this.$(".w-AppList-container")[0].scrollLeft -= scrollChange;
        },

        onScrollRightClicked: function(e) {

            var self = this;
            var $container = this.$(".w-AppList-container");
            var columnWidth = this.$(".w-AppList-listColumn").outerWidth(true);
            var containerPadding = parseInt(this.$('.w-AppList-list').css('paddingLeft')) +  parseInt(this.$('.w-AppList-list').css('paddingRight'));
            var atColumn = Math.floor($container.scrollLeft()/columnWidth);
            if ($container.scrollLeft() > 0) {
                atColumn++;
            }
            var numOfColumnsShown = Math.floor(($container.width() - containerPadding - (columnWidth-($container.scrollLeft()%columnWidth)))/columnWidth);
            if ($container.scrollLeft() == 0) {
                numOfColumnsShown++;
            }
            $container.animate({scrollLeft: ((atColumn+numOfColumnsShown)*columnWidth)});
        },

        onScrollLeftClicked: function(e) {
            var self = this;
            var $container = this.$(".w-AppList-container");
            var columnWidth = this.$(".w-AppList-listColumn").outerWidth(true);
            var atColumn = Math.floor($container.scrollLeft()/columnWidth);
            if ($container.scrollLeft()%columnWidth > 0) {
                atColumn++;
            }
            var columnsPerPage = Math.floor($container.width()/columnWidth);
            var moveToColumn = atColumn-columnsPerPage;
            if (moveToColumn < 0) {
                moveToColumn = 0;
            }
            $container.animate({scrollLeft: moveToColumn*columnWidth});
        },

        checkScroller: function() {
            var $container = this.$(".w-AppList-container");
            if ($container.scrollLeft() == 0) {
                $container.siblings(".w-AppList-scrollLeft").css("display", "none");
            } else {
                $container.siblings(".w-AppList-scrollLeft").css("display", "block");
            }
            // +100 padding
            if ($container.scrollLeft() + $container.width() + 100 - $container[0].scrollWidth == 0) {
                $container.siblings(".w-AppList-scrollRight").css("display", "none");
            } else {
                $container.siblings(".w-AppList-scrollRight").css("display", "block");
            }
        }

    });

});