define("text", {load: function (e) {
    throw new Error("Dynamic load not allowed: " + e)
}}), define("text!MyApp/MyApp.html", [], function () {
    return'<div class="eaMyApp">\n<button class="ebBtn ebBtn_color_blue ebBtn-coloured">This Button use Brand Assets version 1</button>\n<div class="eaMyApp-icon"></div>\n	<div class="eaMyApp-content"></div>\n</div>'
}), define("styles", {load: function (e) {
    throw new Error("Dynamic load not allowed: " + e)
}}), define("styles!MyApp/MyApp.less", [], function () {
    return".eaMyApp-icon {\n  width: 70px;\n  height: 60px;\n  background: url('MyApp/resources/MyApp/elogo.svg');\n}\n"
}), define("MyApp/MyAppView", ["jscore/core", "text!./MyApp.html", "styles!./MyApp.less"], function (e, n, t) {
    return e.View.extend({getTemplate: function () {
        return n
    }, getStyle: function () {
        return t
    }, content: function () {
        return this.element.find(".eaMyApp-content")
    }})
}), define("MyApp/MyApp", ["jscore/core", "./MyAppView"], function (e, n) {
    return e.App.extend({View: n, onStart: function () {
        this.view.content().text("Hello World")
    }})
});
define('MyApp/650cc03f653e41b50b68d0535b1ce41a', ['MyApp/MyApp'], function (module) {
    return module;
});