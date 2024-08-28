define([
    './TextBox',
    './BindingBuilder'
], function (TextBox, BindingBuilder) {

    return Backbone.View.extend({
        template: _.template('<div><input type="text" size="32"/><button>X</button></div>'),
        events: {
            'click button': 'onRemove'
        },
        initialize: function () {
            this.setElement(this.template());
            this.textBox = new TextBox({el: this.$('input[type=text]')});
        },
        onRemove: function () {
            this.trigger('remove');
        },
        setValue: function (value) {
            BindingBuilder.forModel(value).bind(this.textBox).to('text');
            this.value = value;
        },
        getValue: function () {
            return this.value;
        }
    });

});