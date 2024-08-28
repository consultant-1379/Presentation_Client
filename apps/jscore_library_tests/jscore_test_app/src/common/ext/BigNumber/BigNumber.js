define([
	"./base/bignumber"
], function(base) {
	
	var BigNumber = function(n) {
		this._bigNumber = new base(n);
	}
	
	BigNumber.prototype = {
		add: function(value) {
			this._bigNumber = this._bigNumber.add(value);
			return this;
		},
		
		multiply: function(value) {
			this._bigNumber = this._bigNumber.multiply(value);
			return this;
		},
		
		minus: function(value) {
			this._bigNumber = this._bigNumber.minus(value);
			return this;
		},
		
		divide: function(value) {
			this._bigNumber = this._bigNumber.divide(value);
			return this;
		},
		
		toString: function() {
			return this._bigNumber.toString();
		}
	}
	
	return BigNumber;

});