define([
    'jscore_beta/0.0.1/core',
	"./MySecondAppView",
	"common/widgets/List/List",
	"common/widgets/Button/Button",
	"common/ext/BigNumber/BigNumber",
	"common/ext/Ajax/Ajax"
], function (core, View, List, Button, BigNumber, ajax) {

    return core.App.extend({
	
		View: View,
	
        onStart: function () {
		
			this.list = new List();
			this.list.addItem("item 1");
			this.list.addItem("item 2");
			this.list.attachTo(this.getElement());
			
			this.button = new Button("My Button");
			this.button.on("click", function() {
				alert("clicked the button");
			});
			this.button.attachTo(this.getElement());
			
			var big = new BigNumber("100");
			big.add("50");
			var bigEl = core.Element.parse("<p></p>");
			bigEl.text(big.toString());
			this.getElement().append(bigEl);
			
			ajax("test.json", "GET", "json", function(data) {
				var element = core.Element.parse("<p></p>");
				element.text(JSON.stringify(data));
				this.getElement().append(element);
			}.bind(this));
        }
    });
	
});