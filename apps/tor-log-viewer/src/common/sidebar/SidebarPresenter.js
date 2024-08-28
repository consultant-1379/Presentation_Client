define([
    'Titan',
    './SidebarView',
    './columnitem/ColumnItemPresenter'
], function (Titan, View, ColumnItem) {
    return Titan.Presenter.extend({

        init: function () {
            this.paramsModel = this.options.paramsModel;
            this.view = new View();
            this.collection.on('reset', this.onLoad, this);
            this.paramsModel.on('change', this.onLoad, this);
        },

        onLoad: function() {
            this.view.getColumnItemsHolder().removeWidget();
            this.collection.each(this.renderColumnItem, this);
        },

        renderColumnItem: function (columnModel) {
            var columnItem = new ColumnItem({
                model: columnModel,
                paramsModel: this.paramsModel
            });
            this.view.addElement(columnItem.view);
        }

    });
});