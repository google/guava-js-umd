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
	
	var toString = function(bool){
		if(bool){
			return 't';
		}
		return 'f';
	}
	
	return {
		toString: toString,
		fromString: fromString
	}
})();