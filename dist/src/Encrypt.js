"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const crypto_1 = __importDefault(require("crypto"));
const fs_1 = __importDefault(require("fs"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
exports.default = ({ filePath, key }) => {
    try {
        const algorithm = 'aes-256-cbc';
        const inputEncoding = 'utf8';
        const outputEncoding = 'hex';
        const iv = crypto_1.default.scryptSync(key || '1234', 'salt', 16);
        const _key = crypto_1.default.scryptSync(key || '1234', 'salt', 32);
        const cipher = crypto_1.default.createCipheriv(algorithm, _key, iv);
        const input = fs_1.default.readFileSync(filePath, inputEncoding);
        const encrypted = cipher.update(input, inputEncoding, outputEncoding) + cipher.final(outputEncoding);
        console.log(encrypted);
        fs_1.default.writeFileSync(".env_enc", encrypted);
    }
    catch (e) {
        console.log(e);
    }
};
// Encrypt({ filePath: '.env', key: process.env.ENV_ENC_KEY })
