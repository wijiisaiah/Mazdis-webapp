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
var core_1 = require('@angular/core');
var firebase_config_service_1 = require('../../core/service/firebase-config.service');
var user_service_1 = require("./user.service");
var parkingStation_service_1 = require("./parkingStation.service");
var email_service_1 = require("./email.service");
var PaymentService = (function () {
    function PaymentService(fire, us, parkingService, emailService) {
        this.fire = fire;
        this.us = us;
        this.parkingService = parkingService;
        this.emailService = emailService;
        this.databaseRef = this.fire.database;
        this.getCurrentUser();
    }
    PaymentService.prototype.getCurrentUser = function () {
        var _this = this;
        this.us.getCurrentUser()
            .subscribe(function (user) {
            _this.curUser = user;
        });
    };
    PaymentService.prototype.createCustomer = function (token) {
        var customerRef = this.databaseRef.ref('billing').child('new customer');
        customerRef.push({
            uid: this.curUser.uid,
            email: this.curUser.email,
            tokenId: token.id
        });
    };
    PaymentService.prototype.chargeCustomer = function (amount) {
        var customerRef = this.databaseRef.ref('billing').child('charge customer');
        customerRef.push({
            customerId: this.curUser.customerId,
            amount: amount
        });
    };
    PaymentService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [firebase_config_service_1.FirebaseConfigService, user_service_1.UserService, parkingStation_service_1.ParkingService, email_service_1.EmailService])
    ], PaymentService);
    return PaymentService;
}());
exports.PaymentService = PaymentService;
//# sourceMappingURL=payment.service.js.map