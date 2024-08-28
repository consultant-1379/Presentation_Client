define('core/Widget', [], function () {

    function Widget() {
        console.log('core 002: Widget constructor');
        this.el = document.createElement('div');
    }

    Widget.prototype = {
        attachTo: function (parent) {
            console.log('core 002: Widget attachTo');
            parent.innerHTML = '';
            parent.appendChild(this.el);
        }
    };

    return Widget;

});