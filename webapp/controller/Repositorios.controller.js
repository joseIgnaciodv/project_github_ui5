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

        return Controller.extend("projectgithubui5.controller.Repositorios", {
            getRouter: function(){
                return sap.ui.core.UIComponent.getRouterFor(this); 
            },
            onInit: function () {
                this.getRouter().getRoute("Repositorios").attachPatternMatched(this.onObjectMatched.bind(this), this);
            },
            onObjectMatched: function(oEvent){
                let oModel = new sap.ui.model.json.JSONModel();
                let user = oEvent.mParameters.arguments.user_name
                globalUser = user
                let reposUrl = "https://api.github.com/users/" + user + "/repos"
                fetch(reposUrl).then((response) => response.json()).then((data) => {
                    oModel.setData(data)
                    this.getView().setModel(oModel)
                })
            },

            viewRepo: function(oEvent){
                let repoName = oEvent.getSource().getTitle()
                let url = "https://github.com/" + globalUser + "/" + repoName 
                URLHelper.redirect(url, false)
            }
        });
    });
