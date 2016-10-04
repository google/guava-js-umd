//Requires GuavaJS.js
//Requires GuavaJS.strings.js
//Requires GuavaJS.strings.charmatcher.js

GuavaJS.Strings.Splitter = GuavaJS.Strings.Splitter || (function(){
	var Strings = GuavaJS.Strings;
	
	var _splitter = function(charmatcher){
		var matcher = charmatcher;
		var trimResults = false;
		var omitEmptyStrs = false;
		
		var evalPart = function(parts, part){
			part = Strings.nullToEmpty(part);
			
			if(trimResults){
				part = Strings.trim(part);
			}
			
			if(!omitEmptyStrs || !Strings.isNullOrEmpty(part)){
				parts.push(part);
			}
		}
		
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
							evalPart(parts, part);
							part = "";
						} else {
							part += char;
						}
					}
					
					evalPart(parts, part);
				}

				return parts;
			}
		}
	}
	
	return {
		on: function(string){
			var matcher = GuavaJS.Strings.CharMatcher.anyOf(string);
			return _splitter(matcher);
		},
		using: function(charmatcher){
			return _splitter(charmatcher);
		}
	}
})();