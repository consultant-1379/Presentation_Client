define([
    'Titan'
], function (Titan) {

    var View = Titan.View.extend({

    });

    var Presenter = Titan.Presenter.extend({
        View: View,
        init:function(app){
            this.app=app;

        },
        onPlaceChanged: function() {
            this.app.globalEvents.trigger("global:title", ["appTest2 Home"]);

            console.log('appTest2 started')
        }
    });

    var Place = Titan.Place.extend({
        name: 'appTest2',
        pattern: 'home',
        Presenter: Presenter,
        fn: 'onPlaceChanged',
        defaultPlace: true
    });

    return Titan.Application.extend({
        namespace: 'appTest2',
        places: [Place]

    });

});