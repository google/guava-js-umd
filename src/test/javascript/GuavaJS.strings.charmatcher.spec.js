describe("Charmatcher", function(){
	it("AnyOf", function(){
		var matcher = GuavaJS.Strings.CharMatcher.anyOf('abc');
		var negMatcher = matcher.negate();
		
		expect(matcher.matches('a')).toBe(true);
		expect(matcher.matches('b')).toBe(true);
		expect(matcher.matches('c')).toBe(true);
		expect(matcher.matches('A')).toBe(false);
		
		expect(matcher.matchesAnyOf('Abc')).toBe(true);
		expect(matcher.matchesAnyOf('ABC')).toBe(false);
		
		expect(matcher.matchesNoneOf('Abc')).toBe(false);
		expect(matcher.matchesNoneOf('ABC')).toBe(true);
		
		expect(matcher.matchesAllOf('ABc')).toBe(false);
		expect(matcher.matchesAllOf('abc')).toBe(true);
		

		expect(negMatcher.matches('a')).toBe(false);
		expect(negMatcher.matches('b')).toBe(false);
		expect(negMatcher.matches('c')).toBe(false);
		expect(negMatcher.matches('A')).toBe(true);
	});
	
	it("NoneOf", function(){
		var negMatcher = GuavaJS.Strings.CharMatcher.noneOf('abc');

		expect(negMatcher.matches('a')).toBe(false);
		expect(negMatcher.matches('b')).toBe(false);
		expect(negMatcher.matches('c')).toBe(false);
		expect(negMatcher.matches('A')).toBe(true);
	});
	
	it("And", function(){
		var matcher1 = GuavaJS.Strings.CharMatcher.anyOf('abc');
		var matcher2 = GuavaJS.Strings.CharMatcher.anyOf('axyz');
		var matcher = GuavaJS.Strings.CharMatcher.and(matcher1, matcher2);
		
		expect(matcher.matches('a')).toBe(true);
		expect(matcher.matches('b')).toBe(false);
		expect(matcher.matches('c')).toBe(false);
		expect(matcher.matches('A')).toBe(false);
	});
	
	it("Or", function(){
		var matcher1 = GuavaJS.Strings.CharMatcher.anyOf('abc');
		var matcher2 = GuavaJS.Strings.CharMatcher.anyOf('xyz');
		var matcher = GuavaJS.Strings.CharMatcher.or(matcher1, matcher2);
		
		expect(matcher.matches('a')).toBe(true);
		expect(matcher.matches('b')).toBe(true);
		expect(matcher.matches('c')).toBe(true);
		expect(matcher.matches('x')).toBe(true);
		expect(matcher.matches('y')).toBe(true);
		expect(matcher.matches('z')).toBe(true);
		expect(matcher.matches('A')).toBe(false);
	});
});