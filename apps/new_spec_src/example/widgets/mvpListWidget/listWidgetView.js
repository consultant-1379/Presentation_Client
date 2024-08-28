define([
	"core",
	"facade",
], function(Core, f) {

	return f.mvp.View.extend({
	
		style: "./style.css",
	
		init: function() {
			
		},
		
		render: function(model) {
			if (this.list) // could get rendered before it's actually there
			{
				f.dom.empty(this.list);
				var items = model.get("items");
				for (var i = 0; i < items.length; i++)
				{
					var element = f.dom.createElement("<li>"+items[i]+" <a href='#'>X</a></li>");
					var delete_link = f.dom.find(element, "a");
					f.dom.on(delete_link, "click", (function(index) {
						return function(){
							model.removeItem(index);
						}
					})(i));
					this.list.appendChild(element);
				}
			}
		},
		
		start: function(element) {
			this._super("start", element);
			this.list = this.getElement();
			f.dom.addClass(this.list, "e-listWidget");
		}
	});

});