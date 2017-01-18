//Requires GuavaJS.js
//Requires GuavaJS.Strings.js

//Optional if MapJoiner is added
//Requires GuavaJS.collect.js
//Requires GuavaJS.collect.iterables.js

GuavaJS.Strings.Joiner = GuavaJS.Strings.Joiner || (function(){
	var Strings = GuavaJS.Strings;
	var isNull = GuavaJS.isNull;
	
	var _joiner = (function(on){
		var _on = on;
		var _skipNulls = false;
		var _nullToEmpty = false;
		
		return {
			skipNulls: function(){
				_skipNulls = true; 
				return this;
			},
			nullsToEmpty: function(){
				_nullToEmpty = true; 
				return this;
			},
			join: function(parts){
				var partsClean = [];
				
				if(!isNull(parts)){
					for(var i=0; i<parts.length; i++){
						var p = parts[i];
						
						if(!_skipNulls && isNull(p)){
							if(_nullToEmpty){
								partsClean.push(Strings.empty);
							} else {
								partsClean.push(Strings.none);
							}
						} else if(!isNull(p)){
							partsClean.push(p);
						}
					}
				}
				
				return partsClean.join(_on);
			},
			withKeyValueSeparator: function(string){
				return _mapJoiner(_on, string, _skipNulls, _nullToEmpty);
			}
		}
	});
	
	var _mapJoiner = (function(on, kvOn, skipnulls, nulltoEmpty){
		var Iterables = GuavaJS.Collect.Iterables;
		
		var _on = on;
		var _kvOn = kvOn;
		var _skipNulls = skipnulls;
		var _nullToEmpty = nulltoEmpty;
		
		return {
			skipNulls: function(){
				_skipNulls = true; 
				return this;
			},
			nullsToEmpty: function(){
				_nullToEmpty = true; 
				return this;
			},
			join: function(map){
				var partsClean = [];
				
				if(!isNull(map)){
					Iterables.iterate(map, function(val, key){
						Iterables.iterate(val, function(value){
							if(!_skipNulls && isNull(value)){
								if(_nullToEmpty){
									partsClean.push(key+_kvOn+Strings.empty);
								} else {
									partsClean.push(key+_kvOn+Strings.none);
								}
							} else if(!isNull(value)){
								partsClean.push(key+_kvOn+value);
							}
						});
					});
				}
				
				return partsClean.join(_on);
			}
		}
			
	});
	
	return {
		on: function(string){
			return _joiner(string);
		}
	}
})();