sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/core/routing/History"

], function (Controller, History) {
	"use strict";
	return Controller.extend("sap.ui.task.table.controller.NotFound", {
		onInit: function () {
			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			var oTarget = oRouter.getTarget("notFound");
			oTarget.attachDisplay(function (oEvent) {
				this._oData = oEvent.getParameter("data");
			}, this);
		},

		onNavBack: function() {
			var oHistory = History.getInstance();
			var sPreviousHash = oHistory.getPreviousHash();

			if (sPreviousHash !== undefined) {
				window.history.go(-1);
			} else {
				var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
				oRouter.navTo("productlist", {}, true);
			}
		},
	});
});