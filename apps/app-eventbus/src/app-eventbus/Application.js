define([
    'Titan',
    './pages/places'
], function (Titan, places) {

    return Titan.Application.extend({

        namespace: 'app-eventbus',

        places: places

    });

});