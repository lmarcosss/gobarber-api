"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var tsyringe_1 = require("tsyringe");
var BCriptyHashProvider_1 = __importDefault(require("@modules/users/providers/HashProvider/implementations/BCriptyHashProvider"));
tsyringe_1.container.registerSingleton('HashProvider', BCriptyHashProvider_1.default);
