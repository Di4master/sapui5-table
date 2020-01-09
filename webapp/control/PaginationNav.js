sap.ui.define([
  "sap/ui/core/Control",
  "sap/m/Label",
  "sap/m/Button"
], function(Control, Label, Button) {
  'use strict';
  
  return Control.extend("sap.ui.task.table.control.PaginationNav", {
    
    metadata: {
      properties : {
        value: {type : "int", defaultValue : 1},
        maxValue: {type : "int", defaultValue : 1}
			},
      aggregations: {
        _label : {type : "sap.m.Label", multiple: false, visibility : "hidden"},
        _buttonPrev: {type: "sap.m.Button", multiple: false, visibility: "hidden"},
        _buttonNext: {type: "sap.m.Button", multiple: false, visibility: "hidden"}
      },
      events : {
				change : {
					parameters : {
						value : {type : "int"}
					}
				}
			}
    },
    
    init: function() {
      
      this.setAggregation("_label", new Label({
        text: "Нет данных"
      }));
      this.setAggregation("_buttonPrev", new Button({
        press: this._onButtonPrevPress.bind(this),
        icon: "sap-icon://nav-back"
      }).setEnabled(false));
      this.setAggregation("_buttonNext", new Button({
        press: this._onButtonNextPress.bind(this),
        icon: "sap-icon://navigation-right-arrow"
      }).setEnabled(false));
    },

    onBeforeRendering: function() {
      var oResourceBundle = this.getModel("i18n").getResourceBundle();
      var label = this.getAggregation("_label");
      var oModel = this.getModel("products");

      if (oModel) {
        label.setText(oResourceBundle.getText("paginationLabelIndicator",
          [this.getValue(), this.getMaxValue()]));
      }
    },

    setContentDensityClass: function(sContentDensityClass) {
      var sMarginClass = sContentDensityClass === "sapUiSizeCompact" ? "sapUiTinyMargin" : "sapUiSmallMargin";
      this.getAggregation("_label").addStyleClass(sMarginClass);
    },

    bindData: function() {
      var oResourceBundle = this.getModel("i18n").getResourceBundle();
      var label = this.getAggregation("_label");
      var oModel = this.getModel("products");
      var aData = oModel.getData().results;

      var iPagesCount = Math.ceil(aData.length / 5);

      label.setText(oResourceBundle.getText("paginationLabelIndicator",
        [this.getValue(), iPagesCount]));
      this.setMaxValue(iPagesCount);
      if (this.getMaxValue() > 1) {
        this.getAggregation("_buttonNext").setEnabled(true);
      }
      label.setText(oResourceBundle.getText("paginationLabelIndicator",
        [this.getValue(), this.getMaxValue()]));
    },

    renderer: function(oRM, oControl) {
			oRM.write("<div");
			oRM.writeControlData(oControl);
			oRM.addClass("taskTablePaginationNav");
			oRM.writeClasses();
      oRM.write(">");
      oRM.renderControl(oControl.getAggregation("_label"));
			oRM.renderControl(oControl.getAggregation("_buttonPrev"));
			oRM.renderControl(oControl.getAggregation("_buttonNext"));
      oRM.write("</div>");
    },

    _onButtonPrevPress: function(oEvent) {
      var iValue = this.getValue() - 1;
      var ilastPage = this.getMaxValue();
      this.setValue(iValue);
      if (iValue === 1) {
        this.getAggregation("_buttonPrev").setEnabled(false);
      } else if (iValue === ilastPage - 1) {
        this.getAggregation("_buttonNext").setEnabled(true);
      }
      this._onPageChange();
    },

    _onButtonNextPress: function(oEvent) {
      var iValue = this.getValue() + 1;
      var ilastPage = this.getMaxValue();
      this.setValue(iValue);
      if (iValue === ilastPage) {
        this.getAggregation("_buttonNext").setEnabled(false);
      } else if (iValue === 2) {
        this.getAggregation("_buttonPrev").setEnabled(true);
      }
      this._onPageChange();
    },

    _onPageChange: function(oEvent) {
      this.fireEvent("change", {
				value: this.getValue()
			});
    }
  });

});