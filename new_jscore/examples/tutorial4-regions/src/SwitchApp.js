/*global  define,  localRequire */
define(['require',
        'jscore/core',
        'jscore/ext/locationController'
], function (require, core, router) {
    var loader = 0;

    function WaitFor(count, fn, context) {
        var args = Array.prototype.slice.call(arguments, 0);
        setTimeout(function () {
            if (loader === count) {
                fn.call(context, fn);
            } else {
                WaitFor.apply(this, args)
            }
        }, 10)

    }

    console.log(core.Version, 'SwitchApp');
    return core.App.extend({

        onStart: function () {
            var html = this.element;

            localRequire['version2'](['require',
                                      "./app1/ToDoApp"
            ], function (require, App1) {
                var app1;
                app1 = new App1();

                router.addLocationListener(function (hash) {

                    if (app1.context) {
                        app1.stop();
                    }

                    if (hash === 'app1') {
                        app1.start(html);
                    }

                });
                loader++;
            });

            localRequire['version1']([
                'require',
                "./app2/ToDoApp"
            ], function (require, App2) {
                var app2
                app2 = new App2();

                router.addLocationListener(function (hash) {
                    if (app2.context) {
                        app2.stop();
                    }

                    if (hash === 'app2') {
                        app2.start(html);
                    }
                });
                loader++;
            });

            WaitFor(2, router.start, router);


        }
    });

});