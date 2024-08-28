define([
    'Titan',
    './SearchView'
], function (Titan, View, ColumnItem) {
    return Titan.Presenter.extend({

        init: function () {
            this.paramsModel = this.options.paramsModel;
            this.view = new View();
            this.view.getSearchBox().on('keyup', this.onKeyDown.bind(this));
        },

        onKeyDown: function (e) {
            var val = this.view.getSearchBox().val();
            if (val != this.paramsModel.get('q')) {
                this.paramsModel.set({
                    q: val
                });
                window.location = '#tor-logviewer/?' + this.paramsModel.getParamsURLString();
            }
            e.preventDefault();
        }

    });
});