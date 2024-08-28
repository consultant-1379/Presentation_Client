define('app/8a56e716f15dfd571b72c5019ed51137', [
    'core/Class',
    'core/Application',
    'common/MyWidget'
], function (Class, Application, MyWidget) {

    function MyApplication() {
        Application.apply(this, arguments);
        console.log('MyApplication 013: constructor');
    }

    Class.extends(MyApplication, Application);

    MyApplication.prototype.start = function () {
        Application.prototype.start.apply(this, arguments);
        this.myWidget = new MyWidget;
        this.myWidget.attachTo(this.container);
        this.myWidget.hello('World 013');
    };

    return MyApplication;

});