module.exports = function(grunt) {
	var srcDir = "src/main/javascript/";
	var testDir = "src/test/javascript/";
	
	var logginSrc = [srcDir+"GuavaJS.js", srcDir+"GuavaJS.logging.js"];
	var stringSrc = [srcDir+"GuavaJS.js", srcDir+"GuavaJS.strings.js"];
	var stringCharMatcherSrc = [srcDir+"GuavaJS.js", srcDir+"GuavaJS.strings.js", srcDir+"GuavaJS.strings.charmatcher.js"];
	var stringSplitterSrc = [srcDir+"GuavaJS.js", srcDir+"GuavaJS.strings.js", srcDir+"GuavaJS.strings.charmatcher.js", srcDir+"GuavaJS.strings.splitter.js"];
	var stringJoinerSrc = [srcDir+"GuavaJS.js", srcDir+"GuavaJS.strings.js", srcDir+"GuavaJS.strings.joiner.js"];
	var collectionIterableSrc = [srcDir+"GuavaJS.js", srcDir+"GuavaJS.collect.js", srcDir+"GuavaJS.collect.iterables.js"];
	var collectionMultimapSrc = [srcDir+"GuavaJS.js", srcDir+"GuavaJS.collect.js", srcDir+"GuavaJS.collect.iterables.js", srcDir+"GuavaJS.collect.multimap.js"];
	var numbersSrc = [srcDir+"GuavaJS.js", srcDir+"GuavaJS.numbers.js"];
	var booleansSrc = [srcDir+"GuavaJS.js", srcDir+"GuavaJS.booleans.js"];
	var futuresSrc = [srcDir+"GuavaJS.js", srcDir+"GuavaJS.collect.js", srcDir+"GuavaJS.collect.iterables.js", srcDir+"GuavaJS.concurrent.js", srcDir+"GuavaJS.concurrent.futures.js"];
	
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		jasmine: {
			core: {
				src: [srcDir+"GuavaJS.js"],
				options: {
					specs: [testDir+"GuavaJS.spec.js"]
				}
			},
			logging: {
				src: logginSrc,
				options: {
					specs: [testDir+"GuavaJS.logging.spec.js"]
				}
			},
			strings: {
				src: stringSrc,
				options: {
					specs: [testDir+"GuavaJS.strings.spec.js"]
				}
			},
			stringsCharmatcher: {
				src: stringCharMatcherSrc,
				options: {
					specs: [testDir+"GuavaJS.strings.charmatcher.spec.js"]
				}
			},
			stringsSplitter: {
				src: stringSplitterSrc,
				options: {
					specs: [testDir+"GuavaJS.strings.splitter.spec.js"]
				}
			},
			stringsJoiner: {
				src: stringJoinerSrc,
				options: {
					specs: [testDir+"GuavaJS.strings.joiner.spec.js"]
				}
			},
			collectIterables: {
				src: collectionIterableSrc,
				options: {
					specs: [testDir+"GuavaJS.collect.iterables.spec.js"]
				}
			},
			collectMultimap: {
				src: collectionMultimapSrc,
				options: {
					specs: [testDir+"GuavaJS.collect.multimap.spec.js"]
				}
			},
			numbers: {
				src: numbersSrc,
				options: {
					specs: [testDir+"GuavaJS.numbers.spec.js"]
				}
			},
			futures: {
				src: futuresSrc,
				options: {
					specs: [testDir+"GuavaJS.concurrent.futures.spec.js"]
				}
			}
		},
		uglify : {
			core_files : {
				files : [{
					expand: true,
					src: 'src/main/javascript/*.js',
					dest: 'build',
					ext: '.min.js',
					extDot: 'last',
					flatten: true
				}]
			}
		}
	});

	grunt.loadNpmTasks('grunt-contrib-jasmine');
	grunt.loadNpmTasks('grunt-contrib-uglify');

	grunt.registerTask('default', ['jasmine', 'uglify']);
	grunt.registerTask('build', ['jasmine', 'uglify']);
	grunt.registerTask('build-notest', ['uglify']);
	grunt.registerTask('test', ['jasmine']);
}
