module.exports = {

	printClasses: function(classes, projectRoot) {
		/*var modules = {};
		for (var i = 0; i < classes.length; i++) {
			if (modules[classes[i].module] == undefined) {
				modules[classes[i].module] = [];
			}
			
			modules[classes[i].module].push(classes[i].name);
		}
		
		var outputString = "";
		
		var moduleKeys = [];
		for (module in modules) {
			moduleKeys.push(module);
		}
		moduleKeys.sort();
		
		for (var j = 0; j < moduleKeys.length; j++)
		{
			var module = moduleKeys[j];
			outputString += "<li><a href='"+projectRoot+"modules/"+module+".html'>"+module+"</a><ul>";
			for (var i = 0; i < modules[module].length; i++) {
				var className = modules[module][i];
				outputString += "<li><a href='"+projectRoot+"classes/"+className+".html'>"+className+"</a></li>";
			}
			outputString += "</ul></li>";
		}
		
		return outputString;*/
		
		var modules = {};
		for (var i = 0; i < classes.length; i++) {
			var parts = classes[i].name.split(/\.(.+)?/);
			var module_name = parts[0];
			var class_name = parts[1];
			if (modules[module_name] == undefined) {
				modules[module_name] = [];
			}
			
			modules[module_name].push(class_name);
		}
		
		var outputString = "";
		
		var moduleKeys = [];
		for (module in modules) {
			moduleKeys.push(module);
		}
		moduleKeys.sort();
		
		for (var j = 0; j < moduleKeys.length; j++)
		{
			var module = moduleKeys[j];
			outputString += "<li><a href='"+projectRoot+"modules/"+module+".html'>"+module+"</a><ul>";
			for (var i = 0; i < modules[module].length; i++) {
				var className = modules[module][i];
				outputString += "<li><a href='"+projectRoot+"classes/"+module+"."+className+".html'>"+className+"</a></li>";
			}
			outputString += "</ul></li>";
		}
		
		return outputString;
	}
};