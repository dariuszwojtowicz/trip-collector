"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Trips = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
exports.Trips = mongoose_1.default.model('Trips', new mongoose_1.default.Schema({
    name: String
}));
