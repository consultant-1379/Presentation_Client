/**
 * The core contains a set of base classes that can be extended by developers to create scalable client apps.
 *
 * @module core
 */

define([
    './interfaces',
    './ext/dom/main',
    './ext/css/main',
    './ext/mediator/main'
], function (interfaces, dom, css, mediator) {
    /**
     * setRootElement
     *
     */
    function setRootElement() {
        var element;
        if (this.View !== undefined) {
            this.view = new this.View({parent: this});
            this.view.render();
            element = this.view.element;

        }
        else {
            element = new Element();

        }

        return element
    }
    /**
     * The Element is a common abstraction of the HTML DOM element.
     *
     * @class core.Element
     * @extends ext.dom.Element
     */
    var Element = dom.Element;

    /**
     * The EventBus allows objects to subscribe and publish events that other components may react to.
     *
     * @class core.EventBus
     * @extends ext.mediator.EventBus
     */
    var EventBus = mediator.EventBus;



    /**
     * The AppContext interface represents a utility that the App uses to share a common context between Regions using the sandbox pattern.
     *
     * @class core.AppContext
     * @extends interfaces.AppContext
     */
    var AppContext = interfaces.AppContext;


    /**
     * The App class is the main controller of the client application. It is responsible for overall UI layout, co-ordination of the different component parts of the UI and URL management.
     *
     * @class core.App
     * @extends interfaces.App
     */

    var App = interfaces.App.extend({
        /**
         * Creates an AppContext with an EventBus instance. May be overriden by developer to add additional context.
         *
         * @method createContext
         * @return context {AppContext}
         */
        createContext: function () {
            var appContext = new AppContext();
            appContext.eventBus = new EventBus();
            return appContext;
        },
        addToContainer: function (container) {
            if (container instanceof HTMLElement) {
                var parentElement = Element.wrap(container);
            }
            else {
                var parentElement = container;
            }
            parentElement.append(this.element);
        },
        _beforeInit: function () {
            this.element = setRootElement.apply(this, arguments);
        },
        getEventBus: function () {
            return this.getContext().evenBus;
        }


    });


    /**
     * The View class is responsible for template management. It may be used by any visible client component (App, Region, Widget) to load a HTML template.
     *
     * @class core.View
     */
    function View(options) {
        this.options = options || {}

        if (this.options.parent !== undefined) {
            this.setParent(this.options.parent);
        }

        this.element = new Element();
        this.init();
    }

    /**
     * The Element to which the template will be rendered.
     *
     * @property element
     * @type {Element}
     */

    View.prototype = {

        /**
         * Adding methods in to constructor
         */
        init: function () {
        },
        /**
         * Get the HTML template as a string. The developer must implement this method.
         *
         * @method getTemplate
         * @return template {String}
         */
        getTemplate: function () {
        },

        /**
         * Get the template CSS as a string. The developer must implement this method if CSS is needed for the template.
         *
         * @method getStyle
         * @return css {String}
         */
        getStyle: function () {
        },

        /**
         * Render the template to the DOM.
         *
         * @method render
         */
        render: function () {
            var style = this.getStyle();
            css.addStyle(style, this);

            this.element = Element.parse(this.getTemplate());

            this._afterRender();
        },
        /**
         * Private Function for initialisation
         * @private
         */
        _afterRender: function () {
        },
        getParent: function () {
            return this._parent;
        },
        setParent: function (parent) {
            this._parent = parent;
        }

    }

    /**
     * To create a View child class call extend providing the class definition.
     *
     * @method extend
     * @param definition {Object}
     * @return view {View}
     */
    View.extend = interfaces.extend;



    /**
     * The App may create Region instances to manage specific areas of the screen with a well defined responsibility. Regions are completely independent and communicate with each other via event passing using the EventBus. In this way any Region may be removed without affecting other regions. Likewise Regions may be independently restarted should they get into an error scenario. For these reasons, regions may not be nested.
     *
     * @class core.Region
     * @extends interfaces.UIComponent
     */
    var Region = interfaces.UIComponent.extend({

        /**
         * Call this method to start the region.
         *
         * @method start
         * @param parent {Element}
         */

        start: function (parent) {
            parent.append(this.getElement());
            this.onStart(parent);
        },

        /**
         * Implement this method to define how to start the Region.
         *
         * @method onStart
         */
        onStart: function (parent) {
        },

        /**
         * Call this method to stop the region.
         *
         * @method stop
         */
        stop: function () {
            this.destroy();
            this.onStop();
        },

        /**
         * Implement this method to define how to stop the Region.
         *
         * @method onStop
         */
        onStop: function () {
        },

        /**
         * Create the Region root Element.
         *
         * @method createElement
         *
         */
        createElement: function () {
            return setRootElement.apply(this, arguments);
        },
        getEventBus: function () {
            return this.getContext().eventBus;
        }
    });


    /**
     * The Widget class is a piece of reusable generic UI code. It does not have any knowldge of its context or how it is being used. Widgets can be simple like buttons or text input fields or comlpex like data-grids or maps. Widgets are composable and may be nested as required to construct composite widgets. Widgets may be reused in multiple apps. A common set of widgets is provided as a common UI component.
     *
     * The use of widgets for purely layout purposes should be avoided as the parent (App, Place or Region) template may be used for this purpose along with appropriate CSS. Widgets may be used where some user interaction is required. Even in this scenario widgets are not mandatory and the functionality may be handled directly in the parent JavaScript. Widgets should be considered for encapsulating complex interaction logic and where code reuse is possible.
     *
     * @class core.Widget
     * @extends interfaces.UIComponent
     */
    var Widget = interfaces.UIComponent.extend({
        /**
         * Adds the Widget's element to the parents DOM.
         *
         * @method attachTo
         * @param parent {Element}
         */
        attachTo: function (parent) {
            parent.append(this.getElement());
        },
        /**
         * Bind an event handling function to the Widget event.
         *
         * @method on
         * @param eventName {String}
         * @param fn {Function}
         */
        on: function (eventName, fn) {
            this.listeners[eventName] = fn;
        },

        /**
         * Trigger a Widget event.
         *
         * @method trigger
         * @param eventName {String}
         * @param data {*}
         */
        trigger: function (eventName, data) {
            var listener = this.listeners[eventName];
            if (listener) {
                listener.call(this, data);
            }
        },
        createElement: function () {
            return setRootElement.apply(this, arguments);
        }
    });


    return {
        App: App,
        AppContext: AppContext,
        EventBus: EventBus,
        Region: Region,
        Widget: Widget,
        View: View,
        Element: Element,
        extend: interfaces.extend
    }
});
