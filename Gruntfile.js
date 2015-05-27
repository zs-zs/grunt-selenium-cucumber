/*
 * grunt-selenium-cucumber
 * https://github.com/zs-zs/grunt-selenium-cucumber
 *
 * Copyright (c) 2015 zs-zs
 * Licensed under the MIT license.
 */

'use strict';

var automatedBrowsers = require('./test/automatedBrowsers');

module.exports = function(grunt) {

	grunt.initConfig({
		eslint: {
			target: ['*.js']
		},
		// Configuration to run the tests
		'selenium_cucumber': {
            seleniumVersion: '2.45.0',
            seleniumDownloadURL: 'http://selenium-release.storage.googleapis.com',
            targetBrowsers: automatedBrowsers,
            cucumberjs: {
                options: {
                    format: 'html',
                    output: 'my_report.html',
                    theme: 'bootstrap',
                    debug: false
                },
                features: ['test/specs/features']
            }
		}
	});

	grunt.loadTasks('tasks');
	grunt.loadNpmTasks('grunt-eslint');
	grunt.registerTask('test', ['eslint', 'browserAutomation-local-chrome']);
};
