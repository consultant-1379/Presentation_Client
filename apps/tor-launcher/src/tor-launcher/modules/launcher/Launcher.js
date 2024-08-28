define([
    'Titan',
    './LauncherView',
    'tor-launcher/common/sidebar/Sidebar',
    'tor-launcher/common/search/Search',
    'tor-launcher/common/applist/AppList'
], function (Titan, View, SidebarWidget, SearchWidget, AppListWidget) {

    var ListCollection = Titan.Collection.extend({
        url: "/rest/apps",
//        url: "src/tor-launcher/config/fakerest.json",
        parse: function (res) {
            if (res.constructor != Array) {
                return res.apps;
            } else {
                return res;
            }
        }
    });

    var listCollection = new ListCollection();

    var searchCollection = new ListCollection();

    var FavoritesSettings = Titan.Model.extend({
        url: '/rest/ui/settings/favorites'
    });

    var favoritesSettings = new FavoritesSettings();

    return Titan.Presenter.extend({

        View: View,

        init: function () {
            //favoritesSettings.fetch();
            var self = this;
            setTimeout(function () {
                var logout = new Titan.Element('<a class="cont-topBar-logout" href="/rest/logout">Logout</a>');

                self.view.$el.closest('#Container').prev('.cont-topBar').append(logout.$el);
                logout.$el.click(function (e) {
                    e.preventDefault();
                    var href = logout.$el.attr('href');
                    Titan.ajax({
                        url:href,
                        type: 'GET',
                            success: function() {
                            setTimeout(function(){
                                location.href = '/login';
                            },100);
                        }
                    });




                });
            }, 100);

            window.onresize = function (e) {
                self.eventBus.trigger("windowResize");
            };
            this.view.$el.click(function (e) {
                self.eventBus.trigger("pageClicked", e);
            });
            window.ontouchstart = function(e){
                self.eventBus.trigger("pageClicked", e);
            }
            if (!("ontouchstart" in document.documentElement)) {
                this.view.$el.addClass("no-touch");
            }
            this.sidebarWidget = new SidebarWidget({
                eventBus: this.eventBus
            });
            this.searchWidget = new SearchWidget({
                eventBus: this.eventBus,
                model: favoritesSettings,
                searchCollection: searchCollection
            });
            this.appListWidget = new AppListWidget({
                collection: listCollection,
                model: favoritesSettings,
                eventBus: this.eventBus
            });
            this.searchWidget.start(this.view['search']);
            this.view['sidebar'].setWidget(this.sidebarWidget);
            this.appListWidget.start(this.view['appList']);
            this.eventBus.bind("collapseSidebar", Titan.bind(this.groupSelectorCollapse, this));
            searchCollection.fetch();
        },

        apps: function (place) {
            var link = place.id;
            this.sidebarWidget.setSelectedFolder(link);
            listCollection.url = "/rest/" + link;
//            listCollection.url =  "src/tor-launcher/config/fakerest.json";
            this.reloadApplicationList(link);
        },

        reloadApplicationList: function (link) {
            var self = this;
            listCollection.fetch({
                success: function (collection, response) {
                    if (link == 'favorites' && response.length < 1) {
                        self.appListWidget.showEmptyFavMessage();
                    }
                },
                error:function(){
                    window.location='/login'
                }
            })
        },

        groupSelectorCollapse: function (collapsed) {
            this.view.groupSelectorCollapse(collapsed);
        }

    });

});