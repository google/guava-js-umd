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