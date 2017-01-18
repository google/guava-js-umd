describe("String Joiner", function(){
	var Joiner = GuavaJS.Strings.Joiner;
	
	describe("Single Join", function(){
		it("Basic Joiner", function(){
			var joiner = Joiner.on('.');
			var string = joiner.join(['a', 'b', '', 'c', null]);
			
			expect(string).toBe('a.b..c.null');
		})
		
		it("NullToEmpty Joiner", function(){
			var joiner = Joiner.on('.').nullsToEmpty();
			var string = joiner.join(['a', 'b', '', 'c', null]);
			
			expect(string).toBe('a.b..c.');
		})
		
		it("SkipNulls Joiner", function(){
			var joiner = Joiner.on('.').skipNulls();
			var string = joiner.join(['a', 'b', '', 'c', null]);
			
			expect(string).toBe('a.b..c');
		})
	});
	
	describe("Map Join", function(){
		it("Basic Joiner", function(){
			var joiner = Joiner.on('&').withKeyValueSeparator('=');
			var string = joiner.join({'key1':['a', 'b', '', 'c', null]});
			
			expect(string).toBe('key1=a&key1=b&key1=&key1=c&key1=null');
		})
		
		it("NullToEmpty Joiner", function(){
			var joiner = Joiner.on('&').nullsToEmpty().withKeyValueSeparator('=');
			var string = joiner.join({'key1':['a', 'b', '', 'c', null]});
			
			expect(string).toBe('key1=a&key1=b&key1=&key1=c&key1=');
		})
		
		it("SkipNulls Joiner", function(){
			var joiner = Joiner.on('&').skipNulls().withKeyValueSeparator('=');
			var string = joiner.join({'key1':['a', 'b', '', 'c', null]});
			
			expect(string).toBe('key1=a&key1=b&key1=&key1=c');
		})
	});
});