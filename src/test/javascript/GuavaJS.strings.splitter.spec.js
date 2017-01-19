describe("String Splitter", function(){
	describe("Single Splitter", function(){
		it("Basic Split", function(){
			var Splitter = GuavaJS.Strings.Splitter.on('.');
			var parts = Splitter.split('test.test ..test.');
			
			expect(parts).not.toBeNull();
			expect(parts.length).toEqual(5);
			expect(parts[0]).toBe('test');
			expect(parts[1]).toBe('test ');
			expect(parts[2]).toBe('');
			expect(parts[3]).toBe('test');
			expect(parts[4]).toBe('');
		});
		
		it("Trim Split", function(){
			var Splitter = GuavaJS.Strings.Splitter.on('.').trimResults();
			var parts = Splitter.split('test.test . .test');
			
			expect(parts).not.toBeNull();
			expect(parts.length).toEqual(4);
			expect(parts[0]).toBe('test');
			expect(parts[1]).toBe('test');
			expect(parts[2]).toBe('');
			expect(parts[3]).toBe('test');
		});
		
		it("Omit Empty Split", function(){
			var Splitter = GuavaJS.Strings.Splitter.on('.').omitEmptyStrings();
			var parts = Splitter.split('test.test ..test.');
			
			expect(parts).not.toBeNull();
			expect(parts.length).toEqual(3);
			expect(parts[0]).toBe('test');
			expect(parts[1]).toBe('test ');
			expect(parts[2]).toBe('test');
		});
		
		it("Trim and Omit Empty Split", function(){
			var Splitter = GuavaJS.Strings.Splitter.on('.').trimResults().omitEmptyStrings();
			var parts = Splitter.split('test.test . .test');
			
			expect(parts).not.toBeNull();
			expect(parts.length).toEqual(3);
			expect(parts[0]).toBe('test');
			expect(parts[1]).toBe('test');
			expect(parts[2]).toBe('test');
		});
	});
	
	describe("Map Splitter", function(){
		it("Basic Split", function(){
			var Splitter = GuavaJS.Strings.Splitter.on('&').withKeyValueSeparator('=');
			var parts = Splitter.split('a=test&b=test &&c=test&');
			
			expect(parts).not.toBeNull();
			expect(parts.size()).toEqual(3);
			expect(parts.get('a')).toBe('test');
			expect(parts.get('b')).toBe('test ');
			expect(parts.get('c')).toBe('test');
		});
		
		it("Trim Split", function(){
			var Splitter = GuavaJS.Strings.Splitter.on('&').trimResults().withKeyValueSeparator('=');
			var parts = Splitter.split('a=test&b=test & &c=test&d= &e=');
			
			expect(parts).not.toBeNull();
			expect(parts.size()).toEqual(5);
			expect(parts.get('a')).toBe('test');
			expect(parts.get('b')).toBe('test');
			expect(parts.get('c')).toBe('test');
			expect(parts.get('d')).toBe('');
			expect(parts.get('e')).toBe('');
		});
		
		it("Omit Empty Split", function(){
			var Splitter = GuavaJS.Strings.Splitter.on('&').omitEmptyStrings().withKeyValueSeparator('=');
			var parts = Splitter.split('a=test&b=test & &c=test&d= &e=');
			
			expect(parts).not.toBeNull();
			expect(parts.size()).toEqual(4);
			expect(parts.get('a')).toBe('test');
			expect(parts.get('b')).toBe('test ');
			expect(parts.get('c')).toBe('test');
			expect(parts.get('d')).toBe(' ');
		});
		
		it("Trim and Omit Empty Split", function(){
			var Splitter = GuavaJS.Strings.Splitter.on('&').trimResults().omitEmptyStrings().withKeyValueSeparator('=');
			var parts = Splitter.split('a=test&b=test & &c=test&d= &e=');
			
			expect(parts).not.toBeNull();
			expect(parts.size()).toEqual(3);
			expect(parts.get('a')).toBe('test');
			expect(parts.get('b')).toBe('test');
			expect(parts.get('c')).toBe('test');
		});
	});
});