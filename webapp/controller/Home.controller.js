sap.ui.define([
	"sap/ui/core/mvc/Controller"

], function (Controller) {
	"use strict";
	return Controller.extend("sap.ui.task.table.controller.Home", {

		onNavToTable: function(oEvent) {
      var oRouter = sap.ui.core.UIComponent.getRouterFor(this)
			oRouter.navTo("productlist");
		}
	});
});