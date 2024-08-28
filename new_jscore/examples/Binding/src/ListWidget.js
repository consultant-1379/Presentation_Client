define(['./Item'], function (Item) {

    return Backbone.View.extend({
        create: function (index) {
            var item = new Item().on('remove', function () {
                item.getValue().destroy();
            }, this);

            var children = this.$el.children();
            if (index < children.length) {
                item.$el.insertBefore(children.get(index));
            } else {
                item.$el.appendTo(this.$el);
            }

            return item;
        },
        dispose: function (item) {
            item.$el.remove();
        }
    });

});