define(function () {

    return Backbone.View.extend({
        events: {
            'change': 'onChangeValue'
        },
        initialize: function () {
            if (!this.$el.attr('id')) {
                this.$el.attr('id', this.cid + 'TextBox');
            }
        },
        onChangeValue: function () {
            this.trigger('change', this.$el.val());
        },
        setValue: function (value, fireEvent) {
            console.log(this.el.id + ': ' + value);
            if (this.$el.val() !== value) {
                this.$el.val(value);
                if (fireEvent !== false) {
                    this.onChangeValue();
                }
            }
        },
        getValue: function () {
            return  this.$el.val();
        }
    });

});