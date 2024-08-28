define([
    'Titan',
    './MainView'
], function (Titan, View) {

    return Titan.Presenter.extend({

        View: View,

        onPlaceChanged: function (place) {
            console.log('Blue Application', place.name);
        }

    });

});