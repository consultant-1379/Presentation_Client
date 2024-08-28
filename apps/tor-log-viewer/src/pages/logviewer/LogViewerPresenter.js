define([
    'Titan',
    './LogViewerView',
    '../../common/table/TablePresenter',
    '../../common/sidebar/SidebarPresenter',
    '../../common/search/SearchPresenter',
    './LogCollection',
    './ParamsModel'
], function (Titan, View, Table, Sidebar, Search, LogCollection, ParamsModel) {

    return Titan.Presenter.extend({

        View: View,

        init: function () {
            this.paramsModel = new ParamsModel();
            this.columnsCollection = new Titan.Collection();
            this.logCollection = new LogCollection();
            this.logCollection.setParamsModel(this.paramsModel);
            this.search = new Search({
                paramsModel: this.paramsModel
            });
            this.search.start(this.view.getSearchHolder());
            this.table = new Table({
                collection: this.logCollection,
                columnsCollection: this.columnsCollection,
                paramsModel: this.paramsModel
            });
            this.table.start(this.view.getTableHolder());
        },

        launch: function (place) {
            this.logCollection.otherFetch();
        },

        search: function (place) {
            this.logCollection.searchTerm = place.searchTerm;
            this.logCollection.otherFetch();
        },

        params: function (place) {
            var paramsModelJson = this.paramsModel.toJSON();
            if (!(place.params.columns instanceof Array)) {
                place.params.columns = [place.params.columns];
            }
            this.paramsModel.set(place.params);
            this.logCollection.otherFetch();
        }

    });

});