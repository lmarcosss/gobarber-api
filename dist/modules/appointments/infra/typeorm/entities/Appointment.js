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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var typeorm_1 = require("typeorm");
var User_1 = __importDefault(require("@modules/users/infra/typeorm/entities/User"));
var Appointment = /** @class */ (function () {
    function Appointment() {
    }
    __decorate([
        typeorm_1.PrimaryGeneratedColumn('uuid'),
        __metadata("design:type", String)
    ], Appointment.prototype, "id", void 0);
    __decorate([
        typeorm_1.Column({ name: 'provider_id' }),
        __metadata("design:type", String)
    ], Appointment.prototype, "providerId", void 0);
    __decorate([
        typeorm_1.ManyToOne(function () { return User_1.default; }),
        typeorm_1.JoinColumn({ name: 'provider_id' }),
        __metadata("design:type", User_1.default)
    ], Appointment.prototype, "provider", void 0);
    __decorate([
        typeorm_1.Column('timestamp with time zone'),
        __metadata("design:type", Date)
    ], Appointment.prototype, "date", void 0);
    __decorate([
        typeorm_1.CreateDateColumn({ name: 'created_at', type: 'timestamp' }),
        __metadata("design:type", Date)
    ], Appointment.prototype, "createdAt", void 0);
    __decorate([
        typeorm_1.UpdateDateColumn({ name: 'updated_at', type: 'timestamp' }),
        __metadata("design:type", Date)
    ], Appointment.prototype, "updatedAt", void 0);
    Appointment = __decorate([
        typeorm_1.Entity('appointments')
    ], Appointment);
    return Appointment;
}());
exports.default = Appointment;
