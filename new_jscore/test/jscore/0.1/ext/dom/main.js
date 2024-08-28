define([
    '../../base/jquery',
    '../../ext/utils/base/underscore'
], function ($, _) {


    function _parse() {
        return $.parseHTML.apply(this, arguments)[0];
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
         * Finds a child element and returns it.
         *
         * @method find
         * @param selector {String}
         * @return element {Element}
         */
        find: function (selector) {
            return dom.find(selector, this);
        },

        /**
         * If value isn't specified, the value of the element is returned. If the value is specified, then the value is set.
         *
         * @method val
         * @param value {*}
         * @return value {String}
         */
        val: function (value) {
            return dom.val(this, value);
        },

        /**
         * Appends child element to this element.
         *
         * @method append
         * @param child {Element}
         */
        append: function (child) {
            dom.append(this, child);
        },

        /**
         * Removes this element from the DOM.
         *
         * @method remove
         */
        remove: function () {
            dom.remove(this);
        },
        /**
         *
         * @method children
         */
        children: function () {
            dom.children(this);
        },

        /**
         * Sets up a DOM event handler for the element
         *
         * @method on
         * @param event {String}
         * @param fn {Function}
         * @param context {Object}
         * @return eventID {String}
         */
        on: function (event, fn, context) {
            return dom.on(event, this, fn, context);
        },
        /**
         * Sets up a DOM event handler for the element
         *
         * @method off
         * @param eventID {String}

         */
        off: function (eventID) {
            dom.off(eventID, this);
        },

        /**
         * Sets the inner text of the element
         *
         * @method text
         * @param value {String}
         */
        text: function (value) {
            dom.text(this, value);
        },

        /**
         * Gets the native HTMLElement
         *
         * @method _getHTMLElement
         * @return element {HTMLElement}
         */
        _getHTMLElement: function () {
            return this.element;
        },

        /**
         * Sets the native HTMLElement
         *
         * @method _setHTMLElement
         * @param el {HTMLElement}
         */
        _setHTMLElement: function (el) {
            this.element = el;
        }
    };

    /**
     * Parses a HTML String and creates an Element from it.
     *
     * @method parse
     * @static
     * @param html {String}
     * @return element {Element}
     */
    Element.parse = function (html) {
        var element = new Element();
        element._setHTMLElement(_parse(html));

        return element;
    };

    /**
     * Wraps a native element and creates an Element
     *
     * @method wrap
     * @static
     * @param el {HTMLElement}
     * @return element {Element}
     */
    Element.wrap = function (el) {
        var element = new Element();
        element._setHTMLElement(el);

        return element;
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
         * Finds a child element in the passed element and returns it.
         *
         * @method find
         * @param selector {String}
         * @param element {HTMLElement}
         * @return element {Element}
         */
        find: function (selector, element) {
            var $el, result;

            if (element) {
                $el = $($.find(selector, element._getHTMLElement()));
            }
            else {
                $el = $($.find(selector));
            }

            result = $el.data('element');

            if (!result) {
                result = Element.wrap($el[0]);
                $el.data('element', result);
            }

            return  result;
        },

        /**
         * If value isn't specified, the value of the element is returned. If the value is specified, then the value is set.
         *
         * @method val
         * @param element {Element}
         * @param value {*}
         * @return value {String}
         */
        val: function (element, value) {
            if (value !== undefined) {
                return $(element._getHTMLElement()).val(value);
            }
            else {
                return $(element._getHTMLElement()).val();
            }
        },

        /**
         * Appends child element to the target element.
         *
         * @method append
         * @param target {Element}
         * @param element {Element}
         */
        append: function (target, element) {
            $(target._getHTMLElement()).append(element._getHTMLElement());
        },

        /**
         * Removes the element from the DOM.
         *
         * @method remove
         * @param element {Element}
         */
        remove: function (element) {
            $(element._getHTMLElement()).remove();
        },
        /**
         *
         * @method children
         */
        children: function (element) {
            var $el = $(element._getHTMLElement()).children();
            var result = Element.wrap($el[0]);

            $el.data('element', result);
            return result;
        },
        /**
         * Sets the inner text of the element
         *
         * @method text
         * @param element {Element}
         * @param text {String}
         */
        text: function (element, text) {
            $(element._getHTMLElement()).text(text);
        },

        /**
         * Sets up a DOM event handler for the element
         *
         * @method on
         * @param event {String}
         * @param element {Element}
         * @param fn {Function}
         * @param context {Object}
         * @return eventID {String}
         */
        on: function (event, element, fn, context) {
            if (!context) {
                context = this;
            }
            var eventId = _.uniqueId('event');
            event += '.delegateEvents' + eventId;

            var callback = function (e) {
                function preventDefault() {
                    e.preventDefault();
                }
                var wrappedEvent = {
                    preventDefault: preventDefault
                }
                fn.call(context, wrappedEvent);
            }
            $(element._getHTMLElement()).on(event, callback);

            return eventId;
        },
        /**
         * Sets up a DOM event handler for the element
         *
         * @method off
         * @param eventId {String}
         * @param element {Element}

         */
        off: function (eventId, element) {

            $(element._getHTMLElement()).off('.delegateEvents' + eventId);
        }
    };


    return  dom;

});