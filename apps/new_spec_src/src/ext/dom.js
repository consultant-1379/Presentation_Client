/**
 * Contains methods for helping with DOM manipulations
 *
 * @module ext
 * @class dom
 * @constructor
 *
 */
	var dom = (function () {
	
		/**
		 * Returns a single or list of DOM objects based on the selector passed. If no element is found, undefined is returned.
		 *
		 * @method getElement
		 * @param selector {String}
		 */
		var getElement = function(selector) {
			var elements = $(selector).toArray();
			if (elements.length == 1)
				return elements[0];
			else if (elements.length == 0)
				return undefined;
			else
				return elements;
		};
		
		/**
		 * Creates DOM elements based on the string passed. If the text contains multiple DOM elements, an array of elements is returned instead.
		 *
		 * @method createElement
		 * @param domText {String}
		 */
		var createElement = function(text) {
			var elements = $(text).toArray();
			if (elements.length > 1) {
				return elements;
			} else {
				return elements[0];
			}
		};
		
		/**
		 * Clears all of the children inside the passed element
		 *
		 * @method empty
		 * @param element {HTMLElement}
		 */
		var empty = function(element) {
			$(element).empty();
		};
		
		/**
		 * Looks inside the passed element for elements that meet the passed selector. If 0 elements are found, undefined is returned.
		 * If 1 element is found, that is returned by itself. If more than 1 element is found, an array is returned.
		 *
		 * @method find
		 * @param element {HTMLElement}
		 * @param selector {String}
		 */
		var find = function(element, selector) {
			var elements = $(element).find(selector).toArray();
			if (elements.length == 1)
				return elements[0];
			else if (elements.length == 0)
				return undefined;
			else
				return elements;
		};
		
		/**
		 * Applies an event handler to the element. When the event occurs, the callback is executed.
		 *
		 * @method on
		 * @param element {HTMLElement}
		 * @param event {String}
		 * @param callback {Function}
		 */
		var on = function(element, event, callback) {
			$(element).on(event, callback);
		};
		
		/**
		 * Removes the DOM element
		 *
		 * @method remove
		 * @param element {HTMLElement}
		 */
		 var remove = function(element) {
			$(element).remove();
		 };
		 
		 /**
		 * Modifies the internal text content of a HTMLElement
		 *
		 * @method setText
		 * @param element {HTMLElement}
		 * @param text {String}
		 */
		 var setText = function(element, text) {
			$(element).text(text);
		 };
		 
		/**
		 * Modifies the internal HTML content of a HTMLElement
		 *
		 * @method setHtml
		 * @param element {HTMLElement}
		 * @param html {String}
		 */
		var setHtml = function(element, html) {
			$(element).html(html);
		 };
		 
		/**
		 * Adds the template to the DOM
		 *
		 * @method renderTemplate
		 * @param element {HTMLElement}
		 * @param template {String}
		 */
		var renderTemplate = function(element, template) {
			if (element) {
				/*var $templateElements = $(template);
				for (var i = 0; i < $templateElements.length; i++) {
					element.appendChild($templateElements[i]);
				}*/
				element.innerHTML = template;
			} else {
				console.error("No element specified for putting object in. Did you fetch the wrong element?");
			}
		};
		
		/**
		 * Adds a class to the class attribute of a DOM element
		 *
		 * @method addClass
		 * @param element {HTMLElement}
		 * @param classes {String}
		 */
		var addClass = function(element, classes){
			$(element).addClass(classes);
		};
		
		/**
		 * Remove a class from the class attribute of a DOM element
		 *
		 * @method removeClass
		 * @param element {HTMLElement}
		 * @param classes {String}
		 */
		var removeClass = function(element, classes) {
			$(element).removeClass(classes);
		};
		
		return {
			getElement: getElement,
			createElement: createElement,
			empty: empty,
			find: find,
			on: on,
			remove: remove,
			setText: setText,
			setHtml: setHtml,
			renderTemplate: renderTemplate,
			addClass: addClass,
			removeClass: removeClass
		}
	
	})();
	
	JSCore.ext.dom = dom;