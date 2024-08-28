define(['./../widgets/button'], function (button) {

    return {
        start: function (id) {
            button.attach(id, 'second');
        },
        stop: function () {
            console.log('stopping...');
        }
    }

});