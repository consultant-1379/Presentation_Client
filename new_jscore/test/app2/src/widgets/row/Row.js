define(['jscore/core',
        'jscore/ext/css/main',
        'text!./row.html',
        'text!./row.css'],
    function (core, css, template, styles) {

        return core.Widget.extend({

            init: function (text) {
                css.addStyle(styles, this);

                var element = this.getElement();

                var field = element.find('span');
                var remove = element.find('a');

                field.text(text);
                remove.on('click', this.onClick.bind(this));
            },

            onClick: function (e) {
                this.destroy();
                e.preventDefault();
            },

            createElement: function () {
                return core.Element.parse(template);
            }
        });
    });