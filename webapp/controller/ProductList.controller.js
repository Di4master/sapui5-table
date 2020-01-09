sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/json/JSONModel",
], function (Controller, JSONModel) {
	"use strict";

	return Controller.extend("sap.ui.task.table.controller.ProductList", {

		onInit: function() {
			var oComp = this.getOwnerComponent();
			var oModel = oComp.getModel("prods");
			var oView = this.getView();
			var getProducts = this.getProducts.bind(this);
			var sContentDensityClass = this.getOwnerComponent().getContentDensityClass();
			var oPageNav = oView.byId("pageNav");
					oPageNav.setContentDensityClass(sContentDensityClass);

			oModel.read("/Products", {
				success: function(oData) {
					var oModel = new JSONModel();
					oModel.setData(oData);
					oComp.setModel(oModel, "products");
					getProducts(1);

					oPageNav.bindData();
				}
			});
		},

		getProducts: function(currentPage) {
			var oModel = new JSONModel();
			var oData = this.getOwnerComponent().getModel("products").getData().results;

			var itemsOnPage = 5;
			var oCurrentPageData = [];
			
			for (var i = itemsOnPage * (currentPage - 1); i < itemsOnPage * currentPage; i++) {
				if (oData[i]) {
					oCurrentPageData.push(oData[i]);
				}
			}
			oModel.setData(oCurrentPageData);
			this.getOwnerComponent().setModel(oModel);
		},

    onListItemPress: function(oEvent) {
			var oItem = oEvent.getParameter("listItem");
			var oItemContext = oItem.getBindingContext();
			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			oRouter.navTo("product", {
				productId: oItemContext.getProperty("ProductID")
			});
		},

		onPageChange: function(oEvent) {
			var iCurrentPage = oEvent.getParameter("value");
			this.getProducts(iCurrentPage);
		}
	});
});
