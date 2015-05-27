'use strict';

module.exports = {
	chrome: {
		environment: ['local', 'sauce'],
		driver: {
			downloadURL: 'http://chromedriver.storage.googleapis.com',
			config: {
				'browserName': 'chrome'
			}
		}
	},
	phantomjs: {
		environment: ['local'], // PhantomJS is not supported on SauceLabs
		driver: {
			downloadURL: 'http://selenium-release.storage.googleapis.com',
			config: {
				'browserName': 'phantomjs'
			}
		}
	},
	firefox: {
		environment: ['local', 'sauce'],
		driver: {
			downloadURL: 'http://selenium-release.storage.googleapis.com',
			config: {
				'browserName': 'firefox',
				'version': '26.0',
				'screen-resolution': '1024x768'
			}
		}
	},
	explorer: {
		environment: ['local', 'sauce'],
		driver: {
			downloadURL: 'http://selenium-release.storage.googleapis.com',
			config: {
				'browserName': 'internet explorer'
			}
		}
	}
};
