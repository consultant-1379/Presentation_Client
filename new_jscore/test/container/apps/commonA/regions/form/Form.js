define([
    'jscore/core',
    'jscore/ext/dom/main',
    'jscore/ext/css/main',
    'text!./form.html',
    'text!./form.css'
], function (core, dom, css, template, styles) {

    return function (context) {
        return core.Region.extend({
            constructor: function () {
                css.addStyle(styles, this);

                this.el = dom.parse(template);

                var form = dom.find('form', this.el);
                var input = dom.find('input', this.el);

                form.on('submit', function (e) {
                    if (input.value.trim() !== '') {
                        context.eventBus.publish('submit', input.value);
                        input.value='';
                    }else{
                        alert('Please enter the Note!');
                    }
                    e.preventDefault();
                })
            }
        });
    }
});