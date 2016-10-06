var GuavaJS = GuavaJS || (function(){
	var isNull = function(obj){
		return (typeof obj == "undefined" || obj === null);
	}
	
	var isArray = function(obj){
		return !isNull(obj) && Array.isArray(obj);
	}
	
	var isString = function(str){
		return (typeof str == "string" || str instanceof String);
	}
	
	var isObject = function(obj){
		return !isNull(obj) && typeof obj == "object";
	}
	
	var isNumber = function(obj){
		return !isNull(obj) && typeof obj == "number";
	}
	
	var isBoolean = function(obj){
		return !isNull(obj) && typeof obj == "boolean";
	}
	
	return {
		isNull:isNull,
		isArray: isArray,
		isString: isString,
		isObject: isObject,
		isNumber: isNumber,
		isBoolean: isBoolean
	}
})();