define([
    'Titan',
    './pages/places'
], function (Titan, places) {

    return Titan.Application.extend({

        init: function() {

            this.messages = new Titan.Model({}, {msg: ""}),

            // Event --> Model!
            this.localEvents.on("localEventSent", function (Name, message) {
                var msg = this.messages.get('msg');

                this.messages.set({

                    "msg": (
                        (msg === "") ? "" : msg + ", "
                    )
                    + Name + ": " + message
                });

            }, this);
        },
        places: places,
        namespace: "Events"
    });
});