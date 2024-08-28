define('core/Class', [], function () {

    return {
        extends: function (d, b) {
            function __() {
                this.constructor = d;
            }

            __.prototype = b.prototype;
            d.prototype = new __();

            return d;
        }
    }

});