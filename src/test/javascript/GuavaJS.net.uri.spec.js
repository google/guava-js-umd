describe("URI", function(){
	var Uri = GuavaJS.Net.Uri;
	describe("Params", function(){
		it("fromString", function(){
			var qs = "var-Env=All&var-Datacenter=All&var-InstanceID=i-0a5854bc&var-App=All&from=now-30m&to=now&editorTab=Metrics";
			var params = Uri.Params.fromString(qs);
			
			expect(params).not.toBeNull(null);
			expect(params.get('var-Env')).toEqual("All");
			expect(params.get('var-Datacenter')).toEqual("All");
			expect(params.get('var-InstanceID')).toEqual("i-0a5854bc");
			expect(params.get('var-App')).toEqual("All");
			expect(params.get('from')).toEqual("now-30m");
			expect(params.get('to')).toEqual("now");
			expect(params.get('editorTab')).toEqual("Metrics");
		});
	});
});