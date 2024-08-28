define([
    'Titan',
    './TableHeaderView'
], function (Titan, View) {

    return Titan.Presenter.extend({

        init: function () {
            this.view = new View({
                model: this.model
            });
            this.view.setPresenter(this);
        }

    });

});