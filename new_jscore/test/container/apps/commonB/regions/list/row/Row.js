define(['jscore/core',
    'jscore/ext/dom/main',
    'jscore/ext/css/main',
    'text!./row.html',
    'text!./row.css'],
    function (core, dom, css, template, styles) {

        return core.Widget.extend({

            constructor: function (parent, text) {
                css.addStyle(styles, this);

                var el = this.el = dom.parse(template);
                var field = dom.find('span', this.el);
                var remove = dom.find('a', this.el);

                dom.text(field, text);
                dom.on('click', remove, function (e) {
                    dom.remove(el);
                });
                dom.append(parent, el);
            }
        });
    });