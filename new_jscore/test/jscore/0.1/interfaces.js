/**
 * The interfaces package contains a set of abstract interface classes that are extended by the core base classes.
 *
 * @module interfaces
 */
define([], function () {
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

    /**
     * Create
     *

     */
    function __Create(context) {
        var args = [null].concat(Array.prototype.slice.call(arguments, 1));
        var Parent = this;
        var parent = new (Function.prototype.bind.apply(Parent, args));

        parent.setContext(context);

        return  parent
    }


    /**
     * The App interface represents the main controller of the client application.
     *
     * @class interfaces.App
     */
    function App() {
        this._beforeInit();

        this.init();
    }

    App.prototype = {
        _beforeInit:function(){

        },
        /**
         * This is the Context object of the App that may be used to share common context (e.g. the EventBus) between UIComponents.
         *
         * @property context
         * @type {AppContext}
         */

        /**
         * The init method is automatically called when the object is instantiated.
         *
         * @method init
         */
        init: function () {
        },
        /**
         * Call this method to start the app.
         *
         * @method start
         * @param container {HTMLElement/Element}
         */
        start: function (container) {
            this.context = this.createContext();
            this.onStart(container);
            this.addToContainer(container);
        },

        /**
         * Implement this method to define how to start the app.
         *
         * @method onStart
         * @param container {Element}
         */
        onStart: function (container) {
        },

        /**
         * Call this method stop the App.
         *
         * @method stop
         */
        stop: function () {
            this.context.destroyAll();
            this.onStop();
        },

        /**
         * Implement this method to define how to stop the app.
         *
         * @method onStop
         */
        onStop: function () {
        },

        /**
         * Implement this method to create an AppContext instance.
         *
         * @method createContext
         * @return context {AppContext}
         */
        createContext: function () {
            return new AppContext();
        },
        getContext: function () {
            return this.context;
        },
        addToContainer: function (container) {
            if (container instanceof HTMLElement) {
                container.appendChild(this.element);
            }
        }

    };

    /**
     * To create an App child class call extend providing the class definition.
     *
     * @method extend
     * @param definition {Object}
     * @return app {App}
     */
    App.extend = __extend;

    /**
     * The UIComponent interface is implemented by UIComponents that are managed by the App.
     *
     * @class interfaces.UIComponent
     */
    function UIComponent() {
        this.listeners = {};

        this.element = this.createElement();

        this.init.apply(this, arguments);
    }

    UIComponent.prototype = {

        /**
         * The init method is automatically called when the object is instantiated.
         *
         * @method init
         */
        init: function () {
        },


        /**
         * Set the AppContext of the UIComponent.
         *
         * @method setContext
         * @param context {AppContext}
         */
        setContext: function (context) {
            this.context = context;
        },

        getContext: function () {
            return this.context;
        },

        /**
         * Removes the UIComponent root Element from the DOM.
         *
         * @method destroy
         */
        destroy: function () {
            this.getElement().remove();
        },


        /**
         * Override this method to create a your own Element for a UIComponent child class.
         *
         * @method createElement
         * @return element {HTMLElement}
         */

        createElement: function () {
            return document.createElement('div');
        },

        /**
         * Sets the root element of the UIComponent.
         *
         * @method setElement
         * @return element {Element}
         */
        setElement: function (element) {
            this.element = element;
        },

        /**
         * Get the root HTMLElement of the UIComponent.
         *
         * @method getElement
         * @return element {HTMLElement}
         */
        getElement: function () {
            return this.element;
        }
    };

    /**
     * To create an UIComponent child class call extend providing the class definition.
     *
     * @method extend
     * @param definition {Object}
     * @return component {UIComponent}
     */
    UIComponent.extend = __extend;

    /**
     * Initialises the UIComponent with an AppContext and returns an instance.
     *
     * @method Create
     * @param context {AppContext}
     * @return component {UIComponent}
     */
    UIComponent.Create = __Create;


    /**
     * The AppContext interface represents a utility that the App uses to share a common context between Regions using the sandbox pattern.
     *
     * @class interfaces.AppContext
     */
    function AppContext() {
        this.components = [];
        this.init();
    }

    AppContext.prototype = {

        /**
         * The init method is automatically called when the object is instantiated.
         *
         * @method init
         */
        init: function () {
        },

        /**
         * Destroy all registered components.
         *
         * @method destroyAll
         */
        destroyAll: function () {
            while (this.components.length > 0) {
                this.components.pop().destroy();
            }
        }
    }

    /**
     * To create an AppContext child class call extend providing the class definition.
     *
     * @method extend
     * @param definition {Object}
     * @return context {AppContext}
     */
    AppContext.extend = __extend;


    return {
        App: App,
        UIComponent: UIComponent,
        AppContext: AppContext,
        extend: __extend
    }

});