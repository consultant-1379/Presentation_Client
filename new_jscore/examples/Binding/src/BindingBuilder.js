define(function () {

    /**
     *
     */
    function ModelDestination(model, widget) {
        this.model = model;
        this.widget = widget;
    }

    ModelDestination.prototype.to = function (property) {
        return new ModelBinding(this.model, this.widget, property).init();
    };


    /**
     *
     */
    function ModelBinding(model, widget, property) {
        this.model = model;
        this.widget = widget;
        this.property = property;
    }

    ModelBinding.prototype.init = function () {
        this.widget.on('change', function (value) {
            console.log('Change handler: ' + this.widget.el.id + ' -> Model.' + this.property);
            this.model.set(this.property, value);
        }, this);

        this.model.on('change:' + this.property, function (data, value) {
            if (this.widget.getValue() !== value) {
                console.log('Change handler: Model.' + this.property + ' -> ' + this.widget.el.id);
                this.widget.setValue(value, false);
            }
        }, this);

        this.widget.setValue(this.model.get(this.property), false);

        return this;
    };


    /**
     *
     */
    function RelationalDestination(model, widget) {
        this.model = model;
        this.widget = widget;
    }

    RelationalDestination.prototype.to = function (property) {
        var indexOf = property.indexOf('.');
        var prefix = indexOf < 0 ? property : property.substring(0, indexOf);

        if (this.model.getRelation(prefix)) {
            return new RelationalBinding(this.model, this.widget, property).init();
        } else {
            return Builder.forModel(this.model).bind(this.widget).to(property);
        }
    };


    /**
     *
     */
    function RelationalBinding(model, widget, property) {
        this.model = model;
        this.widget = widget;
        this.property = property;
    }

    RelationalBinding.prototype.init = function () {
        var indexOf = this.property.indexOf('.');
        var prefix = indexOf < 0 ? this.property : this.property.substring(0, indexOf);

        if (this.model.get(prefix)) {
            this.subscribe(indexOf, prefix);
        } else {
            this.model.on('relational:change:' + prefix, function () {
                this.subscribe(indexOf, prefix);
            }, this);
        }

        return this;
    };

    RelationalBinding.prototype.subscribe = function (indexOf, prefix) {
        var subModel;
        if (indexOf < 0) {
            subModel = this.model.get(this.property);
            if (subModel instanceof Backbone.Collection) {
                new CollectionBinding(subModel, this.widget).init();
            }
        } else {
            subModel = this.model.get(prefix);
            var suffix = this.property.substring(indexOf + 1);
            new ModelBinding(subModel, this.widget, suffix).init();
        }
    };


    /**
     *
     */
    function CollectionBinding(collection, widget) {
        this.collection = collection;
        this.widget = widget;
        this.map = {};
    }

    CollectionBinding.prototype.init = function () {
        this.collection.on('add', function (model, collection, options) {
            var widget = this.widget.create(options.at);
            widget.setValue(model);
            this.map[model.cid] = widget;

            var json = model.toJSON();
            json.cid = model.cid;
            console.log(this.widget.el.id + ' add: ' + JSON.stringify(json));
        }, this);

        this.collection.on('remove', function (model, collection, options) {
            this.widget.dispose(this.map[model.cid]);
            delete this.map[model.cid];

            var json = model.toJSON();
            json.cid = model.cid;
            console.log(this.widget.el.id + ' remove: ' + JSON.stringify(json));
        }, this);

        this.collection.on('reset sort', function (collection, options) {
            console.log(options)
        }, this);

        return this;
    };


    /**
     *
     */
    var Builder = {
        forModel: function (model) {
            return {
                model: model,
                bind: function (widget) {
                    return new ModelDestination(this.model, widget);
                }
            }
        },
        forRelational: function (model) {
            return {
                model: model,
                bind: function (widget) {
                    return new RelationalDestination(this.model, widget);
                }
            }
        },
        forCollection: function (collection) {
            return {
                collection: collection,
                bind: function (widget) {
                    return new CollectionBinding(this.collection, widget).init();
                }
            }
        }
    };

    return  Builder;

});