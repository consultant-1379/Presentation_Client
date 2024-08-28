define([
    'Titan',
    './UserView'
], function (Titan, View) {

    return Titan.Presenter.extend({

        View: View,

        init: function (app) {      // Init is called once when Presenter initialised!

            this.app = app;
            var view = this.view;

            //Click --> Event!
            view['event'].on('click', function () {

                if (view['userInput'].val() !== "") {
                    app.localEvents.trigger('localEventSent', view['title'].html(), view['userInput'].val());
                    view['userInput'].val("");
                }
                return false;
            });

            // Model change --> Display!
            app.messages.on('change', function () {
                this.displayEvents();
            }, this);

        },

        // fn function is called each time the Place is called (route is changed)!
        //argument is associated by fn: in UserPlace!
        updateWorkspace: function (place) {
            if (place.args[0]) {
                this.view['title'].html(place.args[0] + (place.args[1] ? " " + place.args[1] : ''));
                this.displayEvents();
            }
            else {
                alert('noname');
            }
        },

        displayEvents: function () {

            var msg = this.app.messages.get('msg');

            if (msg !== undefined) {
                this.view['usr_msg_target'].html(msg);
            }

        }
    });
});