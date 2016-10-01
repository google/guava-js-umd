//Requires GuavaJS.js
//Requires GuavaJS.string.js

GuavaJS.Strings.CharMatcher = GuavaJS.Strings.CharMatcher || (function(){
	var Strings = GuavaJS.Strings;
	var isNull = GuavaJS.isNull;
	
	var Is = (function(char){
		var _self = this;
		
		return {
			matches: function(c){
				return char == c;
			},
			negate: function(){return Negated(_self);}
		}
	});
	var IsEither = (function(char1, char2){
		var _self = this;
		
		return {
			matches: function(char){
				return char1 == char || char2 == char;
			},
			negate: function(){return Negated(_self);}
		}
	});
	
	var AnyOf = (function(values){
		var _self = this;
		
		var matches = function(char){
			return Strings.contains(values, char);
		}
		
		return {
			matches: matches,
			negate: function(){return Negated(_self);}
		}
	});
	
	var Negated = (function(matcher){
		var _self = this;
		return {
			matches: function(char){
				return !matcher.matches(char);
			},
			negate: function(){return Negated(_self);}
		}
	});
	
	var Or = (function(matcher1, matcher2){
		var _self = this;
		return {
			matches: function(char){
				return matcher1.matches(char) || matcher2.matches(char);
			},
			negate: function(){return Negated(_self);}
		}
	});
	var And = (function(matcher1, matcher2){
		var _self = this;
		return {
			matches: function(char){
				return matcher1.matches(char) && matcher2.matches(char);
			},
			negate: function(){return Negated(_self);}
		}
	});
	
	var _anyOf = function(values){
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
		noneOf: function(values){return anyOf(values).negate();},
		and: function(matcher1, matcher2){return And(matcher1, matcher2);},
		or: function(matcher1, matcher2){return Or(matcher1, matcher2);}
	}
});