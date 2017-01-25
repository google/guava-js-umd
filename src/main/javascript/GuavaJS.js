var GuavaJS = GuavaJS || (function(){
	var isNull = function(obj){
		return (typeof obj == "undefined" || obj === null);
	}
	
	var isArray = function(obj){
		return !isNull(obj) && Array.isArray(obj);
	}
	var isIterable = function(obj){
		return isFunction(obj['forEach']) || isArray(obj) || isObject(obj);
	}
	
	var isString = function(str){
		return (typeof str == "string" || str instanceof String);
	}
	
	var isFunction = function(obj){
		return !isNull(obj) && typeof obj == "function";
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
	
	var randomNumberExclusive = function(min, max){
		return Math.random() * (max - min) + min;
	}
	var randomNumber = function(min, max){
		return Math.random() * (max - min + 1) + min;
	}
	
	// Returns a random integer between min (included) and max (excluded)
	// Using Math.round() will give you a non-uniform distribution!
	var randomIntExclusive = function(minInt, maxInt){
		min = Math.ceil(minInt);
		max = Math.floor(maxInt);
		return Math.floor(randomNumberExclusive(min, max));
	}
	
	// Returns a random integer between min (included) and max (included)
	// Using Math.round() will give you a non-uniform distribution!
	var randomInt = function(minInt, maxInt){
		min = Math.ceil(minInt);
		max = Math.floor(maxInt);
		return Math.floor(randomNumber(min, max));
	}
	
	var uuid = function(){
		var date = new Date().getTime();
        var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            var r = (date + Math.random()*16)%16 | 0;
            date = Math.floor(date/16);
            return (c=='x' ? r : (r&0x3|0x8)).toString(16);
        });
        return uuid.toUpperCase();
	}
	
	return {
		isNull:isNull,
		isArray: isArray,
		isString: isString,
		isObject: isObject,
		isNumber: isNumber,
		isBoolean: isBoolean,
		isFunction: isFunction,
		isIterable: isIterable,
		
		randomInt: randomInt,
		randomIntExclusive: randomIntExclusive,
		randomNumber: randomNumber,
		randomNumberExclusive: randomNumberExclusive
	}
})();