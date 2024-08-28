define([
    'Titan',
    './LogEntryView',
    './logdetails/LogDetailsPresenter'
], function (Titan, View, LogDetails) {

    return Titan.Presenter.extend({

        detailsLoaded: false,

        init: function () {
            this.view = new View({
                model: this.model,
                columns: this.options.paramsModel.get('columns')
            });
            this.view.setPresenter(this);
            this.view.getLogEntryRow().on('click', this.onRowClicked.bind(this));
        },

        onRowClicked: function () {
            var expanded = this.view.getLogEntryDetailsRow().getModifier('expanded');
            if (expanded == undefined || expanded == false) {
                if (!this.detailsLoaded) {
                    var keyValCollection = new Titan.Collection();
                    var modelJson = this.model.toJSON();
                    for (var prop in modelJson._source) {
                        keyValCollection.add({
                            key: prop,
                            val: modelJson._source[prop]
                        });
                    }
                    this.details = new LogDetails({
                        collection: keyValCollection
                    });
                    this.details.start(this.view.getLogEntryDetailsPanel());
                    this.detailsLoaded = true;
                }
                this.view.getLogEntryDetailsRow().addModifier('expanded', true);
            } else {
                this.view.getLogEntryDetailsRow().removeModifier('expanded');
            }
        }

    });

});