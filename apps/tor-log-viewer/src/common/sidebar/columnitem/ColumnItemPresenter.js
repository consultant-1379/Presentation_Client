define([
    'Titan',
    './ColumnItemView'
], function (Titan, View) {

    return Titan.Presenter.extend({

        init: function () {
            this.paramsModel = this.options.paramsModel;
            this.columns = this.paramsModel.get('columns');
            this.view = new View({
                model: this.model
            });
            this.view.setPresenter(this);

            for (var i = 0; i < this.columns.length; i++) {
                if (this.columns[i] == this.model.get('name')) {
                    this.view.getToggleButton().addModifier('added', true);
                }
            }

            this.view.getToggleButton().on('click', this.columnClick.bind(this));
        },

        columnClick: function () {
            var modelRemoved = false;
            for (var i = 0; i < this.columns.length; i++) {
                if (this.columns[i] == this.model.get('name')) {
                    this.columns.splice(i, 1);
                    this.view.getToggleButton().removeModifier('added');
                    modelRemoved = true;
                }
            }

            if (!modelRemoved) {
                this.columns.push(this.model.get('name'));
                this.view.getToggleButton().addModifier('added', true);
            }

            this.model.set({columns: this.columns});
            window.location = '#tor-logviewer/?' + this.paramsModel.getParamsURLString();
            //window.location = '#tor-logviewer/?columns=' + this.columns.join();
        }

    });

});