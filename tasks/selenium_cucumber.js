/*
 * grunt-selenium-standalone
 * https://github.com/zs-zs/grunt-selenium-standalone
 *
 * Copyright (c) 2015 zs-zs
 * Licensed under the MIT license.
 */

'use strict';
var _ = require('lodash');

module.exports = function(grunt) {

	var automatedBrowsers = grunt.config.get('selenium_cucumber.targetBrowsers');

	var testDrivers = {};
	Object.keys(automatedBrowsers).forEach(function(browserName) {
		var automationConfig = automatedBrowsers[browserName];
		testDrivers[browserName] = {
			version: automationConfig.version,
			arch: process.arch,
			downloadURL: automationConfig.downloadURL
		};
	});

	var cucumberOptionsConfig = grunt.config.get('selenium_cucumber.cucumberjs.options');
	var cucumberFeaturesConfig = grunt.config.get('selenium_cucumber.cucumberjs.features');

	var seleniumVersionConfig = grunt.config.get('selenium_cucumber.seleniumVersion');
	var seleniumDownloadUrlConfig = grunt.config.get('selenium_cucumber.seleniumDownloadURL');

	var gruntConfig = {
		env: {}, // dynamically filled
		cucumberjs: {
			options: _.defaults(cucumberOptionsConfig, {
				format: 'html',
				output: 'my_report.html',
				theme: 'bootstrap',
				debug: false
			}),
			features: _.isEmpty(cucumberFeaturesConfig) ? ['tests/specs/features'] : cucumberFeaturesConfig
		},
		'selenium_standalone': {
			testConfig: {
				seleniumVersion: seleniumVersionConfig || '2.45.0',
				seleniumDownloadURL: seleniumDownloadUrlConfig || 'http://selenium-release.storage.googleapis.com',
				drivers: testDrivers
			}
		},
		concurrent: {
			'browserAutomation-sauce-all': [] // dynamically filled
		}
	};

	_.forIn(automatedBrowsers, function(automatedBrowser, browserKey) {
		var driver = automatedBrowser.driver;

		if (_.contains(automatedBrowser.environment, 'sauce')) {
			gruntConfig.env['browserAutomation-sauce-' + browserKey] = {
				BROWSER_AUTOMATION: JSON.stringify({
					isCloudAutomation: true,
					sauceLabs: {}, //TODO: sauceLabsConfig,
					driver: driver
				})
			};
		}

		if (_.contains(automatedBrowser.environment, 'local')) {
			gruntConfig.env['browserAutomation-local-' + browserKey] = {
				BROWSER_AUTOMATION: JSON.stringify({
					isCloudAutomation: false,
					driver: driver
				})
			};

			gruntConfig.concurrent['browserAutomation-sauce-all'].push('browserAutomation-sauce-' + browserKey);
		}
	});

	grunt.config.merge(gruntConfig);

	grunt.loadNpmTasks('grunt-env');
	grunt.loadNpmTasks('grunt-concurrent');
	grunt.loadNpmTasks('grunt-cucumberjs');
	grunt.loadNpmTasks('grunt-selenium-standalone');

	_.forIn(automatedBrowsers, function(browserInfo, browserKey) {
		var taskName = 'browserAutomation-sauce-' + browserKey;
		grunt.registerTask(taskName, ['env:' + taskName, 'cucumberjs:features']);

		taskName = 'browserAutomation-local-' + browserKey;
		grunt.registerTask(taskName,
				[
					'env:' + taskName,
					'selenium_standalone:testConfig:install',
					'selenium_standalone:testConfig:start',
					'cucumberjs:features',
					'selenium_standalone:testConfig:stop'
				]);
	});
};
