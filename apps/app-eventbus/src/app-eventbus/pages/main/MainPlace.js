define([
    'Titan',
    './Main'
], function (Titan, Main) {

    return Titan.Place.extend({
        name: 'Main Welcome',
        pattern: 'home',
        Presenter: Main,
        fn: 'onPlaceChanged',
        defaultPlace: true
    });

});