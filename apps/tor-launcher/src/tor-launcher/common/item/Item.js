define([
    'Titan',
    'template!./template.html',
    'styles!./styles.less',
    '../tooltip/Tooltip'
], function (Titan, template, styles, Tooltip) {

    return Titan.View.extend({

        template:template,

        styles: styles,

        events:{
            'click .w-Item-label': 'onLaunch',
            'click .w-Item-favIcon': 'onFavoriteClicked',
            'click .w-Item-infoIcon': 'onInfoClicked',
            'mousedown .w-Item-link': 'onItemMouseDown'
        },

        init:function () {
            this.model.view = this;
            this.model.bind('change', function() {
                this.render();
            }, this);
            this.options.eventBus.bind("pageClicked", Titan.bind(this.pageClicked, this));
        },

        pageClicked: function(e) {
            if(e.target != this.$(".w-Item-infoIcon")[0]) {
                this.$el.removeClass("w-Item-selected");
            }
        },

        onLaunch: function(e) {
           // console.log( this.model.get("id"));
        // window.location = "rest/apps/" + this.model.get("id") + ".ica" + params
           // e.preventDefault();
        },

        onFavoriteClicked:function (e) {
            var $selectedApp = this.$(".w-Item-favIcon");

            var favorite = true;
            if ($selectedApp.hasClass("w-Item-favIcon_favorited")) {
                favorite = false;
            }
            this.options.favoritesModel.save({
                id: this.model.get('id'),
                favorite: favorite
            }, {
                success: function(model, response) {
                    if (favorite) {
                        $selectedApp.addClass("w-Item-favIcon_favorited");
                    } else {
                        $selectedApp.removeClass("w-Item-favIcon_favorited");
                    }
                }
            });
            e.preventDefault();
        },

        onInfoClicked:function (e) {
            if (!this.tooltip) {
                this.tooltip = new Tooltip({
                    eventBus: this.options.eventBus,
                    infoButton: this.$(".w-Item-infoIcon").length > 0 ? this.$(".w-Item-infoIcon")[0] : null
                });
                this.$el.append(this.tooltip.$el);
                this.$el.addClass("w-Item-selected");
                this.tooltip.show(this.model.get("shortInfo"));
            } else if (this.tooltip.$el.css("display") == "none") {
                this.$el.addClass("w-Item-selected");
                this.tooltip.show();
            } else {
                this.$el.removeClass("w-Item-selected");
                this.tooltip.hide();
            }
            e.preventDefault();
        },

        onItemMouseDown: function(e) {
            e.preventDefault();
        }

    });

});