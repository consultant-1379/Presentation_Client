define('app/6f0f160d1070354782f27a4314e917fb', [
    'core/Class',
    'core/Application',
    'common/MyWidget'
], function (Class, Application, MyWidget) {

    function MyApplication() {
        Application.apply(this, arguments);
        console.log('MyApplication 011: constructor');
    }

    Class.extends(MyApplication, Application);

    MyApplication.prototype.start = function () {
        Application.prototype.start.apply(this, arguments);
        this.myWidget = new MyWidget;
        this.myWidget.attachTo(this.container);
        this.myWidget.hello('World 011');
    };

    return MyApplication;

});