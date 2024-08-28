define([
    'Titan',
    './TableView',
    './logentry/LogEntryPresenter',
    './tableheaderrow/TableHeaderRowPresenter'
], function (Titan, View, LogEntry, TableHeaderRow) {
    return Titan.Presenter.extend({

        init: function () {
            this.paramsModel = this.options.paramsModel;
            this.view = new View({
                paramsModel: this.paramsModel
            });
            this.collection.on('reset', this.onLoad, this);
            this.paramsModel.on('change', this.onLoad, this);

            this.view.getOlderResultsLink().on('click', this.loadOlderResults.bind(this));
            this.view.getNewerResultsLink().on('click', this.loadNewerResults.bind(this));
        },

        onLoad: function() {
            var columns = this.paramsModel.get('columns');
            this.view.getLogTable().removeWidget();
            this.tableHeaderRow = new TableHeaderRow({
                columns: columns
            });
            this.tableHeaderRow.start(this.view.getLogTable());
            /*for (var i = 0; i < columns.length; i++) {
                this.renderHeader(columns[i]);
            }*/
            this.sidebarColumns = {};
            this.sidebarColumnsArray = [];
            this.options.columnsCollection.reset();
            this.collection.each(this.renderLogEntry, this);
            this.options.columnsCollection.reset(this.sidebarColumnsArray);

            var from = parseInt(this.paramsModel.get('from'));
            var size = parseInt(this.paramsModel.get('size'));

            this.view.getResultDetails().text((from + 1) + ' to ' + (from + size));
            this.view.getResultsStats().text(this.collection.totalResults + ' results returned in ' + (this.collection.timeTook/1000) + ' seconds');
        },



        renderLogEntry: function (logModel) {
            var logEntry = new LogEntry({
                model: logModel,
                paramsModel: this.paramsModel
            });
            this.view.getLogTable().addWidget(logEntry.view);

            var columns = logModel.get('_source');
            for (var prop in columns) {
                if (this.sidebarColumns[prop] == undefined) {
                    this.sidebarColumns[prop] = true;
                    this.sidebarColumnsArray.push({
                        name: prop
                    });
                }
            }
        },

        loadOlderResults: function (e) {

            var from = parseInt(this.paramsModel.get('from'));
            var size = parseInt(this.paramsModel.get('size'));

            this.paramsModel.set({from: from + size});

            window.location = '#tor-logviewer/?' + this.paramsModel.getParamsURLString();
            e.preventDefault();
        },

        loadNewerResults: function (e) {

            var from = parseInt(this.paramsModel.get('from'));
            var size = parseInt(this.paramsModel.get('size'));

            if (from != 0) {
                this.paramsModel.set({from: (from - size) < 0 ? 0 : (from - size)});
                window.location = '#tor-logviewer/?' + this.paramsModel.getParamsURLString();
            }
            e.preventDefault();
        }

    });
});