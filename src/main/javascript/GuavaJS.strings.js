//Requires GuavaJS.js

GuavaJS.Strings = GuavaJS.Strings || (function(){
	var isNull = GuavaJS.isNull;
	var isString = GuavaJS.isString;
	
	var emptyString = "";
	var none = "null";
	
	var isNullOrEmpty = function(string){
		if(isNull(string) || string == emptyString){
			return true;
		} else {
			return false;
		}
	}
	
	var nullToEmpty = function(string){
		return nullTo(string, emptyString);
	}
	
	var nullTo = function(string, def){
		if(isNull(string)){
			return def;
		}
		return string;
	}
	
	var contains = function(string, val){
		if(!isNull(string)){
			return ~string.indexOf(val) != 0;
		}
		
		return false;
	}
	
	var trim = function(string){
		return nullToEmpty(string).trim();
	}
	
	return {
		empty: emptyString,
		none: none,
		isNullOrEmpty: isNullOrEmpty,
		nullTo: nullTo,
		nullToEmpty: nullToEmpty,
		contains: contains,
		trim: trim
	}
})();