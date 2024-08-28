define([
    'jscore_beta/0.0.1/core',
    './ToDoInputView'
], function (core, View) {

    return core.Region.extend({
	
		View: View,
	
        onStart: function (parent) {

			this.form = this.element.findFirst('form');
            this.input = this.element.findFirst('input');
			this.button = this.element.findFirst('button'); 
			
            this.form.on('submit', this.onSubmit.bind(this));
			this.button.on("click", this.onSubmit.bind(this));
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