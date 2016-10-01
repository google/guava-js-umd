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