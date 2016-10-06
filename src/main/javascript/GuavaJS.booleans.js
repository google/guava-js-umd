//Requires GuavaJS.js

GuavaJS.Booleans = GuavaJS.Booleans || (function(){
	var isNull = GuavaJS.isNull;
	
	var fromString = function(string){
		if(!isNull(string)){
			var s = string.toLowerCase();
			if(s == '1' || s == 'true' || s == 't'){
				return true;
			}
		}
		
		return false;
	}
	
	var fromInt = function(int){
		if(!isNull(int) && int >= 1){
			return true;
		}
		
		return false;
	}
	
	var toString = function(bool){
		if(bool){
			return 't';
		}
		return 'f';
	}
	
	var toInt = function(bool){
		if(!isNull(bool) && bool){
			return 1;
		}
		
		return 0;
	}
	
	return {
		toString: toString,
		toInt: toInt,
		fromString: fromString,
		fromInt: fromInt
	}
})();