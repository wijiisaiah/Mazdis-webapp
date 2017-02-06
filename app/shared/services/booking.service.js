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
var booking_1 = require("../model/booking");
var Time_1 = require("../util/Time");
var Observable_1 = require("rxjs/Observable");
var BookingService = (function () {
    function BookingService(fire, us) {
        this.fire = fire;
        this.us = us;
        this.databaseRef = this.fire.database.ref('/users');
        var curUser = this.fire.auth.currentUser;
        this.currentUserRef = this.databaseRef.child(curUser.uid);
    }
    /* Listens for bookings added to user -> bookings in the database
    * Returns an Observable with the newly added booking
    */
    BookingService.prototype.getAddedBookings = function () {
        var bookingsRef = this.currentUserRef.child('bookings');
        return Observable_1.Observable.create(function (obs) {
            bookingsRef.on('child_added', function (booking) {
                var newBooking = booking.val();
                obs.next(newBooking);
            }, function (err) {
                obs.throw(err);
            });
        });
    };
    /* Listens for changes to user -> current booking in the database
   * Returns an Observable with the updated current booking
   */
    BookingService.prototype.getUpdatedBooking = function () {
        var currentBookingRef = this.currentUserRef.child('current booking');
        return Observable_1.Observable.create(function (obs) {
            currentBookingRef.on('child_changed', function (booking) {
                var updatedBooking = booking.val();
                obs.next(updatedBooking);
            }, function (err) {
                obs.throw(err);
            });
        });
    };
    /* Creates a new booking in user -> current booking in the database. It sets
    * the bookings start time, date and parking station.
    */
    BookingService.prototype.createBooking = function (parkingStation) {
        var t = new Time_1.Time();
        var date = t.getCurrentDate();
        var startTime = t.getCurrentTime();
        var newBooking = new booking_1.Booking(parkingStation, date, startTime);
        var currentBookingRef = this.currentUserRef.child('current booking');
        currentBookingRef.set({
            ParkingStation: parkingStation,
            date: date,
            startTime: startTime
        })
            .catch(function (err) { return console.error("Unable to add Booking", err); });
    };
    /* Sets the end time and cost of the current booking in
    * user -> current booking in the database
    */
    BookingService.prototype.updateCurrentBooking = function () {
        var t = new Time_1.Time();
        var endTime = t.getCurrentTime();
        var cost = 5;
        var currentBookingRef = this.currentUserRef.child('current booking');
        currentBookingRef.set({
            endTime: endTime,
            cost: cost
        })
            .catch(function (err) { return console.error("Unable to update current booking -", err); });
    };
    /* Takes a booking as an argument and adds it to the database
    *  under user -> bookings.
    */
    BookingService.prototype.addBooking = function (booking) {
        var bookingsRef = this.currentUserRef.child('bookings');
        console.log("bookingsRef created");
        var ref = bookingsRef.push();
        console.log("Pushed to bookingsRef");
        ref.set({
            ParkingStation: booking.parkingStation,
            date: booking.date,
            startTime: booking.startTime,
            endTime: booking.endTime,
            cost: booking.totalCost
        })
            .catch(function (err) { return console.error("Unable to add Booking", err); });
    };
    /*
    * Deletes the current booking from the database under user -> current booking.
    */
    BookingService.prototype.removeCurrentBooking = function () {
        var currentBookingRef = this.currentUserRef.child('current booking');
        currentBookingRef.remove();
    };
    BookingService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [firebase_config_service_1.FirebaseConfigService, user_service_1.UserService])
    ], BookingService);
    return BookingService;
}());
exports.BookingService = BookingService;
//# sourceMappingURL=booking.service.js.map