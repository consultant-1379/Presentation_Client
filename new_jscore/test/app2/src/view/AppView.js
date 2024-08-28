define(['jscore/core',
'text!./appView.css',
'text!./appView.html'

],function (core, css, template) {
    return core.View.extend({
       getTemplate:function(){
           return template;
       },
        getStyle:function(){
            return css;
        }
    });

});