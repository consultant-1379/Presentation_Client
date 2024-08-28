define("text", {load: function (e) {
    throw new Error("Dynamic load not allowed: " + e)
}}), define("text!MyApp2/MyApp.html", [], function () {
    return'<div class="eaMyApp2">\n<button class="ebBtn ebBtn_color_blue ebBtn-coloured">This Button use Brand Assets version 2</button>\n	<div class="eaMyApp2-icon"></div>\n	<div class="eaMyApp2-content"></div>\n</div>'
}), define("styles", {load: function (e) {
    throw new Error("Dynamic load not allowed: " + e)
}}), define("styles!MyApp2/MyApp.less", [], function () {
    return".eaMyApp2{overflow:hidden;\n}\n.eaMyApp2-icon {\n  width: 70px;\n  height: 60px;\n background: url('MyApp2/resources/MyApp/elogo.svg') #ffffff;\n}\n"
}), define("MyApp2/MyAppView", ["jscore/core", "text!./MyApp.html", "styles!./MyApp.less"], function (e, n, t) {
    return e.View.extend({getTemplate: function () {
        return n
    }, getStyle: function () {
        return t
    }, content: function () {
        return this.element.find(".eaMyApp2-content")
    }})
}), define("MyApp2/MyApp", ["jscore/core", "./MyAppView"], function (e, n) {
    return e.App.extend({View: n, onStart: function () {
        this.view.content().text("Hello App2")
    }})
});
define('MyApp2/650cc03f653e41b50b68d0535b1ce41a', ['MyApp2/MyApp'], function (module) {
    return module;
});