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