'use strict';

var wd = require('wd');
var _ = require('lodash');

var createRemoteClient = function createClient(automationConfig) {
	if(automationConfig.isCloudAutomation) {
		var username = automationConfig.sauceLabs.username;
		var accessKey = automationConfig.sauceLabs.accessKey;
		return wd.promiseChainRemote('ondemand.saucelabs.com', 80, username, accessKey);
	}

	return wd.promiseChainRemote('localhost', process.env.LOCAL_SELENIUM_PORT || 4444);
};

var create = function create(scenarioName) {
	var automationConfig = JSON.parse(process.env.BROWSER_AUTOMATION);
	var driverConfig = automationConfig.driver.config;

	var ab = _.cloneDeep(driverConfig);
	ab.name = scenarioName;

	var client = createRemoteClient(automationConfig).init(ab);

	if(driverConfig.browserName === 'phantomjs') {
		client.setWindowSize(1000, 1000);  // PhantomJS
	}

	return client;
};

module.exports.create = create;
