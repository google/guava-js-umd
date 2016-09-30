module.exports = function(grunt) {
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
	});

	grunt.loadNpmTasks('grunt-contrib-jasmine');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-uglify');

	grunt.registerTask('default', ['jasmine', 'concat', 'uglify']);
	grunt.registerTask('build', ['jasmine', 'concat', 'uglify']);
	grunt.registerTask('test', ['jasmine']);
}
