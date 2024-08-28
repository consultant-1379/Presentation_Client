window.console.init = function (id) {
    delete window.console.init;

    var console = window.console;

    var $console = $('#' + id);

    var timeoutID;

    function print(text) {
        $('<div></div>').text(text).prependTo($console);
    }

    function printBreak() {
        print('-------------------------');
    }

    function done() {
        window.clearTimeout(timeoutID);
        timeoutID = window.setTimeout(printBreak, 800);
    }

    window.console = {
        log: function (text) {
            if (_.isObject(text) || arguments.length > 1) {
                console.log(arguments.length > 1 ? arguments : text);
            } else {
                print(text);
                done();
            }
        },
        warn: function () {
            console.warn.apply(console, arguments);
        }
    };

};