//Requires GuavaJS.js
//Requires GuavaJS.collect.js
//Requires GuavaJS.collect.iterables.js
//Requires GuavaJS.collect.multimap.js
//Requires GuavaJS.strings.js
//Requires GuavaJS.strings.charmatcher.js
//Requires GuavaJS.strings.joiner.js
//Requires GuavaJS.strings.splitter.js
//Requires GuavaJS.net.js

GuavaJS.Net.Uri = GuavaJS.Net.Uri || (function(){
	var isFunction = GuavaJS.isFunction;
	var isIterable = GuavaJS.isIterable;
	var Collect = GuavaJS.Collect;
	var Iterables = Collect.Iterables;
	var Multimap = Collect.Multimap.FlatListMultimap;
	var Strings = GuavaJS.Strings;
	var Joiner = Strings.Joiner;
	var Splitter = Strings.Splitter;
	
	var Params = (function(){
		var _joiner = Joiner.on('&').withKeyValueSeparator("=").skipNulls();
		var _splitter = Splitter.on('&').withKeyValueSeparator("=").trimResults().omitEmptyStrings();
		
		var _Params = (function(){
			var _map = Multimap();
			var _ = {}
			for (var key in _map) {
				_[key] = _map[key];
			}
			_.put = function(key, value, valModFunc){
				if(isIterable(value)){
					Iterables.iterate(value, function(val){
						_.put(key, val, valModFunc);
					});
				} else {
					if(isFunction(valModFunc)){
						return _map.put(key, valModFunc(value));
					} else {
						return _map.put(key, value);
					}
				}
			}
			_.putAll = _.put;
			_.toString = function(){
				var map = Multimap();
				Iterables.iterate(_, function(value, key){
					if(isIterable(value)){
						Iterables.iterate(value, function(val){
							map.put(key, encodeURIComponent(val));
						});
					} else {
						map.put(key, encodeURIComponent(value));
					}
				});
				return _joiner.join(map);
			}
			_.toStringUnencoded = function(){
				return _joiner.join(_);
			}
			
			return _;
		});
		
		return {
			fromString: function(queryString){
				var p = _Params();
				var parts = _splitter.split(queryString);
				Iterables.iterate(parts, function(val, key){
					p.putAll(key, val, decodeURIComponent);
				});
				
				return p;
			}
		}
	})();
	
	var Uri = (function(){
		
		var _Uri = (function(){
			
		});
		
		
	})();
	
	return {
		Uri: Uri,
		Params: Params
	};
})();