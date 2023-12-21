"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.decryptEnvFile = void 0;
const fs_1 = __importDefault(require("fs"));
const crypto_1 = __importDefault(require("crypto"));
function decryptEnvFile({ filePath, encryptionKey }) {
    try {
        const encryptedData = fs_1.default.readFileSync(filePath || '.env_enc', 'utf8');
        const algorithm = 'aes-256-cbc';
        const key = crypto_1.default.scryptSync(encryptionKey || '1234', 'salt', 32);
        const _iv = crypto_1.default.scryptSync(encryptionKey || '1234', 'salt', 16);
        const inputEncoding = 'utf8';
        const outputEncoding = 'hex';
        const decipher = crypto_1.default.createDecipheriv(algorithm, key, _iv);
        let decryptedData = decipher.update(encryptedData, outputEncoding, inputEncoding);
        decryptedData += decipher.final(inputEncoding);
        const envVariables = decryptedData.split('\n');
        envVariables.forEach((envVariable) => {
            // Ignore comments
            if (envVariable.startsWith('#')) {
                return;
            }
            let [key, value] = envVariable.split('=');
            key = key.trim(); // Remove spaces at the start and end
            value = value.trim().replace(/"/g, '').replace(/\r/g, ''); // Remove spaces, quotation marks, and carriage returns
            process.env[key] = value;
        });
    }
    catch (error) {
        console.error('Decryption failed:', error);
    }
}
exports.decryptEnvFile = decryptEnvFile;
// decryptEnvFile(".env_enc", '@LCGCit123', '@LCGCit123');
