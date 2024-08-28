define(['Titan',
    'template!./topBar.html',
    'styles!./topBar.less'],
    function (Titan, template, styles) {
    return Titan.View.extend({
        template: template,
        styles: styles

    });

});