"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
/**
 * Created by Isaiah on 2017-01-31.
 */
var core_1 = require('@angular/core');
var user_authentication_service_1 = require("../users/services/user-authentication.service");
var user_1 = require("../users/model/user");
var MenuComponent = (function () {
    function MenuComponent(uas) {
        this.uas = uas;
        this.currentUser = new user_1.User(null, null, null, null, null);
    }
    MenuComponent.prototype.ngOnInit = function () {
        this.getCurrentUser();
    };
    /* Close when someone clicks on the "x" symbol inside the overlay */
    MenuComponent.prototype.closeNav = function () {
        document.getElementById("myNav").style.width = "0%";
    };
    MenuComponent.prototype.signOut = function () {
        this.uas.signOut();
    };
    MenuComponent.prototype.getCurrentUser = function () {
        var _this = this;
        this.uas.getCurrentUser()
            .subscribe(function (user) {
            _this.currentUser = user;
            console.log("Current user - ", _this.currentUser);
        }, function (err) {
            console.error("Unable to get current user -", err);
        });
    };
    MenuComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'user-menu',
            templateUrl: 'menu.component.html',
            styleUrls: ['menu.component.css']
        }), 
        __metadata('design:paramtypes', [user_authentication_service_1.UserAuthenticationService])
    ], MenuComponent);
    return MenuComponent;
}());
exports.MenuComponent = MenuComponent;
//# sourceMappingURL=menu.component.js.map