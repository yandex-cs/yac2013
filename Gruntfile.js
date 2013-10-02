var fs = require('fs'),
	pkg = require('./package.json'),
	gruntConfig = {
		pkg: pkg,
		csso: {
			dist: {
				options: {
					restructure: true
				},
				files: {
					'assets/css/main.min.css': ['assets/css/bootstrap.css', 'assets/css/main.css']
				}
			}
		}
	};

module.exports = function(grunt) {
	// Инициализируем конфиг
	grunt.initConfig(gruntConfig);

	// Подключаем таски
	grunt.loadNpmTasks('grunt-csso');

	// Регистрируем таски
	grunt.registerTask('default', 'csso');
};
