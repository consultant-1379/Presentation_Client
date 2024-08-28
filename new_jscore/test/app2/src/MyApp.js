define([
    'jscore/core',
    'jscore/ext/locationController/main',
    './regions/form/Form',
    './regions/list/List',
    './view/appView'
], function (core, router, Form, List, View) {

    return core.App.extend({
        View: View,
        onStart: function () {
            router.addLocationListener(function (hash) {
                if (hash === 'hello') {
                    alert('hello');
                }
            }, this);

            router.addLocationListener(function (hash) {
                if (hash === 'test') {
                    alert('test');
                }
            }, this);
            router.addLocationListener(function (hash) {
                if(hash!==undefined){
                    alert(hash);
                }

            }, this);

            this.context.eventBus.subscribe('serUrl', function (value) {

                router.setLocation(value);

            }, this);

            var todoListElement = this.element.find('.toDoListForm');
            var todoListItems = this.element.find('.toDoListItems');


            var form = Form.Create(this.context);

            form.start(todoListElement);


            var list = List.Create(this.context);
            list.start(todoListItems);

            router.start();


        },

        onStop: function () {
            this.element.remove();
        }

    });


});