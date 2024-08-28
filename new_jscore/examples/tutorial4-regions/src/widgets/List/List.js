/*require.Config.map['widgets/List'] = {
    "jscore/core": "jscore/0.0.2/core"
}*/
define([
    'jscore/core',
    "./ListView"
], function (core, View) {
    console.log(core.Version, 'List common');

    return core.Widget.extend({

        View: View,

        addItem: function (message) {
            var item = core.Element.parse("<li>" + message + " <span>X</span></li>");

            var remove_link = item.find('span');
            remove_link.on("click", function () {
                item.remove();
            });

            this.element.append(item);
        }

    });
});