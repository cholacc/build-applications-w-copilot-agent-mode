"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DB_NAME = exports.MONGO_URI = exports.mongoose = void 0;
exports.connectDatabase = connectDatabase;
exports.disconnectDatabase = disconnectDatabase;
const mongoose_1 = __importDefault(require("mongoose"));
exports.mongoose = mongoose_1.default;
const DB_NAME = process.env.DB_NAME || 'octofit_db';
exports.DB_NAME = DB_NAME;
const MONGO_URI = process.env.MONGO_URI || `mongodb://localhost:27017/${DB_NAME}`;
exports.MONGO_URI = MONGO_URI;
async function connectDatabase() {
    return mongoose_1.default.connect(MONGO_URI).then(() => {
        console.log(`Connected to MongoDB database ${DB_NAME} at ${MONGO_URI}`);
        return mongoose_1.default;
    });
}
async function disconnectDatabase() {
    await mongoose_1.default.disconnect();
    console.log('Disconnected from MongoDB');
}
