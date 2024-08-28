define('core/Application', [], function () {

    function Application() {
        console.log('core 002: Application constructor');
    }

    Application.prototype = {
        start: function (id) {
            console.log('core 002: Application start');
            this.container = document.getElementById(id);
        },
        stop: function() {
            console.log('core 002: Application stopping...', this);
        }
    };

    return Application;

});