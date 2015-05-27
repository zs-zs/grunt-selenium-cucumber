/*eslint no-undef:0*/
/*eslint new-cap:0*/
'use strict';

var sweetener = require('cucumber-sweetener');

var eventHooks = function () {
	sweetener.sweeten(this, {timeout: 1000});

	// this.BeforeScenario(function (event, callback) {
	// 	var scenario = event.getPayloadItem('scenario');
	// 	this.scenarioName = scenario.getName();
	//
	// 	callback();
	// });
};

module.exports = eventHooks;
