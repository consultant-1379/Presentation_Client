/**
 * compatible with
 * - core-001
 * - core-002
 */
define('common/MyWidget', [
    'core/Class',
    'core/Widget'
], function (Class, Widget) {

    function MyWidget() {
        Widget.apply(this, arguments);
        console.log('MyWidget 021: constructor');
    }

    Class.extends(MyWidget, Widget);

    MyWidget.prototype.hello = function (text) {
        this.el.innerText = 'Hello ' + text;
//        this.el.innerHTML = '<button>' + text + '</button>';
    };

    return MyWidget;

});