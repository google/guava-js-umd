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
	
	return {
		isNull:isNull,
		isArray: isArray,
		isString: isString,
		isObject: isObject
	}
})();