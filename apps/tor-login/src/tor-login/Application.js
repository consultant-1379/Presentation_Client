define([
    'Titan',
    './pages/places',
    './ext/ajax.ext'
], function (Titan, places) {

    return Titan.Application.extend({

        places:places

    });

});