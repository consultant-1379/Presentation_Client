define([
    'Titan',
    './../Main'
], function (Titan, Main) {

    return Titan.Place.extend({
        name: 'Welcome',
        pattern: 'mainPlace',
        Presenter: Main,
        fn: 'onPlaceChanged',
        defaultPlace: true
    });

});