sap.ui.define([
    "sap/ui/core/mvc/Controller",
    'sap/m/library',
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, mobileLibrary) {
        "use strict";

        var URLHelper = mobileLibrary.URLHelper;
        var globalUser = ""

        return Controller.extend("projectgithubui5.controller.Organizaciones", {
            getRouter: function(){
                return sap.ui.core.UIComponent.getRouterFor(this); 
            },
            onInit: function () {
                this.getRouter().getRoute("Organizaciones").attachPatternMatched(this.onObjectMatched.bind(this), this);
            },
            onObjectMatched: function(oEvent){
                let oModel = new sap.ui.model.json.JSONModel();
                let user = oEvent.mParameters.arguments.user_name
                globalUser = user
                let orgsUrl = "https://api.github.com/users/" + user + "/orgs"
                fetch(orgsUrl).then((response) => response.json()).then((data) => {
                    oModel.setData(data)
                    this.getView().setModel(oModel)
                })
            },
            navMain: function(){
                let router = sap.ui.core.UIComponent.getRouterFor(this);
                router.navTo('RouteMain') 
            }
        });
    });