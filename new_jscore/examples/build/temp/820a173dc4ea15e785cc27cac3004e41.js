
define('widgets/button',[], function () {

    return {
        attach: function (id, appName) {
            document.getElementById(id).innerText = 'widget attached to the ' + appName;
        }
    }

});
define('apps/first',['./../widgets/button'], function (button) {

    return {
        start: function (id) {
            button.attach(id, 'first');
        }
    }

});define('820a173dc4ea15e785cc27cac3004e41', ['apps/first'], function(module) { return module; });