describe("Numbers", function(){
	var Numbers = GuavaJS.Numbers;
	
	describe("nullTo", function(){
		it("String", function(){
			var a = Numbers.nullTo('1', 0);
			
			expect(a).not.toBeNull();
			expect(isNaN(a)).toBe(false);
			expect(a).toEqual(1);
			
			var b = Numbers.nullTo('b', 0);
			
			expect(b).not.toBeNull();
			expect(isNaN(b)).toBe(false);
			expect(b).toEqual(0);
		});
		
		it("Null", function(){
			var a = Numbers.nullTo(null, 0);
			
			expect(a).not.toBeNull();
			expect(isNaN(a)).toBe(false);
			expect(a).toEqual(0);
		});
		
		it("Int", function(){
			var a = Numbers.nullTo(1, 0);
			
			expect(a).not.toBeNull();
			expect(isNaN(a)).toBe(false);
			expect(a).toEqual(1);
		});
	});
});