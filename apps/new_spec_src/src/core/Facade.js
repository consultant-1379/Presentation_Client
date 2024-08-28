/**
 * The Facade class provides a sandbox of functionality for application, regions, and widgets to use. The facade wraps
 * all internal functionality so that the developer doesn't have to understand the internal structure and how it works.
 * While internal components can be accessed directly, only the facade can be relied on to not change. In future versions
 * of the framework, only new functionality will be added to the facade, while the internal classes may change significantly.
 *
 * @module core
 * @class Facade
 * @constructor
 *
 */
 
	var Facade = F = {};
	
	/**
     * Register an extension with the Facade so that its methods are available through the Facade class. 
     *
     * @method registerExtension
     * @param extension {Facade.Extension}
     */
	Facade.registerExtension = function(extension) {
		if (extension.prototype instanceof Facade.Extension) 
		{
			for (var prop in extension.prototype) {
				if (this.ext == undefined)
					this.ext = {};
				this.ext[prop] = extension.prototype[prop];
			}
		}
		else
		{
			console.error("An attempt has been made to load an object that doesn't extend FacadeExtension. Skipping.");
		}
	},
	
	/**
     * Registers an array of extensions with the Facade so that theirs methods are available through the Facade class. 
     *
     * @method registerExtensions
     * @param extension {Array<Facade.Extension>}
     */
	Facade.registerExtensions = function(extensionArray) {
		for (var i = 0; i < extensionArray.length; i++) {
			this.registerExtension(extensionArray[i]);
		}
	},
	
	/**
     * Extends a function prototype with the properties passed in.
     *
     * @method extend
     * @param obj {Function}
	 * @param extObj {Object}
     */
	 Facade.extend = function(obj, extObj) {
		return klass.extend(obj, extObj);
	 },
	
	/**
     * If there's a template and style associated with the passed object, those are initialised and added to the DOM.
	 * If there's an element specified, the getElement and setElement functions for that object will return that element.
     *
     * @method startObject
     * @param instance {Object/Function}
	 * @param element {HTMLElement}
     */
	Facade.startObject = function(instance, element){
		if (element) {
			instance.setElement(element);
		}
		if (instance.style) {
			this.renderStyle(instance.style);
		}
		
		if (instance.template) {
			this.renderTemplate(element, instance.template);
		}
		
	},
	
	/**
     * Adds the template to the DOM
     *
     * @method renderTemplate
     * @param element {HTMLElement}
	 * @param template {String}
     */
	Facade.renderTemplate = function(element, template) {
		if (JSCore.ext.utils.isFilePath(template)) {
			JSCore.ext.utils.ajax(template, function(data) {
				template = data;
			}, false);
		} 
		JSCore.ext.dom.renderTemplate(element, template);
	},
	
	/**
     * Adds CSS text to the DOM
     *
     * @method renderStyle
     * @param style {String}
     */
	Facade.renderStyle = function(style) {
		if (JSCore.ext.utils.isFilePath(style)) {
			JSCore.ext.utils.ajax(style, function(data) {
				style = data;
			}, false);
		} 
		this.css.load(style);
	},
	
	/**
     * Allows a component to subscribe to a particular topic on the EventBus, passing a function to be executed when
     * that topic occurs on the EventBus
     *
     * @method subscribe
     * @param topic {String} The topic to subscribe to
	 * @param fn {Function} Callback
     */
	Facade.subscribe = function(topic, fn) {
		EventBus.subscribe(topic, fn);
	}
	
	/**
     * Sends an event with a message to the EventBus which will subsequently send that message to subscribers.
     *
     * @method publish
     * @param topic {String} The topic to send on the bus
	 * @param optionalArguments {*} Additional arguments can be sent which will be passed into the callback
     */
	Facade.publish = function(topic) {
		var args = Array.prototype.slice.call( arguments, 1 );
		EventBus.publish(topic, arguments);
	},
	
	/**
	 * Facade.Extension can be extended and loaded through Facade.registerExtension in order to provide the Facade with additional
	 * functionality. While we try to ensure that the Facade contains all of the functionality that's necessary, there might be
	 * some cases where there's some common functionality that's required but isn't there. In which case, the Facade.Extension 
	 * class can be used.
	 *
	 * @module core
	 * @class Facade.Extension
	 * @constructor
	 *
	 */
	Facade.Extension = function() {}
	
	/**
	 * Allows the class to be extend for more complex functionality
	 *
	 * @method extend
	 */
	Facade.Extension.extend = function(object) {
		return Facade.extend(this, object); 
	};
	
	Facade.utils = function(){};
	
	/**
	 * Contains methods for helping with DOM manipulations
	 *
	 * @module core
	 * @class Facade.dom
	 */
	Facade.dom = {};
		/**
		 * Returns a single or list of DOM objects based on the selector passed. If no element is found, undefined is returned.
		 *
		 * @method getElement
		 * @param selector {String}
		 */
		Facade.dom.getElement = JSCore.ext.dom.getElement;
		/**
		 * Creates DOM elements based on the string passed. If the text contains multiple DOM elements, an array of elements is returned instead.
		 *
		 * @method createElement
		 * @param domText {String}
		 */
	Facade.dom.createElement = JSCore.ext.dom.createElement;
		/**
		 * Clears all of the children inside the passed element
		 *
		 * @method empty
		 * @param element {HTMLElement}
		 */
	Facade.dom.empty = JSCore.ext.dom.empty;
		/**
		 * Looks inside the passed element for elements that meet the passed selector. If 0 elements are found, undefined is returned.
		 * If 1 element is found, that is returned by itself. If more than 1 element is found, an array is returned.
		 *
		 * @method find
		 * @param element {HTMLElement}
		 * @param selector {String}
		 */
	Facade.dom.find = JSCore.ext.dom.find;
		/**
		 * Applies an event handler to the element. When the event occurs, the callback is executed.
		 *
		 * @method on
		 * @param element {HTMLElement}
		 * @param event {String}
		 * @param callback {Function}
		 */
	Facade.dom.on = JSCore.ext.dom.on;
	
		/**
		 * Removes the DOM element
		 *
		 * @method remove
		 * @param element {HTMLElement}
		 */
	Facade.dom.remove = JSCore.ext.dom.remove;
	
		/**
		 * Modifies the internal text content of a HTMLElement
		 *
		 * @method setText
		 * @param element {HTMLElement}
		 * @param text {String}
		 */
	Facade.dom.setText = JSCore.ext.dom.setText;
		/**
		 * Modifies the internal HTML content of a HTMLElement
		 *
		 * @method setHtml
		 * @param element {HTMLElement}
		 * @param html {String}
		 */
	Facade.dom.setHtml = JSCore.ext.dom.setHtml;
	
	/**
		 * Adds a class to the class attribute of a DOM element
		 *
		 * @method addClass
		 * @param element {HTMLElement}
		 * @param classes {String}
		 */
	Facade.dom.addClass = JSCore.ext.dom.addClass;
	/**
		 * Remove a class from the class attribute of a DOM element
		 *
		 * @method removeClass
		 * @param element {HTMLElement}
		 * @param classes {String}
		 */
	Facade.dom.removeClass = JSCore.ext.dom.removeClass;
	
	/**
	 * Contains methods for helping with CSS manipulations
	 *
	 * @module core
	 * @class Facade.css
	 * @constructor
	 *
	 */
	Facade.css = {};
		/**
		 * Creates a style attribute and appends it to the head, using the text that's passed into the function.
		 *
		 * @method load
		 * @param cssText {String}
		 */
	Facade.css.load = JSCore.ext.css.load;
	
	Facade.mvp = function(){};
	
	/**
	 * The Model (part of the MVP pattern) represents the data. The model should contain a definition of the data, and should contain helper functions
	 * for when a user wants to work with that data.
	 *
	 * @module core
	 * @class Facade.mvp.Model
	 * @constructor
	 *
	 */
	 /**
	 * Automatically called when the "new" operator is used. Model should initialise arrays and other default data properties here.
	 *
	 * @method init
	 */
	 /**
	 * Allows the class to be extend for more complex functionality
	 *
	 * @method extend
	 * @param object {Object} Class definition
	 */
	Facade.mvp.Model = JSCore.ext.mvp.Model;
	
	/**
	 * The View (part of the MVP pattern) represents the DOM elements. The View should be very minimal, and should ideally only refer to a HTML template
	 * and CSS stylesheets.
	 *
	 * @module core
	 * @class Facade.mvp.View
	 * @constructor
	 *
	 */
	 /**
* If not null, template DOM is initialised and loaded into the DOM that's holding the View.
* 
* @property template
* @type {String}
* @default null
*/

/**
* If not null, style is initialised and loaded.
* 
* @property style
* @type {String}
* @default null
*/

/**
 * Automatically called when the "new" operator is used.
 *
 * @method init
 */
 /**
 * Returns the element that's holding the DOM for the View. 
 *
 * @method getElement
 */
 /**
 * Overwritten by the developer. Whenever the model changes, this method should be called. Any DOM manipulation should be done here only, using
 * the model as a basis for rendering.
 *
 * @method render
 * @param model {Model}
 */
 
 /**
 * Set reference to the element that's holding the DOM for the View. 
 *
 * @method setElement
 * @param element {HTMLElement}
 */
 /**
	 * Allows the class to be extend for more complex functionality
	 *
	 * @method extend
	 * @param object {Object} Class definition
	 */
	Facade.mvp.View = JSCore.ext.mvp.View;
	
	
	
	JSCore.Facade = Facade;

