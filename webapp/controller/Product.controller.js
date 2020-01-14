sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/core/routing/History",
	"sap/ui/task/table/util/formatter"
], function (Controller, History, formatter) {
	"use strict";

	return Controller.extend("sap.ui.task.table.controller.Product", {

		formatter: formatter,

    onInit: function() {
    	var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			oRouter.getRoute("product").attachMatched(this._onObjectMatched, this);

			var oViewModel = new sap.ui.model.json.JSONModel({
				currency: "EUR"
			});
			this.getView().setModel(oViewModel, "view");
    },
    
    _onObjectMatched: function(oEvent) {
			var sId = oEvent.getParameter("arguments").productId;
			var oModel = this.getOwnerComponent().getModel("prods");
			var oView = this.getView();
			var oRouter = sap.ui.core.UIComponent.getRouterFor(this)
			oView.unbindElement();
			oModel.read("/Products(" + sId + ")", {
				success: function(oData) {
					oView.setModel(oModel);
					oView.bindElement("/Products(" + sId + ")");
				},
				error: function() {
					oRouter.getTargets().display("notFound");
				}
			});
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

		getContentDensityClass: function() {
			if (!this._sContentDensityClass) {
				if (!sap.ui.Device.support.touch) {
					this._sContentDensityClass = "sapUiSizeCompact";
				} else {
					this._sContentDensityClass = "sapUiSizeCozy";
				}
			}
			return this._sContentDensityClass;
		}

	});
});
