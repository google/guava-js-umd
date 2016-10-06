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