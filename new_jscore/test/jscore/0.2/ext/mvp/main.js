define([
    '../../core',
    '../../ext/utils/base/underscore',
    './base/backbone-1.0.0'
], function (core, _, Backbone) {

    var extend = core.extend;

    /**
     * CreateModel
     * @param attributes
     * @param options
     * @returns {Backbone.Model}
     * @constructor
     */
    function CreateModel(attributes, options) {
        return new Backbone.Model(attributes, options);
    }

    /**
     * CreateCollection
     * @param models
     * @param options
     * @returns {Backbone.Collection}
     * @constructor
     */
    function CreateCollection(models, options) {
        return new Backbone.Collection(models, options);
    }


    var delegateEventSplitter = /^(\S+)\s*(.*|~*)$/;
    // var match = key.match(delegateEventSplitter);


    /**
     * The View is responsible for manipulating the DOM to display the correct visuals. It extends core.View.
     *
     * @class ext.mvp.View
     * @extends core.View
     */
    var View = core.View.extend({
        /**
         * Key value contains the event type with the selector for the DOM element. Value contains the method to call on the presenter object (Widget, Region, App)
         *
         * @property events
         * @type {Object}
         */
        events: {},
        _afterRender: function () {
            this.cid = _.uniqueId('view');
            this.handlers = {};
            this.delegateEvents();
        },
        delegateEvents: function (events) {
            if (!(events || (events = _.result(this, 'events')))) {
                return this;
            }

            this.unDelegateEvents();
            for (var key in events) {
                var parent = this.getParent(),
                    match = key.match(delegateEventSplitter),
                    eventName = match[1],
                    selector = match[2],
                    el;

                if (selector === '') {
                    el = this.element;
                }
                else {
                    el = this.element.find(selector)
                }

                var method = events[key];

                if (!_.isFunction(method)) {
                    method = parent[events[key]];
                }
                if (!method) {
                    continue;
                }

                var eventId = el.on(eventName, method, parent);
                this.handlers[eventId] = el;

            }
        },
        unDelegateEvents: function () {
            if (!_.isEmpty(this.handlers)) {
                _.each(this.handlers, function (element, eventId) {
                    element.off(eventId);
                    delete this.handlers[eventId];
                }.bind(this));
            }
        }
    });

    /**
     * The Model is the client side data store. It may store data originated in the client or no the server and facilitates pushing data changes to the server.
     *
     * @class ext.mvp.Model
     */
    function Model(attributes, options) {

        this._model = CreateModel.apply(this, arguments);
        this._model._model = this;
        this.cid = this._model.cid;
        this._model.url = this.url;
        this.init();
    }

    Model.prototype = {
        /**
         * Client Identity. A page wide unique identifier for the model root.
         *
         * @property cid
         * @type {String}
         */
        /**
         * url of resource, represented by Model
         *
         * @property url
         * @type {String}
         */
        url: '',
        /**
         * Constructor
         *
         * @method init
         */
        init: function () {
        },
        /**
         * Gets the value of the model at the path specified.
         *
         * @method getAttribute
         * @param attribute {String}
         * @returns value {*}
         */
        getAttribute: function (attribute) {
            var model = this._model;

            var response = this._model.get.apply(model, arguments);

            return response;
        },
        /**
         * Add property (one or many) to the model
         *
         * @method setAttributes
         * @param attributes {Object}
         * @param options {Object}
         */
        setAttributes: function (attributes, options) {
            var model = this._model;

            model.set.apply(model, arguments);

        },
        /**
         * Remove property from the model
         *
         * @method removeAttribute
         * @param attribute {String}
         * @param options {Object}

         */
        removeAttribute: function (attribute, options) {

            var model = this._model;
            model.unset.apply(model, arguments);

        },
        /**
         * Updates the model with the current server side resource state.
         *
         * @method fetch
         */
        fetch: function (options) {

            var model = this._model;
            model.fetch.apply(model, arguments);

        },
        /**
         * Pushes the model contents to the server side resource.
         *
         * @method save
         * @param attributes {Object}
         * @param options {Object}
         */
        save: function (attributes, options) {

            var model = this._model;
            model.save.apply(model, arguments);

        },
        /**
         * Subscribe to model events. Supported methods change, add, destroy, error, change:[attribute], remove.
         *
         * @method on
         * @param eventName
         * @param callBack
         * @param context
         */
        on: function (eventName, callBack, context) {

            var model = this._model;
            model.on.apply(model, arguments);

        },
        /**
         * Unsubscribe model event or events
         *
         * @method off
         * @param eventName
         * @param callback
         * @param context
         */
        off: function (eventName, callback, context) {
            var model = this._model;
            model.off.apply(model, arguments);
        }
    }

    /**
     * To create a Model child class call extend providing the class definition.
     *
     * @method extend
     * @param definition {Object}
     * @return model {Model}
     */
    Model.extend = extend;

    /**
     * Used for managing multiple Model instances
     *
     * @class ext.mvp.Collection
     */
    function Collection(models, options) {
        if (_.isArray(models)) {
            models.forEach(function (model, index) {
                var inmodel;
                if (model instanceof Model === false) {
                    inmodel = new this.Model(model);
                }
                else {
                    inmodel = model;
                }
                models[index] = inmodel._model;

            });
        }

        this._collection = CreateCollection(models, options);
        this.init();
    }


    Collection.prototype = {
        /**
         * Constructor
         *
         * @method init
         */
        init: function () {
        },
        Model: Model,

        /**
         * Fetches a model with the same cid from the collection.
         *
         * @method getModel
         * @param id {String}
         * @returns model {Model}
         */
        getModel: function (id) {
            var collection = this._collection;
            var model = collection.get.apply(collection, arguments);

            if (model) {
                return model._model;
            }
        },

        /**
         * Sets the collection to only contain the specified models
         *
         * @method setModels
         * @param models {Model/Array}
         * @param options {Object}
         */
        setModels: function (models, options) {
            var collection = this._collection;

            if (!_.isArray(models)) {
                models = models ? [models] : [];
            }

            models.forEach(function (model, index) {
                models[index] = model._model;

            });
            collection.set(models, options);

        },

        /**
         * Adds a model, or an array of models to the collection.
         *
         * @method addModel
         * @param models {Model/Array}
         * @param options {Object}
         */
        addModel: function (models, options) {
            var collection = this._collection;
            if (!_.isArray(models)) {
                models = models ? [models] : [];
            }

            models.forEach(function (model) {
                collection.add(model._model, options);

            })

        },

        /**
         * Removes a model, or an array of models from the collection.
         *
         * @method removeModels
         * @param models {Model/Array}
         * @param options {Object}
         */
        removeModels: function (models, options) {
            var collection = this._collection;
            if (!_.isArray(models)) {
                models = models ? [models] : [];
            }

            models.forEach(function (model) {
                collection.remove(model._model, options);

            })

        },

        /**
         * Iterates over the collection, passing model instances into the callback.
         *
         * @method each
         * @param fn {Function}
         */
        each: function (fn) {
            var collection = this._collection;

            _.each(collection.models, function (model) {
                fn.call(model._model, model._model);
            });

        },

        /**
         * Subscribe to collection events.
         *
         * @method on
         * @param eventName
         * @param callBack
         * @param context
         */
        on: function (eventName, callBack, context) {

            var collection = this._collection;
            collection.on.apply(model, arguments);

        },
        /**
         * Unsubscribe collection event or events
         *
         * @method off
         * @param eventName
         * @param callback
         * @param context
         */
        off: function (eventName, callback, context) {
            var collection = this._collection;
            collection.off.apply(collection, arguments);
        }


    }

    /**
     * To create a Collection child class call extend providing the class definition.
     *
     * @method extend
     * @param definition {Object}
     * @return collection {Collection}
     */
    Collection.extend = extend;

    return {
        View: View,
        Model: Model,
        Collection: Collection
    };
});