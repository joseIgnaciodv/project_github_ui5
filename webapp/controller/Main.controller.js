sap.ui.define([
    "sap/ui/core/mvc/Controller",
    'sap/m/MessageToast'
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, MessageToast) {
        "use strict";

        return Controller.extend("projectgithubui5.controller.Main", {
            onInit: function () {

            },
            navigateTo: function(){
                let user = this.getView().byId('user').getValue()
                let oRouter = sap.ui.core.UIComponent.getRouterFor(this);
                oRouter.navTo("Repositorios", {'user_name': user})
            },
            navigateOrgs: function(){
                let user = this.getView().byId('user').getValue()
                let oRouter = sap.ui.core.UIComponent.getRouterFor(this);
                oRouter.navTo("Organizaciones", {'user_name': user})
            },
            getUser: function(){
                let user = this.getView().byId('user').getValue()
                fetch("https://api.github.com/users/" + user).then((response) => response.json()).then((data) => {
                    if(user == "" || data.message == "Not Found"){
                        MessageToast.show("No existe el usuario")
                        this.getView().byId('_IDGenVBox1').setVisible(false)
                    }else{
                        this.getView().byId('_IDGenVBox1').setVisible(true)
                    }
                })
            }
        });
    });
