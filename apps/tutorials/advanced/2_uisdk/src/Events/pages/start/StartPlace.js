// Exception handling needs to be improved in absence of a place
// Currently its: "Uncaught TypeError: Cannot read property 'prototype' of undefined "

define([
    'Titan',
    './StartPresenter'
], function (Titan, DefaultPresenter) {

    return Titan.Place.extend({
        pattern: 'start',
        Presenter: DefaultPresenter,
        fn: 'updateView',
        defaultPlace: true
    });
});