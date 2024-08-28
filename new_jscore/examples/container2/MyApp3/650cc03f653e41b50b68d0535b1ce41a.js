define("text", {load: function (e) {
    throw new Error("Dynamic load not allowed: " + e)
}}), define("text!MyApp3/MyApp3.html", [], function () {
    return'<div class="eaMyApp3">\n<button class="ebBtn ebBtn_color_blue ebBtn-coloured">This Button use Brand Assets version 1</button>\n<div class="eaMyApp3-icon"></div>\n	<div class="eaMyApp3-content"></div>\n</div>'
}), define("styles", {load: function (e) {
    throw new Error("Dynamic load not allowed: " + e)
}}), define("styles!MyApp3/MyApp3.less", [], function () {
    return".eaMyApp3-icon {\n  width: 70px;\n  height: 60px;\n  background: url('MyApp3/resources/MyApp3/elogo.svg');\n}\n"
}), define("MyApp3/MyApp3View", ["jscore/core", "text!./MyApp3.html", "styles!./MyApp3.less"], function (e, n, t) {
    return e.View.extend({getTemplate: function () {
        return n
    }, getStyle: function () {
        return t
    }, content: function () {
        return this.element.find(".eaMyApp3-content")
    }})
}), define("MyApp3/MyApp3", ["jscore/core", "./MyApp3View"], function (e, n) {
    return e.App.extend({View: n, onStart: function () {
        this.view.content().text("Hello World App3")
    }})
});
define('MyApp3/650cc03f653e41b50b68d0535b1ce41a', ['MyApp3/MyApp3'], function (module) {
    return module;
});