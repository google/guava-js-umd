//Requires GuavaJS.js

GuavaJS.Strings = GuavaJS.Strings || (function(){
	var isNull = GuavaJS.isNull;
	var isString = GuavaJS.isString;
	
	var emptyString = "";
	
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
	
	return {
		empty: emptyString,
		isNullOrEmpty: isNullOrEmpty,
		nullTo: nullTo,
		nullToEmpty: nullToEmpty,
		contains: contains
	}
})();