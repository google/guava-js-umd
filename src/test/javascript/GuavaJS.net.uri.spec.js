describe("URI", function(){
	var Uri = GuavaJS.Net.Uri;
	describe("QueryString", function(){
		it("fromString", function(){
			var qs = "var-Env=All&var-Datacenter=All&var-InstanceID=i-0a5854bc&var-App=All&from=now-30m&to=now&editorTab=Metrics";
			var params = Uri.QueryString.fromString(qs);
			
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
	
	describe("URI", function(){
		describe("Basic", function(){
			it("HostOnly", function(){
				var uri = "example.com";
				var u = Uri.create(uri);
				
				expect(u).not.toBeNull();
				expect(u.host).toEqual("example.com");
				expect(u.toString()).toEqual(uri);
			});
			it("Scheme://Host", function(){
				var uri = "http://example.com";
				var u = Uri.create(uri);
				
				expect(u).not.toBeNull();
				expect(u.host).toEqual("example.com");
				expect(u.scheme).toEqual("http");
				expect(u.toString()).toEqual(uri);
			});
			it("Scheme://Host/Path", function(){
				var uri = "http://example.com/something/somethingelse";
				var u = Uri.create(uri);
				
				expect(u).not.toBeNull();
				expect(u.host).toEqual("example.com");
				expect(u.scheme).toEqual("http");
				expect(u.path).toEqual("something/somethingelse");
				expect(u.toString()).toEqual(uri);
			});
		});
		describe("With QueryString", function(){
			it("HostOnly", function(){
				var uri = "example.com?test=value1";
				var u = Uri.create(uri);
				
				expect(u).not.toBeNull();
				expect(u.host).toEqual("example.com");
				expect(u.queryString.get('test')).toEqual("value1");
				expect(u.toString()).toEqual(uri);
			});
			it("Scheme://Host", function(){
				var uri = "http://example.com?test=value1";
				var u = Uri.create(uri);
				
				expect(u).not.toBeNull();
				expect(u.host).toEqual("example.com");
				expect(u.scheme).toEqual("http");
				expect(u.queryString.get('test')).toEqual("value1");
				expect(u.toString()).toEqual(uri);
			});
			it("Scheme://Host/Path", function(){
				var uri = "http://example.com/something/somethingelse?test=value1";
				var u = Uri.create(uri);
				
				expect(u).not.toBeNull();
				expect(u.host).toEqual("example.com");
				expect(u.scheme).toEqual("http");
				expect(u.path).toEqual("something/somethingelse");
				expect(u.queryString.get('test')).toEqual("value1");
				expect(u.toString()).toEqual(uri);
			});
		});
		
	});
});