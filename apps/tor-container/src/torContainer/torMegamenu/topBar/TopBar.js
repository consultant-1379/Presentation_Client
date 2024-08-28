define(['Titan', './TopBarView'], function (Titan, TopBarView) {
    return Titan.Presenter.extend({
        init: function (app) {
            this.View = TopBarView.extend({
                apps: app.options.apps
            });

            this.view = this.create(this.View);
            this.signOut();

        },
        location: "/logout",
        message: "Are you sure yo want to Sign Out?",
        signOut: function () {
            var message = this.message;
            var location = this.location;
            this.view.signOutButton.on('click', function () {
                var conf = confirm(message);
                if (conf === true) {
                    window.location = location;
                }
            });
        }

    });
});