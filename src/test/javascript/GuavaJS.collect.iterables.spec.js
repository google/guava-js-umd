describe("Iterables", function(){
	var Iterables = GuavaJS.Iterables;
	
	describe("size", function(){
		it("Arrays", function(){
			expect(Iterables.size(null)).toEqual(0);
			expect(Iterables.size([])).toEqual(0);
			expect(Iterables.size([1,2,3])).toEqual(3);
			expect(Iterables.size(['a','b','c'])).toEqual(3);
		});
		it("Objects", function(){
			expect(Iterables.size(null)).toEqual(0);
			expect(Iterables.size({})).toEqual(0);
			expect(Iterables.size({1:2,2:3,3:4})).toEqual(3);
			expect(Iterables.size({'a':1,'b':2,'c':3})).toEqual(3);
			expect(Iterables.size({'a':1,'b':[1,2,3],'c':3})).toEqual(3);
		});
	});
	
	describe("isNullOrEmpty", function(){
		it("Arrays", function(){
			expect(Iterables.isNullOrEmpty(null)).toBe(true);
			expect(Iterables.isNullOrEmpty([])).toBe(true);
			expect(Iterables.isNullOrEmpty([1,2,3])).toBe(false);
			expect(Iterables.isNullOrEmpty(['a','b','c'])).toBe(false);
		});
		it("Objects", function(){
			expect(Iterables.isNullOrEmpty(null)).toBe(true);
			expect(Iterables.isNullOrEmpty({})).toBe(true);
			expect(Iterables.isNullOrEmpty({1:2,2:3,3:4})).toBe(false);
			expect(Iterables.isNullOrEmpty({'a':1,'b':2,'c':3})).toBe(false);
			expect(Iterables.isNullOrEmpty({'a':1,'b':[1,2,3],'c':3})).toBe(false);
		});
	});
	
	describe("getFirst", function(){
		it("Arrays", function(){
			expect(Iterables.getFirst([])).toBe(null);
			expect(Iterables.getFirst([], 'test')).toBe('test');
			expect(Iterables.getFirst(['first','last'], 'test')).toBe('first');
		});
		it("Objects", function(){
			expect(Iterables.getFirst({})).toBe(null);
			expect(Iterables.getFirst({}, 'test')).toBe('test');
			expect(Iterables.getFirst({'first':'a','last':'b'}, 'test')).toBe('a');
		});
	});
	
	describe("getLast", function(){
		it("Arrays", function(){
			expect(Iterables.getLast([])).toBe(null);
			expect(Iterables.getLast([], 'test')).toBe('test');
			expect(Iterables.getLast(['first','last'], 'test')).toBe('last');
		});
		it("Objects", function(){
			expect(Iterables.getLast({})).toBe(null);
			expect(Iterables.getLast({}, 'test')).toBe('test');
			expect(Iterables.getLast({'first':'a','last':'b'}, 'test')).toBe('b');
		});
	});
	
	describe("Iterate", function(){
		
		it("Arrays", function(){
			var Call = {back: function(value, key){}}
			spyOn(Call, 'back');
			
			Iterables.iterate(['a','b'], Call.back);
			expect(Call.back).toHaveBeenCalledWith('a', 0);
			expect(Call.back).toHaveBeenCalledWith('b', 1);
		});
		
		it("Objects", function(){
			var Call = {back: function(value, key){}}
			spyOn(Call, 'back');
			
			Iterables.iterate({'a':'z','b':'y'}, Call.back);
			expect(Call.back).toHaveBeenCalledWith('z', 'a');
			expect(Call.back).toHaveBeenCalledWith('y', 'b');
		});
		
		it("Single", function(){
			var Call = {back: function(value, key){}}
			spyOn(Call, 'back');
			
			Iterables.iterate('a', Call.back);
			expect(Call.back).toHaveBeenCalledWith('a', null);
		})
	});
});