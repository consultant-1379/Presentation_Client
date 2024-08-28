define([
    'jscore/core',
    'jscore/ext/mvp',
    'jscore/ext/binding',
    "./MyRegionView",
], function (core, mvp, binding, View) {

    // API 1 - single model
    return core.Region.extend({

        View: View,

        onStart: function () {
            var model = this.model = new mvp.Model;
            model.set('firstName', 'Peter');
            model.set('lastName', 'Parker');

            var element = this.view.getElement();

            binding.bind(model, 'firstName',element.find('.eaMyApp-MyRegion-firstNameInput'), 'value');
            binding.bind(model, 'lastName',element.find('.eaMyApp-MyRegion-lastNameInput'), 'value');
            binding.bind(model, 'firstName',element.find('.eaMyApp-MyRegion-firstName'), 'text');
            binding.bind(model, 'lastName',element.find('.eaMyApp-MyRegion-lastName'), 'text');
        }

    });

});
