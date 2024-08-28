define([
    'Titan'
], function (Titan) {


    var source="<ul data-name='parent' >" +
        "<li data-name='linkone' >" +
        "<a data-name='innerlink1' href='#{{namespace}}/home'>Home</a>" +
        "</li>" +
        "<li data-name='link2' >" +
        "<a data-name='innerlink2' href='#{{namespace}}/somewhere'>Somewhere</a>" +
        "</li>" +
        "</ul>";

    var template = Handlebars.compile(source);

    var View = Titan.View.extend({
        template: template

    });

    var Presenter = Titan.Presenter.extend({
        View: View,
        init: function (app) {
            this.app = app;

        },
        onPlaceChangedHome: function () {
            this.app.globalEvents.trigger("global:title", ["app-test1 Home"]);

            console.log('appTest1 Home');
        },
        onPlaceChangedSomewhere: function () {
            this.app.globalEvents.trigger("global:title", ["app-test1 Somewhere"]);

            console.log('appTest1 Somewhere');
        }
    });

    var Place = Titan.Place.extend({
        name: 'appTest1',
        pattern: 'home',
        Presenter: Presenter,
        fn: 'onPlaceChangedHome',
        title: "appTest1 Title",
        defaultPlace: true
    });

    var Placea = Titan.Place.extend({
        name: 'appTest1',
        pattern: 'somewhere',
        Presenter: Presenter,
        fn: 'onPlaceChangedSomewhere',
        title: "appTest1 Title"
    });

    return Titan.Application.extend({
        namespace: 'appTest1',
        places: [Place, Placea]

    });

});