define([
    'Titan',
    './Second'
], function (Titan, Second) {

    return Titan.Place.extend({
        name: 'Second Welcome',
        pattern: 'second/:id',
        Presenter: Second,
        fn: 'onPlaceChanged',
        defaultPlace: false,
        init: function (id) {
            this.id = (id.length > 0) ? id[0] : 'empty';
        }
    });
});