define([
    'Titan',
    './modules/places',
    './ext/bind-extension'
], function (Titan, places) {

    return Titan.Application.extend({

        places:places

    });

});