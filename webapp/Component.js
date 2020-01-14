sap.ui.define([
  "sap/ui/core/UIComponent"
], function(UIComponent) {
  "use strict";
  
  return UIComponent.extend("sap.ui.task.table.Component", {
    
    metadata: {
      manifest: "json"
    },

    init: function() {
      UIComponent.prototype.init.apply(this, arguments);
      this.getRouter().initialize();

      this.getProductsModel.bind(this);
    },

    getProductsModel: function() {
      var oComp = this;
      return new Promise(function(resolve) {
        if ( oComp.getModel("products")) {
          resolve(oComp.getModel("products"));
        } else {
          oComp.getModel("prods").read("/Products", {
            success: function(oData) {
              var oModel = new sap.ui.model.json.JSONModel();
              oModel.setData(oData);
              oComp.setModel(oModel, "products");
              resolve(oComp.getModel("products"));
            }
          });
        }
      })
    },

		getContentDensityClass : function() {
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
