define([
    'jscore/0.1/core',
    './regions/pie/Pie'],
    function (core, Pie) {


        return core.App.extend({
            onStart: function (parent) {
                var pie = Pie.Create(this.context);
                pie.start(this.element);
            }
        });

    });