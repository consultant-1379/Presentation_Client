define([], function () {

    return {
        attach: function (id, appName) {
            document.getElementById(id).innerText = 'widget attached to the ' + appName;
        }
    }

});