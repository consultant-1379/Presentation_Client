define([
    'Titan',
    './LoginView',
    'tor-login/config/loginUrl'
], function (Titan, View, loginUrl) {
    var LoginModel = Titan.Model.extend({
        url: loginUrl.url
    });

    var model = new LoginModel();

    return Titan.Presenter.extend({

        View: View,

        init: function () {
            this.view = new View();
            this.view.setPresenter(this);
        },

        login: function () {
            this.view.$el.find('.app-Login-loginUsername').focus();
        },

        submitForm: function(name, password) {
            var messageBox = this.view.$el.find('.app-Login-messagesBox');
            messageBox.html('');


            model.save({
                id:'Login',
                login: name,
                password: password
            }, {
                type: 'POST',
                statusCode: {
                    404: function(jqXHR, textStatus, errorThrown) {
                        console.log('Page not found', arguments);
                        messageBox.html(errorThrown);
                    },
                    403: function(jqXHR, textStatus, errorThrown) {
                        console.log('User not found', arguments);
                        messageBox.html(errorThrown);
                    }
                },
                success: function() {
                    console.log('success', arguments);
                    location.href = '?success';
                }
            });





           /* Titan.utils.ajax({
                type: 'POST',
                url: loginUrl.url,
                data: {
                    login: name,
                    password: password
                },
                statusCode: {
                    404: function(jqXHR, textStatus, errorThrown) {
                        console.log('Page not found', arguments);
                        messageBox.html(errorThrown);
                    },
                    403: function(jqXHR, textStatus, errorThrown) {
                        console.log('User not found', arguments);
                        messageBox.html(errorThrown);
                    }
                },
                success: function() {
                    console.log('success', arguments);
                    location.href = '?success';
                }
            });
*/
            return false;
        }

    });

});