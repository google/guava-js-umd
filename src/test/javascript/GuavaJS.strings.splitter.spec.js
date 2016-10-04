describe("String Splitter", function(){
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