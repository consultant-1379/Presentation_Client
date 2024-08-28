define([
    'Titan',
    './SearchView',
    'tor-launcher/common/item/Item'
], function (Titan, View, Item) {

    return Titan.Presenter.extend({

        init: function () {
            this.view = new View({
                eventBus: this.eventBus
            });
            this.eventBus.bind("onSearchFieldKeyUp", Titan.bind(this.onSearchFieldKeyUp, this));
        },

        onSearchFieldKeyUp: function (searchTerm) {
            var self = this;
            this.view['searchResults'].$el.html('');
            if (searchTerm.length > 0) {
                this.view.$(".w-Search-cancel").css({display: "inline"});
            } else {
                this.view.$(".w-Search-cancel").css({display: "none"});
            }
            if (searchTerm != "" && searchTerm.length > 1) {
                var searchResults = new Titan.Collection();
                this.options.searchCollection.each(function (app) {
                    var regex = new RegExp("\\b" + searchTerm, "gi");
                    var appName = app.get("name");
                    var matches = (appName != undefined) ? appName.match(regex) : null;

                    if (matches != null && matches.length > 0) {
                        var attributes = app.attributes;
                        attributes.matches = matches;
                        searchResults.add(new Titan.Model(attributes));
                    }
                });

                if (searchResults.length > 0) {
                    this.view.addResultsHighlight();
                } else {
                    this.view.removeResultsHighlight();
                }
                (new Titan.Collection(searchResults.first(100))).each(function (app) {
                    var appName = app.get("name");
                    var matches = app.get("matches");

                    matches.forEach(function (match) {
                        appName = appName.replace(match, '<>' + match + '</>');

                    });

                    appName = appName.replace(new RegExp('(<>)','g'), '<span class="w-Item-highlight">');
                    appName = appName.replace(new RegExp('(</>)','g'), '</span>');




                    //var regex = new RegExp(searchTerm, "gi");
                    // var position = appName.search(regex);
                    app.set({
                        "name": appName,
                        "searchResult": true
                    });

                    var item = new Item({
                        model: app,
                        eventBus: self.eventBus,
                        favoritesModel: self.model
                    });

                    self.view['searchResults'].$el.append(item.getElement());
                });
            } else {
                this.view.removeResultsHighlight();
            }
        }

    });

});