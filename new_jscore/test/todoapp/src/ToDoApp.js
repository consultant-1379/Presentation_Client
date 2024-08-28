define([
    'jscore/core',
    'jscore/ext/css/main',
    'regions/ToDoForm/ToDoForm',
    'regions/ToDoList/ToDoList',
    './ToDoAppView'
], function (core, css, Form, List, View) {

    return core.App.extend({

        View: View,

        onStart: function () {

            var form = Form.Create(this.context);
            form.start(this.element);

            var list = List.Create(this.context);
            list.start(this.element);
        }
    });


});