define(['Titan',
        '../../common/nameList/NameWidget'
],function(Titan, Widget){
    return Titan.Model.extend({
        init:function(app){
            var widget = Titan.create(Widget, this, {attr: this.attributes, model: app.messages});  //
            this.collection.options.container.addWidget(widget);
            console.log(this);
        }
    });
});