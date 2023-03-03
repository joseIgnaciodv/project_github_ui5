/* global QUnit */
QUnit.config.autostart = false;

sap.ui.getCore().attachInit(function () {
	"use strict";

	sap.ui.require([
		"project_github_ui5/test/unit/AllTests"
	], function () {
		QUnit.start();
	});
});
