describe("Logging", function(){
	describe("Logging Levels", function(){
		it("Checks levels values", function(){
			expect(GuavaJS.LoggingLevels).not.toBeNull();
			
			var Levels = GuavaJS.LoggingLevels;
			
			expect(Levels.DEBUG).toBeGreaterThan(Levels.TRACE);
			expect(Levels.INFO).toBeGreaterThan(Levels.DEBUG);
			expect(Levels.WARN).toBeGreaterThan(Levels.INFO);
			expect(Levels.ERROR).toBeGreaterThan(Levels.WARN);
			expect(Levels.NONE).toBeGreaterThan(Levels.ERROR);
		});
	});
	
	describe("General Logging against Console", function(){
		it("Create Logger and log", function(){
			var logger = GuavaJS.LoggingFactory.getLogger("TestLoggerConsole");
			
			expect(logger).not.toBeNull();
			
			logger.setLevel(GuavaJS.LoggingLevels.DEBUG);
			logger.debug("Test Statement");
		});
	});
	
	describe("General Logging against Spy", function(){
		it("Create Logger and log", function(){
			var SpyLoggerImp = (function(){
				return {
					log: function(){},
					startGroup: function(){},
					endGroup: function(){},
					table: function(){}
				}
			})();
			
			spyOn(SpyLoggerImp, "log");
			spyOn(SpyLoggerImp, "startGroup");
			spyOn(SpyLoggerImp, "endGroup");
			spyOn(SpyLoggerImp, "table");
			
			GuavaJS.LoggingFactory.setLoggerImplementation(SpyLoggerImp);
			var logger = GuavaJS.LoggingFactory.getLogger("TestLoggerSpy");
			
			expect(logger).not.toBeNull();
			
			logger.setLevel(GuavaJS.LoggingLevels.DEBUG);
			logger.startGroup("Test");
			logger.debug("Test Statement");
			logger.endGroup();
			logger.table(["test"]);
			
			expect(SpyLoggerImp.log).toHaveBeenCalledWith(GuavaJS.LoggingLevels.DEBUG, "TestLoggerSpy", "Test Statement");
			expect(SpyLoggerImp.startGroup).toHaveBeenCalledWith("TestLoggerSpy", "Test");
			expect(SpyLoggerImp.endGroup).toHaveBeenCalled();
			expect(SpyLoggerImp.table).toHaveBeenCalled();
		});
	});
});