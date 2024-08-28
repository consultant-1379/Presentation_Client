define([
    'Titan',
    './AppListView',
    'tor-launcher/common/item/Item',
    './header/Header',
    './emptyfav/EmptyFavPage'
], function (Titan, View, Item, Header, EmptyFavPage) {

    return Titan.Presenter.extend({

        windowHeight: null,

        init:function () {
            this.view = new View({
                eventBus: this.eventBus
            });

            this.eventBus.bind("reflowApps", Titan.bind(this.reflowApps, this));
            this.collection.on('reset',  this.onLoad, this);

            var appListView = this.view['appListContent'];
            appListView.$el.find(".w-AppList-container").bind("scroll", function(e) {
                appListView.checkScroller();
            });
            //appListView.checkScroller(appListView.$el.find(".w-AppList-container"));
        },

        onLoad:function () {
            this.view['appListContent'].$el.html('<div class="w-AppList-listColumn"></div>');

            this.collection.each(this.renderGroups, this);
            this.windowHeight = null;
            this.reflowApps();

            var self = this;
            this.eventBus.bind("windowResize", Titan.bind(this.reflowApps, this));
            this.eventBus.bind("reflowApps", Titan.bind(this.reflowApps, this));
        },

        renderGroups:function (model) {
            if (model.has('apps')) {
                var header = new Header({
                    model: model,
                    eventBus: this.eventBus
                });
                this.view['appListContent'].$el.find('.w-AppList-listColumn').append(header.getElement());
                var apps = model.get('apps');

                var appCollection = new Titan.Collection(apps);

                this.group_id = model.get("id");

                appCollection.each(this.renderApps, this);

            } else {
                this.renderApps(model);
            }
        },

        renderApps:function (model) {
            model.set("group_id", this.group_id);
            var item = new Item({
                model:model,
                eventBus:this.eventBus,
                favoritesModel: this.model
            });
            this.view['appListContent'].$el.find('.w-AppList-listColumn').append(item.getElement());
        },

        reflowApps: function (force) {
            var reflowWindowHeight = window.innerHeight;
            var $applicationList = this.view['appListContent'].$el;
            var containerHeight = $applicationList.parent().height();
            var $columns = $applicationList.find(".w-AppList-listColumn");

            if ($columns.length == 0) {
                $applicationList.width('100%');
                return;
            }

            for (var i = 0; i < $columns.length; i++) {
                var $thisColumn = $columns.filter($columns[i]);
                var $nextColumn = $thisColumn.next(".w-AppList-listColumn");

                var $thisColumnItems = $thisColumn.find("div");
                var $nextColumnItems = $nextColumn.find("div");

                if (force || this.windowHeight && reflowWindowHeight > this.windowHeight) {

                    var j = 0;
                    var thisColumnHeight = $thisColumn.height();

                    var listItemsToMove = [];
                    var $nextColumnItem = $nextColumn.find("div:first-child");
                    while ($nextColumnItem && $nextColumnItem.length != 0 && thisColumnHeight + $nextColumnItem.outerHeight(true) < containerHeight) {

                        thisColumnHeight += $nextColumnItem.outerHeight(true);
                        listItemsToMove.push($nextColumnItem[0]);
                        $nextColumnItem = $nextColumnItem.next("div");
                        if ($nextColumnItem == null || $nextColumnItem.length == 0) {
                            $nextColumn.detach();
                            $nextColumn = $thisColumn.next(".w-AppList-listColumn");
                            $nextColumnItem = $nextColumn.find("div:first-child");
                        }
                    }
                    if (listItemsToMove.length > 0) {
                        $thisColumn.append(listItemsToMove);
                    }
                }

                if (force || reflowWindowHeight < this.windowHeight || this.windowHeight == null) {
                    var k = 0;
                    var thisColumnHeight = $thisColumn.height();
                    var $thisColumnItem = $thisColumn.find("div:last-child");
                    while (thisColumnHeight > containerHeight-20) {


                        thisColumnHeight -= $thisColumnItem.outerHeight(true);
                        k++;
                        $thisColumnItem = $thisColumnItem.prev("div");
                    }
                    if (k > 0) {
                        if ($nextColumn == null || $nextColumn.length == 0) {
                            $nextColumn = new Titan.Element('<div class="w-AppList-listColumn"></div>').$el;
                            $applicationList.append($nextColumn);
                        }
                        var $listItemsToMove = $thisColumnItems.slice($thisColumnItems.length - k, $thisColumnItems.length);
                        $listItemsToMove.prependTo($nextColumn);
                    }
                }

                if ($nextColumn && $nextColumn.find("div").length == 0) {
                    $nextColumn.detach();
                    $nextColumn = null;
                }
                $columns = this.view['appListContent'].$el.find(".w-AppList-listColumn");
            }
            this.windowHeight = window.innerHeight;
            $applicationList.width((345*($columns.length))+250);
            this.eventBus.trigger("tor-launcher-ApplicationListView-checkScroller");
        },

        showEmptyFavMessage: function() {
            var $applicationList = this.view['appListContent'].$el;
            $applicationList.css('width', '100%');

            var emptyFavPage = new EmptyFavPage();
            $applicationList.html('').append(emptyFavPage.getElement());
        }

    });

});