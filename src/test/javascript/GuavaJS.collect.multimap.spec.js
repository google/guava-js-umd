describe("MultiMap", function(){
	var MultiMap = GuavaJS.Collect.Multimap;
	
	describe("ListMultiMap", function(){
		it("Get/Put/Remove", function(){
			var map = MultiMap.ListMultimap();
			
			//Test Put/Get
			map.put('test1', 'value1');
			map.put('test1', 'value2');
			map.put('test2', 'value1');
			
			var t1 = map.get('test1');
			var t2 = map.get('test2');
			
			expect(map.size()).toBe(2);
			expect(t1.length).toBe(2);
			expect(t2.length).toBe(1);
			expect(t1[0] == 'value1' || t1[0] == 'value2').toBe(true);
			expect(t1[1] == 'value1' || t1[1] == 'value2').toBe(true);
			expect(t2[0]).toBe('value1');
			
			//Test Remove
			expect(map.remove('test1', 'value2')).toBe(true);
			t1 = map.get('test1');
			expect(t1.length).toBe(1);
			expect(t1[0]).toBe('value1');
			
			//Test RemoveAll
			expect(map.removeAll('test2')).toBe(true);
			t2 = map.get('test2');
			expect(t2.length).toBe(0);
			
			//Test Clear
			map.clear();
			expect(map.size()).toBe(0);
		});
	});
	
	describe("FlatListMultimap", function(){
		it("Get/Put/Remove", function(){
			var map = MultiMap.FlatListMultimap();
			
			//Test Put/Get
			map.put('test1', 'value1');
			map.put('test1', 'value2');
			map.put('test2', 'value1');
			
			var t1 = map.get('test1');
			var t2 = map.get('test2');
			
			expect(map.size()).toBe(2);
			expect(t1.length).toBe(2);
			expect(t1[0] == 'value1' || t1[0] == 'value2').toBe(true);
			expect(t1[1] == 'value1' || t1[1] == 'value2').toBe(true);
			expect(t2).toBe('value1');
			
			//Test Remove
			expect(map.remove('test1', 'value2')).toBe(true);
			t1 = map.get('test1');
			expect(t1).toBe('value1');
			
			//Test RemoveAll
			expect(map.removeAll('test2')).toBe(true);
			t2 = map.get('test2');
			expect(t2).toBeNull();
			
			//Test Clear
			map.clear();
			expect(map.size()).toBe(0);
		});
	});
});