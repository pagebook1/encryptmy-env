"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const yargs_1 = __importDefault(require("yargs"));
const Encrypt_1 = __importDefault(require("../src/Encrypt"));
const ConvertToEnv_1 = __importDefault(require("../src/ConvertToEnv"));
yargs_1.default
    .command('encrypt', 'Encrypt data', (yargs) => {
    return yargs.positional('file', {
        alias: 'f',
        describe: 'Data to encrypt',
        type: 'string',
    })
        .option('key', {
        alias: 'k',
        describe: 'Encryption key',
        type: 'string',
    });
}, (argv) => {
    var _a;
    const encryptedData = (0, Encrypt_1.default)({ filePath: argv.data ? argv.data : '.env', key: (_a = process.env.ENV_ENC_KEY) !== null && _a !== void 0 ? _a : argv.key });
    console.log('Encrypted data:', encryptedData);
})
    .command('decrypt', 'Convert data to environment variable format', (yargs) => {
    return yargs.option('file', {
        alias: 'f',
        describe: 'Data to convert',
        type: 'string',
    })
        .option('key', {
        alias: 'k',
        describe: 'Encryption key',
        type: 'string',
    });
}, (argv) => {
    const envData = (0, ConvertToEnv_1.default)({ filePath: argv.data ? argv.data : '.env_enc', encryptionKey: argv.key });
    console.log('ENV PATH:', envData);
})
    .demandCommand()
    .help()
    .argv;
