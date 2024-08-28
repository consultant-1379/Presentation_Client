define([
    'Titan'
], function (Titan) {
    return Titan.Model.extend({
        getParamsURLString: function() {
            var paramsArray = [];

            var paramsJson = this.toJSON();

            for (var prop in paramsJson) {
                if (paramsJson[prop] instanceof Array) {
                    paramsArray.push(prop + '=' + paramsJson[prop].join());
                } else {
                    paramsArray.push(prop + '=' + paramsJson[prop]);
                }
            }

            return paramsArray.join('&');
        }
    });
});