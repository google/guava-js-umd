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
//		concat : {
//			options : {
//				separator : '\n',
//				banner : "/**\n"
//						+ "* GuavaJS\n"
//						+ '* Date : <%= grunt.template.today("dd-mm-yyyy h:MM:ss TT") %> ' + "\n"
//						+ "*/\n"
//			},
//			logging: {
//				src: logginSrc,
//				dest: 'stage/GuavaJS.logging.only.js'
//			},
//			strings: {
//				src: stringSrc,
//				dest: 'stage/GuavaJS.strings.only.js'
//			},
//			stringsCharmatcher: {
//				src: stringCharMatcherSrc,
//				dest: 'stage/GuavaJS.strings.charmatcher.only.js'
//			},
//			stringsSplitter: {
//				src: stringSplitterSrc,
//				dest: 'stage/GuavaJS.strings.splitter.only.js'
//			},
//			stringsJoiner: {
//				src: stringJoinerSrc,
//				dest: 'stage/GuavaJS.strings.joiner.only.js'
//			},
//			collectIterables: {
//				src: collectionIterableSrc,
//				dest: 'stage/GuavaJS.collect.iterables.only.js'
//			},
//			numbers: {
//				src: numbersSrc,
//				dest: 'stage/GuavaJS.numbers.only.js'
//			},
//			booleans: {
//				src: booleansSrc,
//				dest: 'stage/GuavaJS.booleans.only.js'
//			},
//			futures: {
//				src: futuresSrc,
//				dest: 'stage/GuavaJS.futures.only.js'
//			}
//		},
//		uglify : {
//			sections : {
//				files : {
//					'build/GuavaJS.logging.only.min.js' : 'stage/GuavaJS.logging.only.js',
//					'build/GuavaJS.strings.only.min.js' : 'stage/GuavaJS.strings.only.js',
//					'build/GuavaJS.strings.charmatcher.only.min.js' : 'stage/GuavaJS.strings.charmatcher.only.js',
//					'build/GuavaJS.strings.splitter.only.min.js' : 'stage/GuavaJS.strings.splitter.only.js',
//					'build/GuavaJS.strings.joiner.only.min.js' : 'stage/GuavaJS.strings.joiner.only.js',
//					'build/GuavaJS.collect.iterables.only.min.js' : 'stage/GuavaJS.collect.iterables.only.js',
//					'build/GuavaJS.numbers.only.min.js' : 'stage/GuavaJS.numbers.only.js',
//					'build/GuavaJS.booleans.only.min.js' : 'stage/GuavaJS.booleans.only.js',
//					'build/GuavaJS.futures.only.min.js' : 'stage/GuavaJS.futures.only.js'
//				}
//			}
//		}
	});

	grunt.loadNpmTasks('grunt-contrib-jasmine');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-uglify');

	grunt.registerTask('default', ['jasmine', 'concat', 'uglify']);
	grunt.registerTask('build', ['jasmine', 'concat', 'uglify']);
	grunt.registerTask('test', ['jasmine']);
}
