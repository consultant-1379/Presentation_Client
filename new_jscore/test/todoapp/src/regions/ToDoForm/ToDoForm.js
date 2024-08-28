define([
    'jscore/core',
    'jscore/ext/css/main',
    './ToDoFormView'
], function (core, css, View) {

    return core.Region.extend({
	
		View: View,
	
        onStart: function (parent) {

            this.form = this.element.find('form');
            this.input = this.element.find('input');

            this.form.on('submit', this.onSubmit.bind(this));
        },

        onSubmit: function (e) {
			e.preventDefault();
            var value = this.input.val();
            if (value.trim() !== '') {
                this.context.eventBus.publish('addItem', value);
                this.input.val('');
            } else {
                alert('Please enter a note!');
            }
            
        }

    });
});