"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongodb_memory_server_1 = require("mongodb-memory-server");
const fs_1 = __importDefault(require("fs"));
async function main() {
    const mongod = await mongodb_memory_server_1.MongoMemoryServer.create();
    const uri = mongod.getUri();
    console.log('MongoDB Memory Server started at', uri);
    // write URI to file for other scripts to consume
    try {
        fs_1.default.writeFileSync('.mongo_uri', uri, { encoding: 'utf8' });
        console.log('Wrote .mongo_uri');
    }
    catch (e) {
        console.error('Failed to write .mongo_uri:', e);
    }
    process.on('SIGINT', async () => {
        console.log('Stopping in-memory MongoDB');
        await mongod.stop();
        process.exit(0);
    });
    // keep process alive
    await new Promise(() => { });
}
main().catch((err) => {
    console.error('start-mongo error:', err);
    process.exit(1);
});
