(function (root, factory) {
  if (root === undefined && window !== undefined) root = window;
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module unless amdModuleId is set
    define([], function () {
      return (root['GuavaJS'] = factory());
    });
  } else if (typeof module === 'object' && module.exports) {
    // Node. Does not work with strict CommonJS, but
    // only CommonJS-like environments that support module.exports,
    // like Node.
    module.exports = factory();
  } else {
    root['GuavaJS'] = factory();
  }
}(this, function () {

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
//Requires GuavaJS.js
GuavaJS.Collect = GuavaJS.Collect || (function(){
	return {};
})();
//Requires GuavaJS.js
//Requires GuavaJS.collect.js
//Requires GuavaJS.collect.iterables.js
GuavaJS.Collect.Multimap = GuavaJS.Collect.Multimap || {};
GuavaJS.Collect.Multimap._ = GuavaJS.Collect.Multimap._ || (function(createNewFunc){
	var Iterables = GuavaJS.Collect.Iterables;
	var isNull = GuavaJS.isNull;
	var isIterable = GuavaJS.isIterable;
	
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
	
	var _ = {
		get: get,
		clear: clear,
		remove: remove,
		removeAll: removeAll,
		put: put,
		push: put,
		putAll: putAll,
		pushAll: putAll,
		size: function(){return Iterables.size(values);},
		forEach: function(callback){Iterables.iterate(values, callback);},
		extend: function(map){Iterables.iterate(map, function(val, key){
			if(isIterable(val)){
				putAll(key, val);
			} else {
				put(key, val);
			}
		})}
	}
	
	//TODO: Add Symbol.iterator declaration
	
	return _;
});

GuavaJS.Collect.Multimap.ListMultimap = GuavaJS.Collect.Multimap.ListMultimap || (function(){
	var createFunc = function(){
		return [];
	}
	return GuavaJS.Collect.Multimap._(createFunc);
});
GuavaJS.Collect.Multimap.FlatListMultimap = GuavaJS.Collect.Multimap.FlatListMultimap || (function(){
	var _map = GuavaJS.Collect.Multimap.ListMultimap();
	var _ = {}
	for (var key in _map) {
		_[key] = _map[key];
	}
	
	_.get = function(key){
		var v = _map.get(key);
		if(v.length == 1){
			return v[0];
		} else if(v.length ==0){
			return null;
		} else {
			return v;
		}
	}
	
	return _;
});
//Requires GuavaJS.js

GuavaJS.Concurrent = GuavaJS.Concurrent || (function(){
	
	//Produces a new callback function that is not called by timeoutMs 
	//will trigger onTimeout to be called. Otherwise onSuccess will be called
	var timeoutCallback = function(onSuccess, onTimeout, timeoutMs){
		var timer = setTimeout(function () {
            onSuccess = function(){};
            onTimeout();
        }, timeoutMs);

        var newCallback = function () {
            clearTimeout(timer);
            onSuccess.apply(this, arguments);
        };

        return newCallback;
	}
	
	return {
		timeoutCallback: timeoutCallback
	}
})();
//Requires GuavaJS.js
//Requires GuavaJS.collect.js
//Requires GuavaJS.collect.iterables.js

GuavaJS.Concurrent.Futures = GuavaJS.Concurrent.Futures || (function(){
	var Iterables = GuavaJS.Collect.Iterables;
	
	var _Future = (function(){
		var _self = this;
		var isDone = false;
		var isCancelled = false;
		var calledArgs = null;
		var callbacks = new Array();
		
		var _callbackHandler = function(){
			if(!isCancelled){
				calledArgs = Array.prototype.slice.call(arguments);
				isDone = true;
				
				if(!Iterables.isNullOrEmpty(callbacks)){
					Iterables.iterate(callbacks, function(val){
						try {
							val.apply(_self, calledArgs)
						} catch(e){}
					});
					callbacks = new Array();
				}
			}
		}
		_callbackHandler.addCallback = function(func){
			//We can add an exception throw here, but debating upon it
			if(!isCancelled){
				if(!isDone){
					callbacks.push(func);
				} else {
					func.apply(_self, calledArgs);
				}
			}
		}
		_callbackHandler.isDone = function(){
			return isDone || isCancelled;
		}
		_callbackHandler.get = function(){
			return calledArgs;
		}
		_callbackHandler.cancel = function(){
			isCancelled = true;
		}
		_callbackHandler.isCancelled = function(){
			return isCancelled;
		}
		
		return _callbackHandler;
	});
	
	return {
		Future: _Future
	}
})();
//Requires GuavaJS.js

GuavaJS.LoggingLevels = GuavaJS.LoggingLevels || {
	TRACE: -1,
	DEBUG: 0,
	INFO: 1,
	WARN: 2,
	ERROR: 3,
	NONE: 4
};
GuavaJS.LoggingConsole = GuavaJS.LoggingConsole || (function(){
	var Levels = GuavaJS.LoggingLevels;
	var _consoleExists = "undefined" != typeof console;
	
	//TODO: Support date formating
	//TODO: Support message formating
	
	var log = function(level, name){
		if(_consoleExists){
			var _args = Array.prototype.slice.call(arguments);
			_args.shift(); //Shift Log Level
			_args.shift(); //Shift Logger Name
			
			var dateStr = (new Date()).getTime();
			var logStatement = "["+ dateStr +"]["+ name +"]";
			if(GuavaJS.isString(_args[0])){
				logStatement += " "+ _args.shift();
			}
			
			_args.unshift(logStatement);
			
			if(level == Levels.TRACE){
				console.trace.apply(console, _args);
			} else if(level == Levels.DEBUG){
				console.debug.apply(console, _args);
			} else if(level == Levels.INFO){
				console.info.apply(console, _args);
			} else if(level == Levels.WARN){
				console.warn.apply(console, _args);
			} else if(level == Levels.ERROR){
				console.error.apply(console, _args);
			}
		}
	}
	
	var startGroup = function(name, label){
		if(_consoleExists && console.group){
			console.groupCollapsed("["+name+"] "+ label);
		}
	}
	
	var endGroup = function(){
		if(_consoleExists && console.groupEnd){
			console.groupEnd();
		}
	}
	
	var table = function(data, columns){
		if(_consoleExists && console.table){
			console.table(data, columns);
		}
	}
	
	return {
		log: log,
		startGroup: startGroup,
		endGroup: endGroup,
		table: table
	}
})

GuavaJS.LoggingFactory = GuavaJS.LoggingFactory || (function(loggerInstance){
	var Levels = GuavaJS.LoggingLevels;
	var _loggerInstance = loggerInstance;
	
	//This is a wrapper around the actually logging implementation to apply common logic to all loggers 
	//As well as to ensure all common logging methods exist
	var Logger = (function(name){
		var _self = this;
		var _name = name;
		var loggingLevel = Levels.NONE;
		
		var isEnabled = function(level){
			return (level >= loggingLevel);
		}
		
		var log = function(level, args){
			if(isEnabled(level) && !GuavaJS.isNull(_loggerInstance)){
				var _args = Array.prototype.slice.call(args);
				_args.unshift(_name);
				_args.unshift(level);
				
				try {
					_loggerInstance.log.apply(_self, _args);
				} catch(e){}
			}
		}
		
		return {
			setLevel: function(level){loggingLevel = level;},
			
			isTraceEnabled: function(){return isEnabled(Levels.TRACE);},
			isDebugEnabled: function(){return isEnabled(Levels.DEBUG);},
			isInfoEnabled: function(){return isEnabled(Levels.INFO);},
			isWarnEnabled: function(){return isEnabled(Levels.WARN);},
			isErrorEnabled: function(){return isEnabled(Levels.ERROR);},
			
			trace: function(){log(Levels.TRACE, arguments);},
			debug: function(){log(Levels.DEBUG, arguments);},
			info: function(){log(Levels.INFO, arguments);},
			warn: function(){log(Levels.WARN, arguments);},
			error: function(){log(Levels.ERROR, arguments);},
			startGroup: function(label){
				if(loggingLevel < Levels.NONE){
					_loggerInstance.startGroup(name, label);
				}
			},
			endGroup: function(){
				if(loggingLevel < Levels.NONE){
					_loggerInstance.endGroup();
				}
			},
			table: function(data, columns){
				if(loggingLevel < Levels.NONE){
					_loggerInstance.table(data, columns);
				}
			}
		}
	});
	
	var loggers = {};
	var getLogger = function(name){
		var _logger = loggers[name];
		if(GuavaJS.isNull(_logger)){
			_logger = Logger(name);
			loggers[name] = _logger;
		}
		
		return _logger;
	}
	var setLevel = function(name, level){
		var _logger = getLogger(name);
		_logger.setLevel(level);
	}
	
	return {
		Levels: Levels,
		
		getLogger: getLogger,
		setLevel: setLevel,
		setLoggerImplementation: function(loggerInstance){
			_loggerInstance = loggerInstance;
		}
	}
})(GuavaJS.LoggingConsole());
//Requires GuavaJS.js

GuavaJS.Numbers = GuavaJS.Numbers || (function(){
	var isNull = GuavaJS.isNull;
	var isNumber = GuavaJS.isNumber;
	
	//Ensures a Number is returned. Will attempt to cast a value to Number if it isn't NaN.
	//Otherwise you will receive your default
	var nullTo = function(val, def){
		if(!isNull(val)){
			if(!isNumber(val) && !isNaN(val)){
				return Number(val);
			} else if(isNumber(val)) {
				return val;
			}
		}
		
		return def;
	}
	
	return {
		nullTo: nullTo,
		nullToZero: function(val){return nullTo(val, 0);}
	}
})();
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
//Requires GuavaJS.js
//Requires GuavaJS.string.js

GuavaJS.Strings.CharMatcher = GuavaJS.Strings.CharMatcher || (function(){
	var Strings = GuavaJS.Strings;
	var isNull = GuavaJS.isNull;
	
	var _matchesAnyOf = function(matcher, str){
		for(i=0; i<str.length; i++){
			if(matcher.matches(str.charAt(i))){
				return true;
			}
		}
		
		return false;
	}
	var _matchesNoneOf = function(matcher, str){
		return !_matchesAnyOf(matcher, str);
	}
	var _matchesAllOf = function(matcher, str){
		for(i=0; i<str.length; i++){
			if(!matcher.matches(str.charAt(i))){
				return false;
			}
		}
		
		return true;
	}
	
	var Is = (function(char){
		return {
			matches: function(c){
				return char == c;
			},
			matchesAnyOf: function(string){return _matchesAnyOf(this, string);},
			matchesNoneOf: function(string){return _matchesNoneOf(this, string);},
			matchesAllOf: function(string){return _matchesAllOf(this, string);},
			negate: function(){return Negated(this);}
		}
	});
	var IsEither = (function(char1, char2){
		return {
			matches: function(char){
				return char1 == char || char2 == char;
			},
			matchesAnyOf: function(string){return _matchesAnyOf(this, string);},
			matchesNoneOf: function(string){return _matchesNoneOf(this, string);},
			matchesAllOf: function(string){return _matchesAllOf(this, string);},
			negate: function(){return Negated(this);}
		}
	});
	
	var AnyOf = (function(values){
		var matches = function(char){
			return Strings.contains(values, char);
		}
		
		return {
			matches: matches,
			matchesAnyOf: function(string){return _matchesAnyOf(this, string);},
			matchesNoneOf: function(string){return _matchesNoneOf(this, string);},
			matchesAllOf: function(string){return _matchesAllOf(this, string);},
			negate: function(){return Negated(this);}
		}
	});
	
	var Negated = (function(matcher){
		return {
			matches: function(char){
				return !matcher.matches(char);
			},
			matchesAnyOf: function(string){return _matchesAnyOf(this, string);},
			matchesNoneOf: function(string){return _matchesNoneOf(this, string);},
			matchesAllOf: function(string){return _matchesAllOf(this, string);},
			negate: function(){return Negated(this);}
		}
	});
	
	var Or = (function(matcher1, matcher2){
		return {
			matches: function(char){
				return matcher1.matches(char) || matcher2.matches(char);
			},
			matchesAnyOf: function(string){return _matchesAnyOf(this, string);},
			matchesNoneOf: function(string){return _matchesNoneOf(this, string);},
			matchesAllOf: function(string){return _matchesAllOf(this, string);},
			negate: function(){return Negated(this);}
		}
	});
	var And = (function(matcher1, matcher2){
		return {
			matches: function(char){
				return matcher1.matches(char) && matcher2.matches(char);
			},
			matchesAnyOf: function(string){return _matchesAnyOf(this, string);},
			matchesNoneOf: function(string){return _matchesNoneOf(this, string);},
			matchesAllOf: function(string){return _matchesAllOf(this, string);},
			negate: function(){return Negated(this);}
		}
	});
	
	var InRange = (function(startInclusive, endInclusive){
		var sICode = startInclusive.charCodeAt(0);
		var eICode = endInclusive.charCodeAt(0);
		
		return {
			matches: function(char){
				var code = char.charCodeAt(0);
				
				return sICode <= code && code <= eICode;
			},
			matchesAnyOf: function(string){return _matchesAnyOf(this, string);},
			matchesNoneOf: function(string){return _matchesNoneOf(this, string);},
			matchesAllOf: function(string){return _matchesAllOf(this, string);},
			negate: function(){return Negated(this);}
		}
	});
	
	var _anyOf = function(values){
		//This is a performance util function
		if(!isNull(values)){
			if(values.length == 1){
				return Is(values);
			} else if(values.length == 2){
				return IsEither(values[0], values[1]);
			}
		}
		
		return AnyOf(Strings.nullToEmpty(values));
	}
	
	return {
		anyOf: _anyOf,
		noneOf: function(values){return _anyOf(values).negate();},
		and: And,
		or: Or,
		inRange: InRange
	}
})();
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
//Requires GuavaJS.js
//Requires GuavaJS.strings.js
//Requires GuavaJS.strings.charmatcher.js

//Optional if MapSplitter is added
//Requires GuavaJS.collect.js
//Requires GuavaJS.collect.iterables.js
//Requires GuavaJS.collect.multimap.js

GuavaJS.Strings.Splitter = GuavaJS.Strings.Splitter || (function(){
	var Strings = GuavaJS.Strings;
	var isString = GuavaJS.isString;
	
	var _evalPart = function(trimResults, omitEmptyStrs, part){
		part = Strings.nullToEmpty(part);
		
		if(trimResults){
			part = Strings.trim(part);
		}
		
		if(!omitEmptyStrs || !Strings.isNullOrEmpty(part)){
			return part;
		}
		
		return null;
	}
	
	var _splitter = function(charmatcher){
		var matcher = charmatcher;
		var trimResults = false;
		var omitEmptyStrs = false;
		
		var evalPart = function(part){return _evalPart(trimResults, omitEmptyStrs, part);};
		
		return {
			trimResults: function(){
				trimResults=true; 
				return this;
			},
			omitEmptyStrings: function(){
				omitEmptyStrs=true; 
				return this;
			},
			split: function(value){
				var parts = new Array();
				
				if(!Strings.isNullOrEmpty(value)){
					var part = "";
					for(i=0; i<value.length; i++){
						var char = value.charAt(i);
						if(matcher.matches(char)){
							part = evalPart(part);
							if(part != null){
								parts.push(part);
							}
							part = "";
						} else {
							part += char;
						}
					}
					
					part = evalPart(part);
					if(part != null){
						parts.push(part);
					}
				}

				return parts;
			},
			withKeyValueSeparator: function(value){
				var kvMatcher = value
				if(isString(value)){
					kvMatcher = GuavaJS.Strings.CharMatcher.anyOf(value);
				}
				
				return _mapSplitter(kvMatcher, matcher, trimResults, omitEmptyStrs);
			}
		}
	}
	
	var _mapSplitter = function(_kvMatcher, _matcher, _trimResults, _omitEmptyStrs){
		var MultiMap = GuavaJS.Collect.Multimap;
		
		var kvMatcher = _kvMatcher;
		var matcher = _matcher;
		var trimResults = _trimResults;
		var omitEmptyStrs = _omitEmptyStrs;
		
		var evalPart = function(part){return _evalPart(trimResults, omitEmptyStrs, part);};
		
		return {
			trimResults: function(){
				trimResults=true; 
				return this;
			},
			omitEmptyStrings: function(){
				omitEmptyStrs=true; 
				return this;
			},
			split: function(value){
				var parts = MultiMap.FlatListMultimap();
				
				if(!Strings.isNullOrEmpty(value)){
					var cKey = null;
					var part = "";
					for(i=0; i<value.length; i++){
						var char = value.charAt(i);
						if(kvMatcher.matches(char)){
							cKey = part;
							part = "";
						} else if(matcher.matches(char)){
							part = evalPart(part);
							if(cKey != null && part != null){
								parts.push(cKey, part);
							}
							part = "";
							cKey = null;
						} else {
							part += char;
						}
					}
					
					part = evalPart(part);
					if(part != null){
						if(cKey != null){
							parts.push(cKey, part);
						}
					}
				}

				return parts;
			}
		}
	}
	
	return {
		on: function(value){
			if(isString(value)){
				var matcher = GuavaJS.Strings.CharMatcher.anyOf(value);
				return _splitter(matcher);
			} else {
				return _splitter(value);
			}
		}
	}
})();
//Requires GuavaJS.js

GuavaJS.Net = GuavaJS.Net || (function(){
	var isNull = GuavaJS.isNull;
	var isObject = GuavaJS.isObject;
	var isFunction = GuavaJS.isFunction;
	
	var XHR = {};
	XHR.xhr = function(options) {
		options = options || {};
		var withCredentials = options.withCredentials || false;
		var timeout = options.timeout || 0;
		
		var xhr = new window.XMLHttpRequest();
		xhr.timeout = timeout;
		if (withCredentials){
			if('withCredentials' in xhr) {
				xhr.withCredentials = true;
				//All good
			} else if (typeof XDomainRequest != "undefined") {
				xhr = new XDomainRequest();
			} else {
				throw "CORS not supported by browser";
			}
		}
		
		return xhr;
	};
	
	XHR.supported = function() {
		return isFunction(window.XMLHttpRequest) || isObject(window.XMLHttpRequest);
	};
	XHR.get = function(url, options, cb) {
		var xhr = this.xhr(options);
		xhr.open('GET', url);
		xhr.send();

		if(!isNull(cb)){
			return xhr.onreadystatechange = function() {
				if (xhr.readyState === 4) {
					return cb(xhr.responseText, xhr.responseXML);
				}
			};
		}
	};
	XHR.post = function(url, queryString, options, cb) {
		var xhr = this.xhr(options);
		xhr.open('POST', url);
		xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
		xhr.send(queryString);

		if(!isNull(cb)){
			return xhr.onreadystatechange = function() {
				if (xhr.readyState == 4 && xhr.status == 200) {
					return cb(xhr.responseText, xhr.responseXML);
				}
			};
		}
	};
	
	var post = function(url, queryString, callback, options) {
		try {
			if(!XHR.supported()){
				throw "XHR isn't supported";
			}
			XHR.post(url, queryString, options, callback);
		} catch(e){
			throw e;
		}
	}

	var get = function(url, callback, options) {
		try {
			if(!XHR.supported()){
				throw "XHR isn't supported";
			}
			
			XHR.get(url, options, callback);
		} catch(e){
			throw e;
		}
	}
	
	var getImg = function(url) {
		var img = document.createElement('img');
		img.src = url;
	}
	
	return {
		post: post,
		get: get,
		getImg: getImg
	}
})();
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
	
	var QueryString = (function(){
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
	
	var _Uri = (function(base, scheme, host, path, queryString){
		return {
			scheme:scheme,
			host:host,
			path:path,
			base:base,
			queryString:queryString,
			queryStr:queryString,
			query:queryString,
			toString: function(){
				var s = base;
				if(queryString.size() > 0){
					s += "?"+ queryString.toString();
				}
				
				return s;
			}
		}
	});
	
	var create = function(uri){
		var base = "";
		var scheme = "";
		var host = "";
		var path = "";
		var queryString = "";
		
		var split = uri.split('//', 2);
		if(split.length == 2){
			scheme = split[0].replace(":", "");
			uri = split[1];
		}
		
		split = uri.split('/');
		if(split.length >= 2){
			host = split.shift();
			var subsplit = split.join('/').split('?');
			if(subsplit.length == 2){
				path = subsplit[0];
				queryString = subsplit[1];
			} else {
				path = subsplit[0];
			}
		} else {
			var subsplit = uri.split('?');
			if(subsplit.length == 2){
				host = subsplit[0];
				queryString = subsplit[1];
			} else {
				host = uri;
			}
		}
		
		if(!Strings.isNullOrEmpty(scheme)){
			base += scheme +"://";
		}
		base += host;
		if(!Strings.isNullOrEmpty(path)){
			base += "/"+path;
		}
		
		return _Uri(base, scheme, host, path, QueryString.fromString(queryString));
	}
	
	return {
		create: create,
		QueryString: QueryString
	};
})();
return GuavaJS;

}));
