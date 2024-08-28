Handlebars.registerHelper('modelHelper', function (context, options) {
    return context.get(options.hash.get);
});

Handlebars.registerHelper('columnHelper', function (context, options) {
    if (context.get('_source') != undefined) {
        return context.get('_source')[options.hash.get];
    } else {
        return '';
    }
});

define([
    'Titan',
    './pages/places'
], function (Titan, places) {

    return Titan.Application.extend({

        places:places

    });

});