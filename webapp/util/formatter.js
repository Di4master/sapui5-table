sap.ui.define([], function () {
	"use strict";

	return {

		statusText: function (sStatus) {
			var oResourceBundle = this.getView().getModel("i18n").getResourceBundle();

			switch (sStatus) {
				case true:
					return oResourceBundle.getText("discontinuedTrue");
				case false:
					return oResourceBundle.getText("discontinuedFalse");
				default:
					return sStatus;
			}
		}
	};
});
