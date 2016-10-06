//Requires GuavaJS.js

GuavaJS.Numbers = GuavaJS.Numbers || (function(){
	var isNull = GuavaJS.isNull;
	var isNumber = GuavaJS.isNumber;
	
	//Ensures a Number is returned. Will attempt to cast a value to Number if it isn't NaN.
	//Otherwise you will receive your default
	var nullTo = function(val, def){
		if(!isNull(val)){
			if(!isNumber(val) && !isNaN(val)){
				return Number(val);
			} else if(isNumber(val)) {
				return val;
			}
		}
		
		return def;
	}
	
	return {
		nullTo: nullTo,
		nullToZero: function(val){return nullTo(val, 0);}
	}
})();