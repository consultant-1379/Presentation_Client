define([
    'Titan',
    './TableHeaderRowView',
    '../tableheader/TableHeaderPresenter'
], function (Titan, View, TableHeader) {

    return Titan.Presenter.extend({

        init: function () {
            this.view = new View();
            this.view.setPresenter(this);
            for (var i = 0; i < this.options.columns.length; i++) {
                this.renderHeader(this.options.columns[i]);
            }
        },

        renderHeader: function (columnHeader) {
            var logHeader = new TableHeader({
                model: new Titan.Model({
                    name: columnHeader
                })
            });
            this.view.getLogEntryHeaderRow().addWidget(logHeader.view);
        }

    });

});