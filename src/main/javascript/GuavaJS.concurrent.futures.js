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