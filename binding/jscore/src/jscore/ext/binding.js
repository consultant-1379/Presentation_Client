
/**
 * The interfaces package contains a set of abstract interface classes that are extended by the core base classes.
 *
 * @module interfaces
 */
/*global define */
//TODO:write type annotations for variables
define('jscore/interfaces',[], function () {
    
    /**
     *  private method, to make available for tests
     */
    var _private = {};
    /**
     * Underscore each helper
     */
    _private._each = _each;
    function _each(obj, iterator, context) {
        if (obj === null) {
            return;
        }
        if (Array.prototype.forEach && obj.forEach === Array.prototype.forEach) {
            obj.forEach(iterator, context);
        }

    }


    /** Generate Random UID
     *
     * @method guidGenerator
     * @private
     * @return {String}
     * */

    _private.guidGenerator = guidGenerator;
    function guidGenerator() {
        /**
         * @method S4
         * @private
         * @return {String}
         * */
        function S4() {
            /*jshint bitwise: false */
            return  (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
        }

        return (S4() + S4() + "-" + S4() + "-" + S4() + "-" + S4() + "-" + S4() + S4() + S4() + "-" + new Date().getTime());
    }


    /**
     * Underscore extend helper

     */
    _private._objExtend = _objExtend;
    function _objExtend(obj) {
        _each(Array.prototype.slice.call(arguments, 1), function (source) {
            for (var prop in source) {
                if (prop) {
                    obj[prop] = source[prop];
                }
            }
        });


        return obj;
    }

    /**
     * __extend
     * @param protoProps
     * @param staticProps
     * @returns {*}
     * @private
     */
    _private.__extend = __extend;
    function __extend(protoProps, staticProps) {
        /*jshint validthis:true */
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

        _objExtend(child, parent, staticProps);


        var Surrogate = function () {
            this.constructor = child;
        };

        Surrogate.prototype = parent.prototype;
        child.prototype = new Surrogate();

        if (protoProps) {
            _objExtend(child.prototype, protoProps);
        }

        child.__super__ = parent.prototype;

        return child;
    }

    /**
     Add to Context
     */
    _private.__AddtoContext = __AddtoContext;
    function __AddtoContext(context) {
        /*jshint validthis:true */
        this.context = context;

    }

    /**
     *
     * @function createDiv
     * @private
     */
    _private._createDiv = _createDiv;
    function _createDiv() {
        return document.createElement('div');
    }

    /**
     * The App interface represents the main controller of the client application.
     *
     * @class interfaces.App
     */
    function App(options) {
        this.options = options || {};
        if (!this.constructor.prototype.uid) {
            this.constructor.prototype.uid = guidGenerator();
        }

        this.init.apply(this, arguments);
        this.constructor.prototype.counter = this.constructor.prototype.counter || 0;
    }

    App.prototype = {

        /**
         * Implement this method instead of using the View property if some data needs to be pre-processed before the View is instantiated. Note that this method must return an instance of the View.
         *
         * @method view
         * @return {View} view
         * @example
         *    view: function() {
         *     return new View(this.options)
         * }
         */
         
         /**
         * Allows a View to be associated with this object. Must be assigned to the uninitialized View.
         *
         * @property View
         * @type View
         *
         * @example
         *   View: MyView
         */
    
        /**
         * The init method is automatically called by the constructor when using the "new" operator. If an object with
         * key/value pairs is passed into the constructor then the options variable will have those key/value pairs.
         *
         * @param {Object} options
         * @method init
         */
        init: function (options) {
        },

        /**
         * Call this method to start the app.
         *
         * @method start
         * @param {HTMLElement} container
         * @example
         *    app.start();
         */
        start: function (container) {
            if (this.element === undefined) {
                this.context = this.createContext();
                this._createElement();
                this.onStart();
                this._addToContainer(container);
            }
        },

        /**
         * Implement this method to define how to start the app.
         *
         * @method onStart
         * @example
         *    onStart: function() {
		 *     console.log("app started");
		 * }
         */
        onStart: function () {
        },

        /**
         * Call this method stop the App.
         *
         * @method stop
         * @example
         *    app.stop();
         */
        stop: function () {
            if (this.element !== undefined) {
                this._removeFromContainer();
                this.context.destroyAll();
                delete this.context;
                this.onStop();
            }
        },

        /**
         * Implement this method to define how to stop the app.
         *
         * @method onStop
         * @example
         *    onStop: function() {
		 *     console.log("app stopped");
		 * }
         */
        onStop: function () {
        },

        _createElement: function () {
            this.element = _createDiv();
        },

        /**
         * Implement this method to create an AppContext instance.
         *
         * @method createContext
         * @return {AppContext} context
         *
         * @example
         *    createContext: function() {
		 *     return {
         *         myContextFunction: function(){}
         *     }
		 * }
         */
        createContext: function () {
            return new AppContext();
        },

        /**
         * Returns the instance of the AppContext for the App
         *
         * @method getContext
         * @return {AppContext} context
         *
         * @example
         *    app.getContext();
         */
        getContext: function () {
            return this.context;
        },

        /**
         * Appends the app to a native HTMLElement. Used by container.
         *
         * @method _addToContainer
         * @private
         * @param {HTMLElement} container
         */
        _addToContainer: function (container) {
            container.appendChild(this.element);
        },

        /**
         * Removes the app from the container.
         *
         * @method _removeFromContainer
         * @private
         */
        _removeFromContainer: function () {
            this.element.parentNode.removeChild(this.element);
        },

        /**
         * Get the root HTMLElement of the App.
         *
         * @method getElement
         * @return {HTMLElement} element
         *
         * @example
         *    app.getElement();
         */
        getElement: function () {
            return this.element;
        }

    };

    /**
     * To create an App child class call extend providing the class definition.
     *
     * @method extend
     * @static
     * @param {Object} definition
     * @return {App} app
     * @example
     *    interfaces.App.extend({
	 *     onStart: function() {
	 *     }
	 * });
     */
    App.extend = __extend;

    /**
     * The UIComponent interface is implemented by UIComponents such as Regions or Widgets that are managed by the App.
     *
     * @class interfaces.UIComponent
     */
    function UIComponent(options) {
        this.options = options = options || {};
        this.uid = guidGenerator();

        if (options.context) {
            __AddtoContext.call(this, options.context);
            delete options.context;
        }
        this.init.apply(this, arguments);
        this._afterInit.apply(this, arguments);

    }

    UIComponent.prototype = {
    
        _afterInit:function(options){

        },
    
        /**
         * Implement this method instead of using the View property if some data needs to be pre-processed before the View is instantiated. Note that this method must return an instance of the View.
         *
         * @method view
         * @return {View} view
         * @example
         *    view: function() {
         *     return new View(this.options);    
         * }
         */
         
         /**
         * Allows a View to be associated with this object. Must be assigned to the uninitialized View.
         *
         * @property View
         * @type View
         *
         * @example
         *   View: MyView
         */

        /**
         * The init method is automatically called by the constructor when using the "new" operator. If an object with
         * key/value pairs is passed into the constructor then the options variable will have those key/value pairs.
         *
         * @method init
         * @param options
         */
        init: function (options) {
        },

        /**
         * Sets the root element of the UIComponent.
         *
         * @method setElement
         * @private
         * @param {HTMLElement} element
         */
        setElement: function (element) {
            this.element = element;
        },
        _createElement: function () {
            this.element = _createDiv();
        },
        /**
         * Get the root HTMLElement of the UIComponent.
         *
         * @method getElement
         * @return {HTMLElement} element
         * @example
         *    uicomponent.getElement();
         */
        getElement: function () {
            return this.element;
        },
        destroy: function () {
            var element = this.getElement();
            element.parentNode.removeChild(element);

        }
    };

    /**
     * To create an UIComponent child class call extend providing the class definition.
     *
     * @method extend
     * @static
     * @param {Object} definition
     * @return {UIComponent} component
     * @example
     *    interfaces.UIComponent.extend({
	 *     init: function() {
	 *     }
	 * });
     */
    UIComponent.extend = __extend;


    /**
     * The AppContext interface represents a utility that the App uses to share a common context between Regions using the sandbox pattern.
     *
     * @class interfaces.AppContext
     */
    function AppContext() {
        this.uid = guidGenerator();
        this._components = {};
        this.init.apply(this, arguments);
    }

    //TODO: need implement method to Remove Specific Component
    AppContext.prototype = {

        /**
         * The init method is automatically called by the constructor when using the "new" operator. If an object with
         * key/value pairs is passed into the constructor then the options variable will have those key/value pairs.
         *
         * @method init
         * @param options
         */
        init: function (options) {
        },

        /**
         * Destroy all registered components.
         *
         * @method destroyAll
         * @private
         */
        destroyAll: function () {
            var components = this._components;
            Object.keys(components).forEach(function (key) {
                components[key].destroy();

            });
        }
    };

    /**
     * To create an AppContext child class call extend providing the class definition.
     *
     * @method extend
     * @static
     * @param {Object} definition
     * @return {AppContext} context
     */
    AppContext.extend = __extend;


    return {
        App: App,
        UIComponent: UIComponent,
        AppContext: AppContext,
        extend: __extend,
        _private: _private
    };
});

/*global define, document */
define('jscore/ext/dom',[
    'jscore/base/jquery'
], function ($) {
    

    var onDom = {},
        ON_DOM_ATTACHED_EVENT = 'onDomAttached',
        ON_DOM_DETACHED_EVENT = 'onDomDetached';

    function _parse() {
        /*jshint validthis:true */
        return $.parseHTML.apply(this, arguments)[0];
    }

    function getResult(el) {
        var $el = $(el);
        var result = $el.data('element');

        if (!result) {
            result = Element.wrap(el);
            $el.data('element', result);
        }
        return result;
    }

    var idCounter = 0;

    function uniqueId(prefix) {
        var id = ++idCounter + '';
        return prefix ? prefix + id : id;
    }

    function checkAttached(element) {
        return ($(element._getHTMLElement()).parents('html').length > 0);
    }

    function _addModifiers(element) {
        var $el = $(element._getHTMLElement());

        var classes = $el.attr("class");
        if (classes !== undefined) {

            classes = classes.split(" ");


            if (!element._modifiersInitialised) {
                element._modifiers = {};
                element._modifierPrefix = classes[0];

                // Regex check for modifiers [completeString, key]
                var regex = new RegExp("(?:_([a-zA-Z0-9]+)(?:_[a-zA-Z0-9]+)?)");

                for (var i = 0; i < classes.length; i++) {
                    var matches = classes[i].match(regex);
                    if (matches) {
                        element._modifiers[matches[1]] = element._modifierPrefix + matches[0];
                    }
                }
                element._modifiersInitialised = true;
            }
        }
    }

    /**
     * The Element is a common abstraction of the HTML DOM element.
     *
     * @class ext.dom.Element
     */
    function Element() {
        this._setHTMLElement(_parse('<div></div>'));

    }


    Element.prototype = {
        /**
         * Find an Element within the scope of the Element using a CSS selector String.
         *
         * @method find
         * @param {String} selector
         * @return {Element} element
         * @example
         *    element.find(".MyClass");
         */
        find: function (selector) {
            return dom.find(selector, this);
        },

        /**
         * Returns the value of the DOM element.
         *
         * @method getValue
         * @return {String} value
         * @example
         *    var val = element.getValue();
         */
        getValue: function () {
            return dom.getValue(this);
        },

        /**
         * Sets the value of the DOM element
         *
         * @method setValue
         * @param {any} value
         * @example
         *    element.setValue("someValue");
         */
        setValue: function (value) {
            dom.setValue(this, value);
        },

        /**
         * Appends a child Element to the Element.
         *
         * @method append
         * @param {Element} child
         * @example
         *    element.append(childElement);
         */
        append: function (child) {
            dom.append(this, child);
        },

        /**
         * Removes the Element from the DOM.
         *
         * @method remove
         * @example
         *    element.remove();
         */
        remove: function () {
            dom.remove(this);
        },
        /**
         * Detach the Element from the DOM.
         *
         * @method detach
         * @example
         *    element.detach();
         */
        detach: function () {
            dom.detach(this);
        },
        /**
         * Finds all child Elements of the Element.
         *
         * @method children
         * @return {Element[]}elements
         * @example
         *    element.children();
         */
        children: function () {
            return dom.children(this);
        },

        /**
         * Sets up a DOM event handler for the Element. Event is passed into the callback, and contains "originalEvent" and "preventDefault".
         *
         * @method addEventHandler
         * @param {String} event
         * @param {Function} callback
         * @param {Object} [context]
         * @return {String} eventID

         * @example
         * element.addEventHandler("click", function() {
		 *     console.log("element clicked!");
		 * });
         */
        addEventHandler: function (event, callback, context) {
            return dom.addEventHandler(this, event, callback, context);
        },
        /**
         * Removes a DOM event handler for the element.
         *
         * @method removeEventHandler
         * @param {String} eventID

         * @example
         *    element.removeEventHandler(eventId);
         */
        removeEventHandler: function (eventID) {
            dom.removeEventHandler(this, eventID);
        },
        /**
         * Trigger a DOM event handler for the Element.
         *
         * @method trigger
         * @param {String} event
         * @example
         *    element.trigger("click");
         */
        trigger: function (event) {
            dom.trigger(this, event);
        },

        /**
         * Returns the text content of the DOM element.
         *
         * @method getText
         * @return {String} text
         * @example
         *    var text = element.getText();
         */
        getText: function () {
            return dom.getText(this);
        },

        /**
         * Sets the text content of the DOM element.
         *
         * @method setText
         * @param {String} text
         * @example
         *    element.setText("someText");
         */
        setText: function (text) {
            dom.setText(this, text);
        },


        /**
         * Attributes may be defined in static HTML or using the setAttribute() method. The setAttribute() method may also be used to change an attributes value. To retrieve and change DOM properties such as the checked, selected, or disabled state of form elements, use the <a href="#methods_setProperty">setProperty()</a> and <a href="#methods_getProperty">getProperty()</a> methods.
         *
         * @method setAttribute
         * @param {String} attr
         * @param {String} value
         * @example
         *    element.setAttribute("data-someAttr", "value");
         */
        setAttribute: function (attr, value) {
            dom.setAttribute(this, attr, value);
        },

        /**
         * Attributes may be defined in static HTML or using the setAttribute() method. The getAttribute() method gets the value of the specified attribute of the DOM element. To access and modify DOM properties such as the checked, selected, or disabled state of form elements, use the <a href="#methods_setProperty">setProperty()</a> and <a href="#methods_getProperty">getProperty()</a> methods.
         *
         * @method getAttribute
         * @param {String} attr
         * @return {String} value
         * @example
         *    var attr = element.getAttribute("data-someAttr");
         */
        getAttribute: function (attr) {
            return dom.getAttribute(this, attr);
        },

        /**
         * Sets the property for the DOM element equal to the value. To retrieve and change DOM attributes such as data- attributes that are part of the HTML mark-up, use the <a href="#methods_setAttribute">setAttribute()</a> and <a href="#methods_getAttribute">getAttribute()</a> methods.
         *
         * @method setProperty
         * @param {String} prop
         * @param {Any} value
         * @example
         *    element.setProperty("checked", true);
         */
        setProperty: function (prop, value) {
            dom.setProperty(this, prop, value);
        },

        /**
         * Gets the value of the property for the DOM element. To retrieve and change DOM attributes such as data- attributes that are part of the HTML mark-up, use the <a href="#methods_setAttribute">setAttribute()</a> and <a href="#methods_getAttribute">getAttribute()</a> methods.
         *
         * @method getProperty
         * @param {String} prop
         * @return {Any} value
         * @example
         *    var prop = element.getProperty("checked");
         */
        getProperty: function (prop) {
            return dom.getProperty(this, prop);
        },

        /**
         * Gets the value of the specified inline style for the element.
         *
         * @method getStyle
         * @param {String} styleName
         * @return {String} value
         *
         * @example
         *    element.getStyle("backgroundColor");
         */
        getStyle: function (styleName) {
            return dom.getStyle(this, styleName);
        },

        /**
         * Sets the inline style values for the element. If an object is passed as a first parameter, that object will be used to set the styles. If the first parameter is a string (the name of the property), then the second parameter should be a string with the value for the property.
         *
         * @method setStyle
         * @param {Object/String} styles
         * @param {String} [value]
         *
         * @example
         * element.setStyle({
		 *     backgroundColor: "blue"
		 * });
         *
         * element.setStyle("backgroundColor", "blue");
         */
        setStyle: function (styles, value) {
            dom.setStyle(this, styles, value);
        },

        /**
         * Adds a CSS Class to the element in the following form prefix&#95;key&#95;value (If no value is specified, the class will be prefix_key). If the
         * element already has a CSS class with the modifier, it is replaced instead. Prefix is equal to the existing class name the element already has.
         * If the element does not have a class name, this function will throw an error. For more information about modifiers, please check the CSS
         * style guide <a href="../../guidelines/css.html">here</a>.
         *
         * @method setModifier
         * @param {String} key
         * @param {String} [value]
         *
         * @example
         * element.setModifier("disabled");
         * element.setModifier("opacity", "80");
         */
        setModifier: function (key, value) {
            dom.setModifier(this, key, value);
        },

        /**
         * Removes any class name that has been created by the setModifier function.
         *
         * @method removeModifier
         * @param {String} key
         *
         * @example
         *    element.removeModifer("disabled");
         */
        removeModifier: function (key) {
            dom.removeModifier(this, key);
        },
        _getHTMLElement: function () {
            return this.element;
        },


        _setHTMLElement: function (el) {
            this.element = el;
            this._modifiersInitialised = false;

            _addModifiers(this);

        }
    };

    /**
     * Parses a HTML String and creates an Element from it.
     *
     * @method parse
     * @static
     * @param {String} html
     * @return {Element} element
     *
     * @example
     *    var element = core.Element.parse("<div></div>");
     */
    Element.parse = function (html) {
        var element = new Element();
        element._setHTMLElement(_parse(html));
        return element;
    };

    /**
     * Wraps a native element and creates an Element.
     *
     * @method wrap
     * @static
     * @param {HTMLElement} element
     * @return {Element} element
     *
     * @example
     * var nativeElement = document.createElement("div");
     * var element = core.Element.wrap(nativeElement);
     */
    Element.wrap = function (element) {
        var wrappedElement = new Element();
        wrappedElement._setHTMLElement(element);
        return wrappedElement;
    };
    /**
     * The ext.dom package provides an abstract API for DOM manipulation.
     *
     * @class ext.dom
     */
    var dom = {
        /**
         * Access the ext.dom.Element object
         *
         * @property Element
         * @type Element
         */
        Element: Element,

        /**
         * Find an Element within the scope of the provided Element using a CSS selector String.
         *
         * @method find
         * @static
         * @param {String} selector
         * @param {Element} element
         * @return {Element} element
         *
         * @example
         *    dom.find(".MyClass", element);
         */
        find: function (selector, element) {
            if (!element) return;
            var newElement = $(element._getHTMLElement()).find(selector)[0];
            if (newElement !== undefined) {
                return getResult(newElement);
            }
        },

        /**
         * Sets the value of the DOM element.
         *
         * @method setValue
         * @static
         * @param {Element} element
         * @param {any} value
         * @example
         *    dom.setValue(element, "someValue");
         */
        setValue: function (element, value) {
            $(element._getHTMLElement()).val(value);
        },

        /**
         * Returns the value of the DOM element.
         *
         * @method getValue
         * @static
         * @param {Element} element
         * @return {String} value
         *
         * @example
         *    var val = dom.getValue(element);
         */
        //TODO: this method need remove, and move for input fields
        getValue: function (element) {
            return $(element._getHTMLElement()).val();
        },

        /**
         * Appends child element to the target element.
         *
         * @method append
         * @static
         * @param {Element} parent
         * @param {Element} child
         *
         * @example
         *    dom.append(parentElement, childElement);
         */
        append: function (parent, child) {
            $(parent._getHTMLElement()).append(child._getHTMLElement());
            this.runOnDomAttached('attach');
        },
        runOnDomAttached: function (method) {
            for (var key in onDom) {
                var element = onDom[key].element;
                if (method === 'attach') {
                    if (onDom[key].attached === false) {
                        if (checkAttached(element) === true) {
                            element.trigger(ON_DOM_ATTACHED_EVENT);
                            onDom[key].attached = true;
                        }
                    }
                }
                else {
                    if (onDom[key].attached === true) {
                        if (checkAttached(element) === false) {
                            element.trigger(ON_DOM_DETACHED_EVENT);
                            onDom[key].attached = false;
                        }
                    }
                }

            }
        },
        /**
         * Removes the element from the DOM.
         *
         * @method remove
         * @static
         * @param {Element} element
         *
         * @example
         *    dom.remove(element);
         */
        remove: function (element) {
            $(element._getHTMLElement()).remove();
            this.runOnDomAttached('detach');

        },
        /**
         * Detaches the element from the DOM.
         *
         * @method detach
         * @static
         * @param {Element} element
         *
         * @example
         *    dom.detach(element);
         */
        detach: function (element) {
            $(element._getHTMLElement()).detach();
            this.runOnDomAttached('detach');

        },
        /**
         * Finds all child elements of the element.
         *
         * @method children
         * @static
         * @param {Element} element
         * @return {Element[]} elements
         *
         * @example
         *    dom.children(element);
         */
        //TODO: Review this method
        children: function (element) {
            var $el = $(element._getHTMLElement()).children();
            var result = [];
            for (var i = 0; i < $el.length; i++) {
                result.push(getResult($el[i]));
            }

            return result;

        },

        /**
         * Returns the text content of the DOM element.
         *
         * @method getText
         * @param {Element} element
         * @return {String} text
         * @example
         *    var text = dom.getText(element);
         */
        getText: function (element) {
            return $(element._getHTMLElement()).text();
        },

        /**
         * Sets the text content of the DOM element.
         *
         * @method setText
         * @static
         * @param {Element} element
         * @param {String} text
         * @example
         *    dom.setText(element, "someText");
         */
        setText: function (element, text) {
            $(element._getHTMLElement()).text(text);
        },


        /**
         * Attributes may be defined in static HTML or using the setAttribute() method. The setAttribute() method may also be used to change an attributes value. To retrieve and change DOM properties such as the checked, selected, or disabled state of form elements, use the <a href="#methods_setProperty">setProperty()</a> and <a href="#methods_getProperty">getProperty()</a> methods.
         *
         * @method setAttribute
         * @static
         * @param {Element} element
         * @param {String} attr
         * @param {String} value
         * @example
         *    dom.setAttribute(element, "data-someAttr", "value");
         */
        setAttribute: function (element, attr, value) {
            $(element._getHTMLElement()).attr(attr, value);
        },

        /**
         * Attributes may be defined in static HTML or using the setAttribute() method. The getAttribute() method gets the value of the specified attribute of the DOM element. To access and modify DOM properties such as the checked, selected, or disabled state of form elements, use the <a href="#methods_setProperty">setProperty()</a> and <a href="#methods_getProperty">getProperty()</a> methods.
         *
         * @method getAttribute
         * @static
         * @param {Element} element
         * @param {String} attr
         * @return {String} value
         * @example
         *    var attr = dom.getAttribute(element, "data-someAttr");
         */
        getAttribute: function (element, attr) {
            return $(element._getHTMLElement()).attr(attr);
        },

        /**
         * Sets the property for the DOM element equal to the value. To retrieve and change DOM attributes such as data- attributes that are part of the HTML mark-up, use the <a href="#methods_setAttribute">setAttribute()</a> and <a href="#methods_getAttribute">getAttribute()</a> methods.
         *
         * @method setProperty
         * @static
         * @param {Element} element
         * @param {String} prop
         * @param {Any} value
         * @example
         *    dom.setProperty(element, "checked", true);
         */
        setProperty: function (element, prop, value) {
            $(element._getHTMLElement()).prop(prop, value);
        },

        /**
         * Gets the value of the property for the DOM element. To retrieve and change DOM attributes such as data- attributes that are part of the HTML mark-up, use the <a href="#methods_setAttribute">setAttribute()</a> and <a href="#methods_getAttribute">getAttribute()</a> methods.
         *
         * @method getProperty
         * @static
         * @param {Element} element
         * @param {String} prop
         * @return {Any} value
         * @example
         *    var prop = dom.getProperty(element, "checked");
         */
        getProperty: function (element, prop) {
            return $(element._getHTMLElement()).prop(prop);
        },

        /**
         * Sets up a DOM event handler for an element. Event is passed into the callback, and contains "originalEvent" and "preventDefault".
         *
         * @method addEventHandler
         * @static
         * @param {String} event
         * @param {Element} element
         * @param {Function} callback
         * @param {Object} [context]
         * @return {String} eventId
         *
         * @example
         * dom.addEventHandler("click", element, function() {
		 *     console.log("element clicked!");
		 * });
         */
        addEventHandler: function (element, event, callback, context) {
            if (!context) {
                context = this;
            }
            var eventId = uniqueId('event');
            event += '.delegateEvents' + eventId;

            if (event.indexOf(ON_DOM_ATTACHED_EVENT) != -1) {
                onDom[eventId] = {
                    element: element,
                    attached: checkAttached(element)
                };
                if (checkAttached(element) === true) {
                    element.trigger(ON_DOM_ATTACHED_EVENT);
                }
            }

            if (event.indexOf(ON_DOM_DETACHED_EVENT) != -1) {
                onDom[eventId] = {
                    element: element,
                    attached: checkAttached(element)
                };
                if (checkAttached(element) === true) {
                    element.trigger(ON_DOM_DETACHED_EVENT);
                }
            }


            var wrappedCallback = function (e) {
                function preventDefault() {
                    e.preventDefault();
                }

                var wrappedEvent = {
                    originalEvent: e.originalEvent,
                    preventDefault: preventDefault
                };

                callback.call(context, wrappedEvent);
            };

            $(element._getHTMLElement()).on(event, wrappedCallback);
            return eventId;
        },
        /**
         * Removes a DOM event handler for the element.
         *
         * @method removeEventHandler
         * @static
         * @param {String} eventId
         * @param {Element} element
         *
         * @example
         *    dom.removeEventHandler(eventIdString, element);
         */
        removeEventHandler: function (element, eventId) {
            if (onDom[eventId] !== false) {
                delete onDom[eventId];
            }
            $(element._getHTMLElement()).off('.delegateEvents' + eventId);
        },
        /**
         * Trigger a DOM event handler for the element.
         *
         * @method trigger
         * @static
         * @param {String} event
         * @param {Element} element
         * @example
         *    dom.trigger("click", element);
         */
        trigger: function (element, event) {
            $(element._getHTMLElement()).trigger(event);
        },

        /**
         * Gets the value of the specified inline style for the element.
         *
         * @method getStyle
         * @static
         * @param {Element} element
         * @param {String} styleName
         * @return {String} value
         *
         * @example
         *    dom.getStyle(element, "backgroundColor");
         */
        getStyle: function (element, styleName) {
            return $(element._getHTMLElement()).css(styleName);
        },

        /**
         * Sets the inline style values for the element. If an object is passed as a second parameter, that object will be used to set the styles. If the second parameter is a string (the name of the property), then the third parameter should be a string with the value for the property.
         *
         * @method setStyle
         * @static
         * @param {Element} element
         * @param {Object/String} styles
         * @param {String} [value]
         *
         * @example
         * dom.setStyle(element, {
		 *     backgroundColor: "blue"
		 * });
         *
         * dom.setStyle(element, "backgroundColor", "blue");
         */
        setStyle: function (element, styles, value) {
            if (value !== undefined) {
                $(element._getHTMLElement()).css(styles, value);
            } else {
                $(element._getHTMLElement()).css(styles);
            }
        },

        /**
         * Adds a CSS Class to the element in the following form prefix&#95;key&#95;value (If no value is specified, the class will be prefix_key). If the
         * element already has a CSS class with the modifier, it is replaced instead. Prefix is equal to the existing class name the element already has.
         * If the element does not have a class name, this function will throw an error. For more information about modifiers, please check the CSS
         * style guide <a href="../../guidelines/css.html">here</a>.
         *
         * @method setModifier
         * @static
         * @param {Element} element
         * @param {String} key
         * @param {String} [value]
         *
         * @example
         * dom.setModifier(element, "disabled");
         * dom.setModifier(element, "opacity", "80");
         */
        setModifier: function (element, key, value) {

            if ((key && key.indexOf(" ") >= 0) || (value && value.indexOf(" ") >= 0)) {
                throw new Error("Key/Value in modifier should not contain whitespace");
            }

            if (element._modifiers === undefined) {
                element._modifiers = {};
            }

            var $el = $(element._getHTMLElement());

            _addModifiers(element);


            if (element._modifierPrefix !== undefined) {
                var prefixedModifier = element._modifierPrefix + "_" + key;

                if (value) {
                    prefixedModifier += "_" + value;
                }
                if (element._modifiers && element._modifiers[key]) {
                    $el.removeClass(element._modifiers[key]);
                }
                $el.addClass(prefixedModifier);
                if (element._modifiers === undefined) {
                    element._modifiers = {};
                }
                element._modifiers[key] = prefixedModifier;
            } else {
                throw new Error("Element does not have a class.");
            }
        },

        /**
         * Removes any class name that has been created by the setModifier function.
         *
         * @method removeModifier
         * @static
         * @param {Element} element
         * @param {String} key
         *
         * @example
         *    dom.removeModifer(element, "disabled");
         */
        removeModifier: function (element, key) {
            var $el = $(element._getHTMLElement());
            if (element._modifiers && element._modifiers[key]) {
                $el.removeClass(element._modifiers[key]);
                delete element._modifiers[key];
            }
        }

    };


    return  dom;

})
;
/**
 * The core contains a set of base classes that can be extended by developers to create scalable client apps.
 *
 * @module core
 */
/*global define */

define('jscore/core',[
    './interfaces',
    './ext/dom'
], function (interfaces, dom) {
    
    /**
     *  private method, to make available for tests
     */
    var _private = {},
        appStyles = [];
    /**
     * setRootElement
     *  @return {Element}
     */
    _private.setRootElement = setRootElement;
    function setRootElement() {
        /*jshint validthis:true */
        if (this.View !== undefined) {
            this.view = new this.View({presenter: this });
        }
        if (this.view !== undefined) {
            if (typeof this.view === 'function') {
                this.view = this.view();
            }
            this.view.render();
            return this.view.element;
        } else {
            return new Element();

        }
    }

    _private.addStyles = addStyles;
    function addStyles(styles, Object) {
        if (Object && Object.constructor.prototype.styles === undefined) {
            var style = document.createElement("style");
            style.textContent = styles;
            Object.constructor.prototype.styles = style;
            appStyles.push(style);
            document.head.appendChild(style);
        }
    }


    /**
     * core.Element is an alias for <a href="../classes/ext.dom.Element.html">ext.dom.Element</a>
     *
     * @class core.Element
     *
     */
    var Element = dom.Element;

    /**
     * The EventBus allows objects to subscribe and publish events that other components may react to.
     *
     * @class core.EventBus
     */


    function EventBus() {
        this._channels = [];
    }

    /** Generate Random UID
     *
     * @method guidGenerator
     * @private
     * @return {String}
     * */
    var guidGenerator = interfaces._private.guidGenerator;

    EventBus.prototype = {

        _hasChannel: function (channel) {
            return this._channels.hasOwnProperty(channel);
        },

        _addChannel: function (name) {
            this._channels[name] = [];
        },

        _getChannel: function (name) {
            return this._channels[name];
        },


        /**
         * Subscribe to events on a channel. Provide a callback function to handle the event. Returns a subscription id that can be used to remove the subscription.
         *
         * @method subscribe
         * @param {String} channel
         * @param {Function} callback
         * @param {Object} [context]
         * @return  {String} eventId
         *
         * @example
         * eventBus.subscribe("myTopic", function(data) {
		 *     console.log(data);
		 * });
         */
        subscribe: function (channel, callback, context) {
            if (!this._hasChannel(channel)) {

                this._addChannel(channel);
            }

            context = context ? context : this;

            var subscription = {
                id: guidGenerator(),
                channel: channel,
                fn: callback,
                context: context
            };

            this._getChannel(channel).push(subscription);
            return subscription.id;

        },

        /**
         * Publish data on a channel on the EventBus. If the channel does not exist it is created.
         *
         * @method publish
         * @param {String} channel
         * @param {any} [data]*
         *
         * @example
         *    eventBus.publish("myTopic", "someData");
         */
        publish: function (channel, data) {
            if (this._hasChannel(channel)) {
                var subscribers = this._getChannel(channel);
                var args = Array.prototype.slice.call(arguments, 1);

                var x = subscribers.length;
                for (var i = 0; i < x; i++) {
                    subscribers[i].fn.apply(subscribers[i].context, args);
                }
            }
        },
        /**
         * Removes a subscription from the EventBus so that subscription will no longer receive any events.
         *
         * @method unsubscribe
         * @param {String} channel
         * @param {String} identifier
         *
         * @example
         *    eventBus.unsubscribe("myTopic", subscriptionId);
         */
        unsubscribe: function (channel, identifier) {

            if (this._hasChannel(channel)) {
                var subscribers = this._getChannel(channel);

                var x = subscribers.length;
                for (var i = 0; i < x; i++) {
                    if (subscribers[i].id === identifier) {
                        subscribers = subscribers.splice(i, 1);
                        break;
                    }
                }
            }
        }

    };


    /**
     * The AppContext interface represents a utility that the App uses to share a common context between Regions using the sandbox pattern.
     *
     * @class core.AppContext
     * @extends interfaces.AppContext
     */
    var AppContext = interfaces.AppContext.extend({
        /**
         * Destroy all registered components.
         *
         * @method destroyAll
         * @private
         */
        destroyAll: function () {
            var components = this._components;
            Object.keys(components).forEach(function (key) {
                components[key].stop();

            });
        }
    });
    /**
     * To create an AppContext child class call extend providing the class definition.
     *
     * @method extend
     * @static
     * @param {Object} definition
     * @return {AppContext} context
     *
     * @example
     * core.AppContext.extend({
	 *     init: function() {
	 *         console.log("Hello Context!");
	 *     }
	 * });
     */

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
         * @return {Object} context
         *
         * @example
         * createContext: function() {
		 *     return new MyCustomAppContext();
		 * }
         */
        createContext: function () {
            var appContext = new AppContext();
            appContext.eventBus = new EventBus();
            return appContext;
        },

        /**
         * Appends the app to a native HTMLElement or Element.
         *
         * @method _addToContainer
         * @private
         * @param {HTMLElement/Element} container
         */
        _addToContainer: function (container) {
            var parentElement;
            if (container instanceof HTMLElement) {
                parentElement = Element.wrap(container);
            }
            else {
                parentElement = container;
            }
            this._container = parentElement;

            this.attach();
        },

        /**
         * Removes the app from the container.
         *
         * @method _removeFromContainer
         * @private
         */
        _removeFromContainer: function () {
            this.detach();
            delete this._container;
            delete this.element;
        },

        _createElement: function () {
            this.element = setRootElement.apply(this, arguments);
        },
        /**
         * Function called any time it's attached to Parent.
         *
         * @method attach
         * @example
         *  app.attach();
         */
        onAttach: function () {

        },
        /**
         * Places the detached App back into the Parent.
         *
         * @method attach
         * @example
         *  app.attach();
         */
        attach: function () {
            var element = this.element;
            if (element !== undefined && element._getHTMLElement().parentNode !== this._container._getHTMLElement()) {
                this.constructor.prototype.counter++;
                if (this.constructor.prototype.counter === 1) {
                    var head = document.head;
                    appStyles.forEach(function (style) {
                        head.appendChild(style);
                    });
                }
                this._container.append(element);
                this.onAttach();
            }
        },

        /**
         * Appends the app to a new container.
         *
         * @param {HTMLElement/Element} container
         */
        attachTo: function (container) {
            var element = this.element;
            container = (container instanceof HTMLElement) ? container : container._getHTMLElement();
            if (element === undefined || element._getHTMLElement().parentNode !== container) {
                this.detach();
                this._addToContainer(container);
                this.onAttach();
            }
        },

        /**
         * Removes the App from the DOM, but does not stop the App. DOM events will still work when App is attached back.
         *
         * @method detach
         * @example
         *  app.detach();
         */
        detach: function () {
            var element = this.element;
            if (element !== undefined && element._getHTMLElement().parentNode === this._container._getHTMLElement()) {
                this.constructor.prototype.counter--;
                element.detach();
                if (this.constructor.prototype.counter === 0) {
                    appStyles.forEach(function (style) {
                        style.parentNode.removeChild(style);
                    });
                }
            }
        },
        /**
         * Shortcut method for getting the eventBus off the AppContext.
         *
         * @method getEventBus
         * @return {EventBus} eventBus
         *
         * @example
         *    app.getEventBus();
         */

        getEventBus: function () {
            return this.getContext().eventBus;
        },

        /**
         * Get the root Element of the App.
         *
         * @method getElement
         * @return {Element} element
         * @example
         *    app.getElement();
         */
        getElement: function () {
            return this.element;
        }


    });
    /**
     * To create an App child class call extend providing the class definition.
     *
     * @method extend
     * @static
     * @param {Object} definition
     * @return {App} app
     * @example
     * core.App.extend({
	 *     onStart: function() {
	 *         console.log("Hello App!");
	 *     }
	 * });
     */


    /**
     * The View class is responsible for template management. It may be used by any visible client component (App, Region, Widget) to load a HTML template.
     *
     * @class core.View
     */
    function View(options) {
        this.options = options || {};
        this.init.apply(this, arguments);
    }


    View.prototype = {

        /**
         * The init method is automatically called by the constructor when using the "new" operator. If an object with
         * key/value pairs is passed into the constructor then the options variable will have those key/value pairs.
         *
         * @method init
         * @param options
         */
        init: function (options) {
        },
        /**
         * Get the HTML template as a string. The developer must implement this method.
         *
         * @method getTemplate
         * @return {String} template
         *
         * @example
         * getTemplate: function() {
		 *     return "<div><p>MyTemplate</p></div>";
		 * }
         */
        getTemplate: function () {
        },

        /**
         * Get the template CSS as a string. The developer must implement this method if CSS is needed for the template.
         *
         * @method getStyle
         * @return {String} css
         * @example
         * getStyle: function() {
		 *     return ".myCSSStyle{color:blue}";
		 * }
         */
        getStyle: function () {
            return '';
        },

        /**
         * Render the template to the DOM.
         *
         * @method render
         * @example
         *    view.render();
         */
        render: function () {
            var style = this.getStyle();
            if (style.trim() !== '') {
                addStyles(style, this);
            }

            var template = this.getTemplate();

            if (typeof template === "string") {
                this.element = Element.parse(this.getTemplate());
            } else {
                this.element = template;
            }
        },

        /**
         * Get the root Element of the View.
         *
         * @method getElement
         * @return {Element} element
         * @example
         *    view.getElement();
         */
        getElement: function () {
            return this.element;
        }

    };

    /**
     * To create a View child class call extend providing the class definition.
     *
     * @method extend
     * @static
     * @param {Object} definition
     * @return {View} view

     * @example
     * core.View.extend({
	 *     getTemplate: function() {
	 *         return template;
	 *     }
	 * });
     */
    View.extend = interfaces.extend;


    /**
     * The App may create Region instances to manage specific areas of the screen with a well defined responsibility. Regions are completely independent of each other and communicate via event passing using the EventBus. In this way any Region may be removed without affecting other regions. Likewise Regions may be independently restarted should they get into an error state. For these reasons, regions may not be nested.
     *
     * @class core.Region
     * @extends interfaces.UIComponent
     */
    var Region = interfaces.UIComponent.extend({
        /**
         * Call this method to start the region.
         *
         * @method start
         * @param {Element} parent
         * @example
         *    region.start();
         */
        start: function (parent) {
            if (!this._parent) {
                this._createElement();
                parent.append(this.getElement());
                this._parent = parent;
                this.onStart();
                var context = this.context;
                if (context && context._components) {
                    context._components[this.uid] = this;
                }

            }

        },

        /**
         * Implement this method to define how to start the Region.
         *
         * @method onStart
         * @example
         * onStart: function() {
		 *     console.log("onStart called");
		 * }
         */
        onStart: function () {
        },

        /**
         * Call this method to stop the region.
         *
         * @method stop
         * @example
         *    region.stop();
         */
        //TODO: stop method need to finish
        stop: function () {
            if (this._parent) {
                var context = this.getContext();
                if (context !== undefined) {
                    var components = context._components;
                    if (components !== undefined && components[this.uid] !== undefined) {
                        delete  components[this.uid];
                    }
                }

                this.destroy();
                delete this._parent;
                this.onStop();
            }

        },

        /**
         * Implement this method to define how to stop the Region.
         *
         * @method onStop
         * @example
         * onStop: function() {
		 *     console.log("Stopping Region...");
		 * }
         */
        onStop: function () {
        },

        /**
         * Create the Region root Element.
         *
         * @method createElement
         * @return {Element} element
         */
        _createElement: function () {
            this.element = setRootElement.apply(this, arguments);
        },

        /**
         * Shortcut method for getting the eventBus from the AppContext.
         *
         * @method getEventBus
         * @return {EventBus} eventBus
         */
        getEventBus: function () {
            return this.getContext().eventBus;
        },

        /**
         * Removes the Region root Element from the DOM.
         *
         * @method destroy
         * @private
         */
        destroy: function () {
            this.getElement().remove();

        },

        /**
         * Set the AppContext of the Region.
         *
         * @method setContext
         * @private
         * @param {AppContext} context
         */
        setContext: function (context) {
            context._components[this.uid] = this;
            this.context = context;
        },

        /**
         * Returns the instance of the AppContext
         *
         * @method getContext
         * @return {AppContext} context
         * @example
         *    region.getContext();
         */
        getContext: function () {
            return this.context;
        }

        /**
         * Get the root Element of the Region.
         *
         * @method getElement
         * @return {Element} element
         * @example
         *    region.getElement();
         */
    });
    /**
     * To create an Region child class call extend providing the class definition.
     *
     * @method extend
     * @static
     * @param {Object} definition
     * @return {Region} region
     * @example
     * core.Region.extend({
	 *     onStart: function() {
	 *     }
	 * });
     */

    /**
     * Initialises the Region with an AppContext and returns an instance.
     *
     * @method create
     * @static
     * @private
     * @param {AppContext} context
     * @return {Region} region
     * @example
     *    var regionInstance = Region.create(this.getContext());
     */


    /**
     * The Widget class is a piece of reusable generic UI code. It does not have any knowledge of its context or how it is being used. Widgets can be simple like buttons or text input fields or complex like data-grids or maps. Widgets are composable and may be nested as required to construct composite widgets. Widgets may be reused in multiple apps. A common set of widgets is provided as a common UI component.
     *
     * The use of widgets for purely layout purposes should be avoided as the parent (App, Place or Region) template may be used for this purpose along with appropriate CSS. Widgets may be used where some user interaction is required. Even in this scenario widgets are not mandatory and the functionality may be handled directly in the parent JavaScript. Widgets should be considered for encapsulating complex interaction logic and where code reuse is possible.
     *
     * @class core.Widget
     * @extends interfaces.UIComponent
     */
    var Widget = interfaces.UIComponent.extend({
        _afterInit: function (options) {
            this._createElement();
            this.onViewReady.apply(this, arguments);

        },
        /**
         * Implement this method to run statements after the view for the Widget has been initialized. This is automatically called after init.
         *
         * @method onViewReady
         * @param {Object} options
         * @example
         * onViewReady: function(options) {
         *     this.view.doSomething();
         * }
         */
        onViewReady: function (options) {

        },

        /**
         * Implement this method to run statements after the widget has been attached to the parent element.
         *
         * @method onAttach
         * @example
         * onAttach: function() {
         *     this.view.doSomething();
         * }
         */
        onAttach: function () {
        },

        /**
         * Adds the Widget's element to the new parent element.
         *
         * @method attachTo
         * @param {Element} parent
         * @example
         *    widget.attachTo(this.getElement());
         */
        attachTo: function (parent) {
            if (!this._parent || (this.element._getHTMLElement().parentNode !== parent._getHTMLElement())) {
                this.detach();
                this._parent = parent;
                this.attach();
            }
        },

        /**
         * Places the detached Widget back into the defined parent element.
         *
         * @method attach
         * @example
         *  widget.attach();
         */
        attach: function () {
            var element = this.element;
            var parent = this._parent;
            if (element !== undefined && parent !== undefined && element._getHTMLElement().parentNode !== parent._getHTMLElement()) {
                parent.append(element);
                this.onAttach();
            }

        },

        /**
         * Removes the Widget from the parent element, but does not destroy the Widget. DOM events will still work when Widget is attached back.
         *
         * @method detach
         * @example
         *  widget.detach();
         */
        detach: function () {
            var element = this.element;
            var parent = this._parent;
            if (element !== undefined && parent !== undefined && element._getHTMLElement().parentNode === parent._getHTMLElement()) {
                element.detach();
            }

        },
        /**
         * Bind an event handling function to the Widget event.
         *
         * @method addEventHandler
         * @param {String} eventName
         * @param {Function} fn
         * @return {String} id
         * @example
         * widget.addEventHandler("customEvent", function(data) {
		 *     console.log("customEvent was triggered with " + data);
		 * });
         */
        addEventHandler: function (eventName, callback, context) {
            if (this.eventBus === undefined) {
                this.eventBus = new EventBus();
            }

            return this.eventBus.subscribe.apply(this.eventBus, arguments);
        },
        /**
         * Unbind an event handling function from the Widget event.
         *
         * @method removeEventHandler
         * @param {String} eventName
         * @param {String} id

         * @example
         *    widget.removeEventHandler("customEvent", eventId);
         */
        removeEventHandler: function (eventName, id) {
            if (this.eventBus) {
                this.eventBus.unsubscribe.apply(this.eventBus, arguments);
            }
        },

        /**
         * Trigger a Widget event.
         *
         * @method trigger
         * @param {String} eventName
         * @param {any} [data]*
         *
         * @example
         *    widget.trigger("customEvent", "someData");
         */
        trigger: function (eventName, data) {
            if (this.eventBus) {
                this.eventBus.publish.apply(this.eventBus, arguments);
            }
        },

        /**
         * Create the Widget root Element.
         *
         * @method _createElement
         * @private
         * @return {Element} element
         *
         */
        _createElement: function () {
            this.element = setRootElement.apply(this, arguments);
        },

        /**
         * Removes the Widget root Element from the DOM.
         *
         * @method destroy
         *
         * @example
         *    widget.destroy();
         */
        destroy: function () {
            delete this.eventBus;
            this.getElement().remove();
        }

        /**
         * Get the root Element of the Widget.
         *
         * @method getElement
         * @return {Element} element
         *
         * @example
         *    widget.getElement();
         */
    });
    /**
     * To create an Widget child class call extend providing the class definition.
     *
     * @method extend
     * @static
     * @param {Object} definition
     * @return {Widget} widget
     * @example
     * core.Widget.extend({
	 *     init: function() {
	 *     }
	 * });
     */

    /**
     * Custom XmlHttpRequest class. Returned by networking functions.
     *
     * @class core.XHR
     */
    var XHR = function(nativeXHR) {
        this._nativeXHR = nativeXHR;
    };

    XHR.prototype = {
        /**
         * Aborts the current request.
         *
         * @method abort
         *
         * @example
         *    xhr.abort();
         */
        abort: function() {
            this._nativeXHR.abort.call(this._nativeXHR);
        },

        /**
         * Gets the current state of the request. 
         *
         * @method getReadyState
         * @return {Integer} readyState
         *
         * @example
         *    xhr.getReadyState();
         */
        getReadyState: function() {
            return this._nativeXHR.readyState;
        },

        /**
         * Gets the HTTP status code of the request
         *
         * @method getStatus
         * @return {Integer} status
         *
         * @example
         *    xhr.getStatus();
         */
        getStatus: function() {
            return this._nativeXHR.status;
        },

        /**
         * Gets the HTTP status text of the request
         *
         * @method getStatusText
         * @return {String} statusText
         *
         * @example
         *    xhr.getStatusText();
         */
        getStatusText: function() {
            return this._nativeXHR.statusText;
        }
    };



    return {
        App: App,
        AppContext: AppContext,
        EventBus: EventBus,
        Region: Region,
        Widget: Widget,
        View: View,
        Element: Element,
        XHR: XHR,
        extend: interfaces.extend,
        _private: _private,
        version: "{{version}}" // TODO: remove hardcode
    };
});
/*globals define */
define('jscore/ext/binding',[
    'jscore/core',
    'jscore/ext/utils/base/underscore'
], function (core, _) {

    /**
     * Observable represents a value changing over time. The main difference from a typical variable is that you can be notified every time it changes.
     */
    var Observable = function (subscribe) {
        this.subscribe = subscribe;
    };

    Observable.extend = core.extend;

    Observable.prototype = {
        map: function (fn) {
            return new Observable(function (subscriber) {
                this.subscribe(function (val) {
                    subscriber(fn(val));
                });
            }.bind(this));
        }
    };

    /**
     * Creates Observable from an event target and event name. Event target can be any object with addEventHandler method, such as Widget or Model. Subscribers will be called every time a new event is emitted.
     *
     * @private
     * @method eventTargetObservable
     * @param {Object} target
     * @param {String} eventName
     * @returns {Observable} observable
     */
    var eventTargetObservable = function (target, eventName) {
        return new Observable(function (subscriber) {
            target.addEventHandler(eventName, subscriber);
        });
    };

    var Bindable = Observable.extend({

        /**
         * Bindable is a value changing over time which can also be bound to another value, so that they stay in sync.
         *
         * The following options are accepted:
         *   <ul>
         *       <li>get: a function which should return current value this object is wrapping.</li>
         *       <li>set: a function which should set wrapped object's value to the one provided in the first argument.</li>
         *       <li>events: an Observable this bindable will be subscribed to. Every time event is emitted, bindable will get the new value using get method and inform its listeners that the value has been changed.</li>
         *   </ul>
         *
         * //@class ext.binding.Bindable
         * @constructor
         * @param {Object} options
         */
        constructor: function (options) {
            this.subscribers = [];
            this.options = options;
            if (options.events && options.get) {
                this.events = options.events.map(options.get);
                this.trigger(options.get());
                this.events.subscribe(this.trigger.bind(this));
            } else {
                this.events = new Observable(function () {});
            }
        },

        subscribe: function (subscriber) {
            if (_.isFunction(subscriber)) {
                this.events.subscribe(subscriber);
            } else {
                this.subscribers.push(subscriber);
                if (this.value !== undefined) {
                    subscriber.fn(this.value);
                }
            }
        },

        addSyncSource: function (source) {
            source.subscribe({
                source: this,
                fn: function (value) {
                    this.value = value;
                    if (this.options.set) {
                        this.options.set(value);
                    }
                    this.notifyExcept(source);
                }.bind(this)
            });
        },

        trigger: function (newValue) {
            if (this.value !== newValue) {
                this.value = newValue;
                this.notifyExcept();
            }
        },

        notifyExcept: function (ignoredSubscriber) {
            for (var i in this.subscribers) {
                var subscriber = this.subscribers[i];
                if (subscriber.source === ignoredSubscriber) {
                    continue;
                }
                subscriber.fn(this.value);
            }
        },

        /**
         * Binds current object to another Bindable, so that their values stay in sync.
         *
         * @private
         * @method bind
         * @param {Bindable} other
         *
         */
        bind: function (other) {
            other.addSyncSource(this);
            this.addSyncSource(other);
        }
    });

    function modelAttribute (model, attribute) {
        return new Bindable({
            get: function () { return model.get(attribute); },
            set: function (val) { return model.set(attribute, val); },
            events: eventTargetObservable(model, 'change:' + attribute)
        });
    }

    var bindings = {
        text: function (el) {
            return new Bindable({
                set: el.setText.bind(el)
            });
        },

        value: function (el) {
            return new Bindable({
                get: el.getValue.bind(el),
                set: el.setValue.bind(el),
                events: eventTargetObservable(el, 'focusOut change paste cut input')
            });
        }
    };



    /**
     * The ext.binding object provides the ability to bind models to views declaratively.
     * See the {{#crossLink "ext.binding/bind:method"}}{{/crossLink}} method documentation for more details.
     *
     * @class ext.binding
     * @static
     */
    var binding = {
        /**
         * Establishes a two-way binding between model's attribute and a view element according to the binding type. Binding type defines how the data should be bound to the element. The following types are supported:
         * <ul>
         *   <li><strong>text</strong> - binds data to the inner text of an element.</li>
         *   <li><strong>value</strong> - binds data to the value attribute of an input element.</li>
         * </ul>
         *
         * @method bind
         * @static
         * @param {Model} model
         * @param {String} attribute
         * @param {Element} element
         * @param {String} bindingType
         * @example
         *      binding.bind(model, 'firstName', element.find('.eaMyApp-MyRegion-firstNameInput'), 'text');
         */
        bind: function (model, attribute, element, type) {
            var attributeObservable = modelAttribute(model, attribute);
            var binding = _.isFunction(type) ? type : bindings[type];
            var elementObservable = binding(element);
            attributeObservable.bind(elementObservable);
        },

        Bindable: Bindable,
        modelAttribute: modelAttribute,

        /**
         * Wraps an input element into Bindable. Subscribers are going to be notified on every input modification, while external events will update input element value.
         *
         * @private
         * @method value
         * @static
         */
        value: bindings.value,

        /**
         * Wraps an element text content into Bindable. The bindable of this type doesn't emit any events, but will respond to external events by updating text content.
         *
         * @private
         * @method text
         * @static
         */
        text: bindings.text,


        eventTargetObservable: eventTargetObservable
    };

    return binding;

});
