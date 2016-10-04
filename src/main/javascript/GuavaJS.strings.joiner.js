//Requires GuavaJS.js
//Requires GuavaJS.strings.js

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
				var partsClean = new Array();
				
				if(!isNull(parts)){
					for(var i=0; i<parts.length; i++){
						var p = parts[i];
						
						if(!_skipNulls && isNull(p)){
							if(_nullToEmpty){
								partsClean.push(Strings.empty);
							}
						} else if(!isNull(p)){
							partsClean.push(p);
						}
					}
				}
				
				return partsClean.join(_on);
			}
		}
	})
	
	return {
		on: function(string){
			return _joiner(string);
		}
	}
})();