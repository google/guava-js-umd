describe("General Guava utils testing", function(){
	it("isNull", function(){
		expect(GuavaJS.isNull(null)).toBe(true);
		expect(GuavaJS.isNull("")).toBe(false);
		expect(GuavaJS.isNull(0)).toBe(false);
	});
	
	it("isArray", function(){
		expect(GuavaJS.isArray("abc")).toBe(false);
		expect(GuavaJS.isArray([])).toBe(true);
	});
	
	it("isString", function(){
		expect(GuavaJS.isString({})).toBe(false);
		expect(GuavaJS.isString([])).toBe(false);
		expect(GuavaJS.isString(function(){})).toBe(false);
		expect(GuavaJS.isString("abc")).toBe(true);
	});
});