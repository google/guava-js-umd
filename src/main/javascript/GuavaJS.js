var GuavaJS = GuavaJS || (function(){
	var isNull = function(obj){
		return (typeof obj == "undefined" || obj === null);
	}
	
	var isArray = function(obj){
		return !isNull(obj) && Array.isArray(obj);
	}
	
	var isString = function(str){
		return typeof(str) == "string" || str instanceof String;
	}
	
	return {
		isNull:isNull,
		isArray: isArray,
		isString: isString
	}
})();