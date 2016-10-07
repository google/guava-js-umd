//Requires GuavaJS.js
//Requires GuavaJS.collect.js
GuavaJS.Collect.Iterables = GuavaJS.Collect.Iterables || (function(){
	var isNull = GuavaJS.isNull;
	var isArray = GuavaJS.isArray;
	var isObject = GuavaJS.isObject;
	
	var size = function(iterable){
		if(!isNull(iterable)){
			if (isArray(iterable)){
				return iterable.length;
			} else if(isObject(iterable)) {
				try {
	    			return Object.keys(iterable).length;
	    		}catch(e){}
			}
		}
		
		return 0;
	}
	
	var isNullOrEmpty = function(iterable){
		return (size(iterable) <= 0);
	}
	
	var indexOf = function(iterable, val){
    	if(isNullOrEmpty(iterable)){
    		return -1;
    	} else if(isArray(iterable)){
    		return iterable.indexOf(val);
    	} else if(isObject(iterable)){
    		var keys = Object.keys(iterable);
    		for(var i=0; i<keys.length; i++){
    			var key = keys[i];
    			if(iterable[key] == val){
    				return key;
    			}
    		}
    	}
    	
    	return -1;
	}
	
	var contains = function(iterable, val){
    	return (indexOf(val) > -1);
    }
	
	var getFirst = function(iterable, def){
		if(!isNullOrEmpty(iterable)){
			if(isArray(iterable)){
				return iterable[0];
			} else {
				try {
					return iterable[getFirst(Object.keys(iterable))];
				} catch(e) {}
			}
		}
		
		if(isNull(def)){
			return null;
		}
		return def;
	}
	
	var getLast = function(iterable, def){
		if(!isNullOrEmpty(iterable)){
			if(isArray(iterable)){
				var s = size(iterable);
				return iterable[s-1];
			} else {
				try {
					return iterable[getLast(Object.keys(iterable))];
				} catch(e) {}
			}
		}
		
		if(isNull(def)){
			return null;
		}
		return def;
	}
	
	var iterate = function(iterable, callback){
		if(!isNullOrEmpty(iterable)){
			if(isArray(iterable)){
				for(var i=0; i<iterable.length; i++){
					try {
						callback(iterable[i], i);
					} catch(e){
						//TODO: Implement Breaking
					}
				}
			} else if(isObject(iterable)) {
				for (var key in iterable) {
		    		if (iterable.hasOwnProperty(key)) {
						try {
							callback(iterable[key], key);
						} catch(e){
							//TODO: Implement Breaking
						}
		    		}
		    	}
			}
		} else if(!isNull(iterable)){
			//This is an extra feature. Just incase we didn't get an iterable item. 
			//We can at least call the callback with it. This helps with people trying to
			//iterate over JSON where sometimes you get an iterable but if its sigular you don't
			try {
				callback(iterable, null);
			} catch(e){
				//We don't need a handler for breaking
			}
		}
	}
	
	return {
		size: size,
		isNullOrEmpty: isNullOrEmpty,
		contains: contains,
		getFirst: getFirst,
		getLast: getLast,
		iterate: iterate,
		indexOf: indexOf
	}
})();