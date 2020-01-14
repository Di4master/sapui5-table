sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/json/JSONModel"
], function (Controller, JSONModel) {
	"use strict";

	return Controller.extend("sap.ui.task.table.controller.ProductList", {

		onInit: function() {
			var oView = this.getView();
			var sContentDensityClass = this.getOwnerComponent().getContentDensityClass();
			var oPageNav = oView.byId("pageNav");
			oPageNav.setContentDensityClass(sContentDensityClass);

			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			oRouter.getRoute("productlist").attachMatched(this._onRouteMatched, this);
		},

		_onRouteMatched: function(oEvent) {
			this._oRouterArgs = oEvent.getParameter("arguments");
			this._oRouterArgs.query = this._oRouterArgs["?query"] || null;
			if (this._oRouterArgs.query && !this._oRouterArgs.query.hasOwnProperty("page")) {
				this.navToNotFound();
			};
			var currentPage = this._oRouterArgs.query ? this._oRouterArgs.query.page : 1;
			this.getProducts(currentPage);
			this.bindPageNavData(currentPage);
		},

		bindPageNavData: function(iPage) {
			var oPageNav =  this.getView().byId("pageNav");
			this.getOwnerComponent().getProductsModel()
				.then(function(resolve) {
					oPageNav.bindData(resolve, +iPage);
				});
		},

		getProducts: function(currentPage) {
			var itemsOnPage = 5;
			var oCurrentPageData = [];
			var oModel = new JSONModel();
			var oComp = this.getOwnerComponent();
			var navToNotFound = this.navToNotFound.bind(this);
			oComp.getProductsModel()
				.then(function(resolve) {
					var oData = resolve.getData().results;
					for (var i = itemsOnPage * (currentPage - 1); i < itemsOnPage * currentPage; i++) {
						if (oData[i]) {
							oCurrentPageData.push(oData[i]);
						}
					}
					if (oCurrentPageData.length < 1) {
						navToNotFound();
					}
					oModel.setData(oCurrentPageData);
					oComp.setModel(oModel);
				});
		},

		navToNotFound: function() {
			var oRouter = sap.ui.core.UIComponent.getRouterFor(this)
			oRouter.getTargets().display("notFound");
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

			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			oRouter.navTo("productlist", {
				query : {
					page : iCurrentPage
				}
			});
		},

		onNavBack: function() {
			var oRouter = sap.ui.core.UIComponent.getRouterFor(this)
			oRouter.navTo("home");
		}
	});
});
