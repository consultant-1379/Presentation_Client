define([], function () {

    function App() {
        this.context = this.getContext();
    }

    App.prototype.start = function (el) {

    };

    App.prototype.stop = function () {

    };

    App.prototype.getContext = function () {
        return new AppContext();
    };

    App.prototype.register = function (wrapper) {
        return wrapper(this.context);
    };

    App.extend = __extend;

    function UIComponent(Prototype) {
        return Prototype;
    }

    UIComponent.extend = __extend;

    function AppContext() {

    }

    AppContext.extend = __extend;

    function __extend(protoProps) {
        var parent = this;
        var child;

        if (protoProps && Object.prototype.hasOwnProperty.call(protoProps, 'constructor')) {
            child = protoProps.constructor;
        } else {
            child = function () {
                parent.apply(this, arguments);
            };
        }

        var Surrogate = function () {
            this.constructor = child;
        };
        Surrogate.prototype = parent.prototype;
        child.prototype = new Surrogate;
        for (var prop in protoProps) {
            if (Object.prototype.hasOwnProperty.call(protoProps, prop)) {
                child.prototype[prop] = protoProps[prop]
            }
        }

        child.__super__ = parent.prototype;
        child.extend = __extend;

        return child;
    }


    return {
        App: App,
        UIComponent: UIComponent,
        AppContext: AppContext,
        extend: __extend
    }

});