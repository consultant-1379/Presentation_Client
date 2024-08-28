define([
    'jscore/core',
    './ToDoInputView'
], function (core, View) {
     console.log(core.Version, 'TodoInput');
    return core.Region.extend({

		View: View,

        onStart: function () {

			this.form = this.element.find('form');
            this.input = this.element.find('input');
			this.button = this.element.find('button');

            this.form.on('submit', this.onSubmit, this);
			this.button.on("click", this.onSubmit, this);
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