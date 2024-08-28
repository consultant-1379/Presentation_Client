
define('widgets/button',[], function () {

    return {
        attach: function (id, appName) {
            document.getElementById(id).innerText = 'widget attached to the ' + appName;
        }
    }

});
define('apps/second',['./../widgets/button'], function (button) {

    return {
        start: function (id) {
            button.attach(id, 'second');
        },
        stop: function () {
            console.log('stopping...');
        }
    }

});define('4db8be3b31dd592964f94828a445018b', ['apps/second'], function(module) { return module; });