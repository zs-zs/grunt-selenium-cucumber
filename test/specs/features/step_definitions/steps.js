/*eslint no-undef:0*/
/*eslint new-cap:0*/
'use strict';

var visitorFactory = require('../support/visitorFactory');

var pairingSteps = function () {

	Given(/^I visit the site '([^']*)'$/, function(url) {
		this.visitor = visitorFactory.create(this.scenarioName).get(url);
		return this.visitor;
	}, {timeout: 20000});

	Then(/^the site should appear$/, function() {
		return this.visitor.waitForElementById('searchform', 30000);
	}, {timeout: 30000});
};
module.exports = pairingSteps;
