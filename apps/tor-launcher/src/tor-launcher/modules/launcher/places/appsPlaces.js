define([
    'Titan',
    './../Launcher'
], function (Titan, Launcher) {

    return Titan.Place.extend({
        name: 'Show Apps',
        pattern: 'tor-application/:id',
        presenter: Launcher,
        fn: 'apps',
        default: true,
        init: function (id) {
            this.id = (id.length > 0) ? id[0] : 'groups';
        }
    });

});