define([
    'jscore/core',
    "./ToDoAppView",
    "regions/ToDoInput/ToDoInput",
    "../regions/ToDoList/ToDoList"
], function (core, View, InputRegion, ListRegion) {
    console.log(core.Version, 'TodoApp1');
    return core.App.extend({

        View: View,

        onStart: function () {

            this.content = this.element.find(".content");
            var input = InputRegion.Create(this.context);
            input.start(this.content);


            var list = ListRegion.Create(this.context);
            list.start(this.content);

        }
    });

});