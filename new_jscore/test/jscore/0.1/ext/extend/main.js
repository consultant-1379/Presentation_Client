define(function () {
    /**
     * Underscore each helper

     */
    function _each(obj, iterator, context) {
        if (obj == null) return;
        if (Array.prototype.forEach && obj.forEach === Array.prototype.forEach) {
            obj.forEach(iterator, context);
        }

    }

    /**
     * Underscore extend helper

     */
    function _extend(obj) {
        _each(Array.prototype.slice.call(arguments, 1), function (source) {
            for (var prop in source) {
                obj[prop] = source[prop];
            }
        });

        return obj;
    };

    /**
     * __extend
     * @param protoProps
     * @param staticProps
     * @returns {*}
     * @private
     */
    function __extend(protoProps, staticProps) {
        var parent = this;
        var child;

        if (protoProps && Object.prototype.hasOwnProperty.call(protoProps, 'constructor')) {
            child = protoProps.constructor;
        }
        else {
            child = function () {
                parent.apply(this, arguments);
            };
        }

        _extend(child, parent, staticProps);


        var Surrogate = function () {
            this.constructor = child;
        };

        Surrogate.prototype = parent.prototype;
        child.prototype = new Surrogate;

        if (protoProps) _extend(child.prototype, protoProps);

        child.__super__ = parent.prototype;

        return child;
    }
    return __extend;
});