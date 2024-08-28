define(['./base/d3', '../../core'], function (d3, core) {

    function Drawing(options) {
        this.options = options;
        this.init();
    }

    Drawing.prototype = {
             init: function () {
        },
        setElement: function (element) {
            this.element = element;
            this.__d3__= d3.select(this.element._getHTMLElement());

        },
        __select: function () {
            return this.__d3__;

        },
        start: function () {
            this.onStart();
        },
        onStart: function () {
        }

    }
   Drawing.extend = core.extend;

    return Drawing;
});