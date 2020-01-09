sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/core/routing/History",
	"sap/ui/task/table/util/formatter"
], function (Controller, History, formatter) {
	"use strict";

	return Controller.extend("sap.ui.task.table.controller.Product", {

		formatter: formatter,

    onInit: function() {
			var oModel = this.getOwnerComponent().getModel("prods");
			var oView = this.getView();
			oModel.read("/Products", {
				success: function(oData) {
					oView.setModel(oModel);
				}
			});

    	var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			oRouter.getRoute("product").attachMatched(this._onObjectMatched, this);

			var oViewModel = new sap.ui.model.json.JSONModel({
				currency: "EUR"
			});
			oView.setModel(oViewModel, "view");
    },
    
    _onObjectMatched: function(oEvent) {
			var sId = oEvent.getParameter("arguments").productId;
			this.getView().bindElement("/Products(" + sId + ")");
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
