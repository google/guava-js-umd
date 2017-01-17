//Requires GuavaJS.js
//Requires GuavaJS.collect.js
//Requires GuavaJS.collect.iterables.js
GuavaJS.Collect.Multimap = GuavaJS.Collect.Multimap || {};
GuavaJS.Collect.Multimap._ = GuavaJS.Collect.Multimap._ || (function(createNewFunc){
	var Iterables = GuavaJS.Collect.Iterables;
	var isNull = GuavaJS.isNull;
	
	var values = {};
	
	var put = function(key, val){
		var values = get(key);
		if(typeof values.push === 'function'){
			values.push(val);
		} else if(typeof values.put === 'function'){
			values.put(val);
		} else {
			throw "Now way to push or put with sub collection";
		}
	}
	
	var putAll = function(key, iterable){
		var values = get(key);
		if(typeof values.push === 'function'){
			Iterables.iterate(iterable, function(val){
				values.push(val);
			});
		} else if(typeof values.put === 'function'){
			Iterables.iterate(iterable, function(val){
				values.put(val);
			});
		} else {
			throw "Now way to push or put with sub collection";
		}
	}
	
	var remove = function(key, value){
		var val = values[key];
		
		if(!isNull(val)){
			var idx = Iterables.indexOf(val, value);
			if(idx > -1){
				val.splice(idx, 1);
				return true;
			}
		}
		
		return false;
	}
	
	var removeAll = function(key){
		var val = values[key];
		if(!isNull(val)){
			val = createNewFunc();
			values[key] = val;
			
			return true;
		}
		
		return false;
	}
	
	var clear = function(){
		values = {};
	}
	
	var get = function(key){
		var val = values[key];
		if(isNull(val)){
			val = createNewFunc();
			values[key] = val;
		}
		
		return val;
	}
	
	return {
		get: get,
		clear: clear,
		remove: remove,
		removeAll: removeAll,
		put: put,
		push: put,
		putAll: putAll,
		pushAll: putAll,
		size: function(){return Iterables.size(values);}
	}
});

GuavaJS.Collect.Multimap.ListMultimap = GuavaJS.Collect.Multimap.ListMultimap || (function(){
	var createFunc = function(){
		return [];
	}
	return GuavaJS.Collect.Multimap._(createFunc);
});