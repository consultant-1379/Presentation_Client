define([
    'Titan',
    './Login'
], function (Titan, Login) {

    return Titan.Place.extend({
        name: 'login',
        pattern: 'login',
        presenter: Login,
        fn: 'login',
        default: true
    });

});