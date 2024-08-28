define([
    'jscore/core',
    'jscore/ext/mvp',
    'jscore/ext/binding',
    "./MyRegion4View",
], function (core, mvp, binding, View) {

    // API 1 - single model
    // API 2 - single model
    // API 1 - multiple models + custom binding
    // API 2 - two models + custom binding

    return core.Region.extend({

        View: View,

        onStart: function () {
            var model = this.model = new mvp.Model;
            model.set('firstName', 'Peter');
            model.set('lastName', 'Parker');


            var model2 = this.model2 = new mvp.Model;
            model2.set('firstName', 'Arya');
            model2.set('lastName', 'Stark');

            var element = this.view.getElement();

            // API 2 (internal)

            var bindCustom = function (el) {
                return new binding.Bindable({
                    get: el.getValue.bind(el),
                    set: el.setValue.bind(el),
                    events: binding.eventTargetObservable(el, 'change')
                });
            }

            var firstNameBindable = binding.modelAttribute(model, 'firstName');
            firstNameBindable.bind(bindCustom(element.find('.eaMyApp-MyRegion4-firstNameInput')));
            firstNameBindable.bind(binding.text(element.find('.eaMyApp-MyRegion4-firstName')));

            var lastNameBindable = binding.modelAttribute(model2, 'lastName');
            lastNameBindable.bind(binding.value(element.find('.eaMyApp-MyRegion4-lastNameInput')));
            lastNameBindable.bind(binding.text(element.find('.eaMyApp-MyRegion4-lastName')));
        }

    });

});
