describe("String Joiner", function(){
	var Joiner = GuavaJS.Strings.Joiner;
	
	it("Basic Joiner", function(){
		var joiner = Joiner.on('.');
		var string = joiner.join(['a', 'b', '', 'c', null]);
		
		expect(string).toBe('a.b..c');
	})
	
	it("NullToEmpty Joiner", function(){
		var joiner = Joiner.on('.').nullsToEmpty();
		var string = joiner.join(['a', 'b', '', 'c', null]);
		
		expect(string).toBe('a.b..c.');
	})
	
	it("SkipNulls Joiner", function(){
		var joiner = Joiner.on('.');
		var string = joiner.join(['a', 'b', '', 'c', null]);
		
		expect(string).toBe('a.b..c');
	})
});