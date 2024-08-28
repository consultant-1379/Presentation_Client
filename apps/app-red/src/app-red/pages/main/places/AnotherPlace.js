define([
    'Titan',
    './../Main'
], function (Titan, Main) {

    return Titan.Place.extend({
        name: 'Another Place',
        pattern: 'anotherPlace/:id',
        Presenter: Main,
        fn: 'onAnotherPlace',
        defaultPlace: false,
        init: function (id) {
            this.id = (id.length > 0) ? id[0] : 'empty';
        }
    });

});