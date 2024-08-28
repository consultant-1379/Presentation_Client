define('app/823b8b469f78c83531d452cace57d0e1', [
    'core/Class',
    'core/Application',
    'common/MyWidget'
], function (Class, Application, MyWidget) {

    function MyApplication() {
        Application.apply(this, arguments);
        console.log('MyApplication 012: constructor');
    }

    Class.extends(MyApplication, Application);

    MyApplication.prototype.start = function () {
        Application.prototype.start.apply(this, arguments);
        this.myWidget = new MyWidget;
        this.myWidget.attachTo(this.container);
        this.myWidget.hello('World 012');
    };

    return MyApplication;

});