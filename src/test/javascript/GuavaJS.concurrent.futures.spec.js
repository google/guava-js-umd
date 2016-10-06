describe("Futures", function(){
	var Futures = GuavaJS.Concurrent.Futures;
	
	describe("Future", function(){
		it("Pre & Post finish callbacks", function(){
			var future = Futures.Future();
			
			var callbacks = {
				pre: function(){},
				post: function(){}
			}
			
			spyOn(callbacks, 'pre');
			spyOn(callbacks, 'post');
			
			future.addCallback(callbacks.pre);
			
			expect(future.isDone()).toBe(false);
			expect(future.isCancelled()).toBe(false);
			
			future('a', 'b');
			
			expect(future.isDone()).toBe(true);
			expect(future.isCancelled()).toBe(false);
			
			future.addCallback(callbacks.post);
			
			expect(callbacks.pre).toHaveBeenCalledWith('a', 'b');
			expect(callbacks.post).toHaveBeenCalledWith('a', 'b');
		});
	});
});