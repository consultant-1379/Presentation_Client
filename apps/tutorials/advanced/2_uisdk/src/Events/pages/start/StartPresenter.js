define([
    'Titan',
    './StartView',
    "./Collection"
], function (Titan, View, Collection) {
    return Titan.Presenter.extend({

        View: View,
        init: function (app) {
            this.app = app;
            var view = this.view;

            // Create new Collection!
            var collection = this.create(Collection, { container: this.view['table'] });
            collection.fetch();

            // Click --> Event (add user)!
            view['adduser'].on('click', function () {

                var user = view['user'].val().trim();
                if (user !== '') {

                    var find = collection.find(function (model) {    // find - Titan.Collection method
                        return model.get('name') === user;
                    });

                    if (find === undefined) {
                        collection.add({name: user});
                    }
                    else {
                        alert('Name "' + user + '" already exists')
                    }
                }
                return false;
            });

            //Click --> Event (admin sends message)!
            view['event'].on('click', function () {

                if (view['adminInput'].val() !== "") {
                    app.localEvents.trigger('localEventSent', 'Admin', view['adminInput'].val());

                    // Clear input!
                    view['adminInput'].val("");
                }
            });

            // Click --> Clear Model!
            view['clear_all'].on('click', function () {
                app.messages.set({"msg": ""});
            });

            // Event --> Model change is handled by Application Class!

            // Model --> Display!
            app.messages.on('change', function () {
                console.log("model --> display!");
                this.updateView();
            }, this);
        },

        updateView: function () {

            var msg = this.app.messages.get('msg');
            if (msg !== undefined) {
                this.view['adm_msg_target'].html(msg);
            }
        }
    });
});