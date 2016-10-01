describe("Strings tests", function(){
	var Strings = GuavaJS.Strings;
	
	it("isNullOrEmpty", function(){
		expect(Strings.isNullOrEmpty("")).toBe(true);
		expect(Strings.isNullOrEmpty(null)).toBe(true);
		expect(Strings.isNullOrEmpty("a")).toBe(false);
		expect(Strings.isNullOrEmpty("abc")).toBe(false);
	});
	
	it("nullToEmpty", function(){
		expect(Strings.nullToEmpty("")).toBe("");
		expect(Strings.nullToEmpty(null)).toBe("");
		expect(Strings.nullToEmpty("a")).toBe("a");
		expect(Strings.nullToEmpty("abc")).toBe("abc");
	});
	
	it("nullTo", function(){
		expect(Strings.nullTo("", "123")).toBe("");
		expect(Strings.nullTo(null, "123")).toBe("123");
		expect(Strings.nullTo("a", "123")).toBe("a");
		expect(Strings.nullTo("abc", "123")).toBe("abc");
	});
	
	it("contains", function(){
		expect(Strings.contains(" \t\n", " ")).toBe(true);
		expect(Strings.contains(" \t\n", "\t")).toBe(true);
		expect(Strings.contains(" \t\n", "\n")).toBe(true);
		expect(Strings.contains(" \t\n", "a")).toBe(false);
	});
});