define(['Titan',
        './Model'
], function (Titan, Model) {
    return Titan.Collection.extend({

        // url property on a collection to reference its location on the server (backbone).
        url: "./resources/events/collection.json",

        // Override model property to specify model class that the collection contains.
        model: Model
    });
});