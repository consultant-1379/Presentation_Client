define(['./interfaces'], function (interfaces) {


    /**
     * AppContext
     */
    var AppContext = interfaces.AppContext;


    /**
     * App
     */
    var App = interfaces.App.extend({
        getContext: function () {
            var appContext = new AppContext();
            appContext.eventBus = new EventBus();
            return appContext;
        }
    });


    /**
     * EventBus
     */
    function EventBus() {
        this.topics = {};
    }

    EventBus.prototype = {
        publish: function (topic, value) {

            if (!this.topics[topic]) {
                return false;
            }

            for (var i = 0, l = this.topics[topic].length; i < l; i++) {
                var subscription = this.topics[topic][i];
                subscription.callback.call(subscription.context, value);
            }
            return this;
        },
        subscribe: function (topic, fn) {

            if (!this.topics[topic]) {
                this.topics[topic] = [];
            }

            this.topics[topic].push({ context: this, callback: fn });

            return this;
        }
    };


    /**
     * Region
     */
    var Region = interfaces.UIComponent;

    /**
     * Widget
     */
    function Widget() {

    }

    Widget.extend = interfaces.extend;

    return {
        App: App,
        AppContext: AppContext,
        EventBus: EventBus,
        Region: Region,
        Widget: Widget
    }
});
