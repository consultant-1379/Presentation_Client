define([
    'Titan',
    './LogDetailsView'
], function (Titan, View) {

    return Titan.Presenter.extend({

        init: function () {
            this.view = new View({
                collection: this.collection
            });
            this.view.setPresenter(this);
        }

    });

});