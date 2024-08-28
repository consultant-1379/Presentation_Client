define([
    'jscore/core',
    'jscore/ext/mvp',
    'jscore/ext/binding',
    "./MyRegion2View",
], function (core, mvp, binding, View) {

    // Single model + custom binding
    return core.Region.extend({

        View: View,

        onStart: function () {
            var model = this.model = new mvp.Model;
            model.set('firstName', 'Peter');
            model.set('lastName', 'Parker');

            var element = this.view.getElement();

            var changeBinding = function (el) {
                return new binding.Bindable({
                    get: el.getValue.bind(el),
                    set: el.setValue.bind(el),
                    events: binding.eventTargetObservable(el, 'change')
                });
            }

            binding.bind(model, 'firstName', element.find('.eaMyApp-MyRegion2-firstNameInput'), changeBinding);
            binding.bind(model, 'lastName', element.find('.eaMyApp-MyRegion2-lastNameInput'), changeBinding);
            binding.bind(model, 'firstName', element.find('.eaMyApp-MyRegion2-firstName'), 'text');
            binding.bind(model, 'lastName', element.find('.eaMyApp-MyRegion2-lastName'), 'text');
        }

    });

});
