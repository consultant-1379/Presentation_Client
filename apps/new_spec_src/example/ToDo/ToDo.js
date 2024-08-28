define([
	"core", 
	"../regions/FormRegion/FormRegion",
	"../regions/ListRegion/ListRegion",
], function(Core, FormRegion, ListRegion) { 

	return Core.App.extend({
	
		template: "./template.html",
		style: "./style.css",
	
		init: function() {
			this.formRegion = new FormRegion(); 
			this.listRegion = new ListRegion();
		},
		
		start: function(element)
		{
			this._super("start", element);
			var formElem = document.getElementById("form");
			this.formRegion.start(formElem);
			
			var listElem = document.getElementById("list");
			this.listRegion.start(listElem);
		}
	});

});