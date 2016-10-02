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