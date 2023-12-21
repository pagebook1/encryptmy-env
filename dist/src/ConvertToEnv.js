"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const crypto_1 = __importDefault(require("crypto"));
/**
 * Decrypts an environment file.
 *
 * @param {Object} params - The parameters for the function.
 * @param {string} params.filePath - The path to the file to decrypt.
 * @param {string} [params.encryptionKey] - The encryption key to use. If not provided, a default key will be used.
 */
exports.default = ({ filePath, encryptionKey }) => {
    try {
        const encryptedData = fs_1.default.readFileSync(filePath, 'utf8');
        const algorithm = 'aes-256-cbc';
        const key = crypto_1.default.scryptSync(encryptionKey || '1234', 'salt', 32);
        const _iv = crypto_1.default.scryptSync(encryptionKey || '1234', 'salt', 16);
        const inputEncoding = 'utf8';
        const outputEncoding = 'hex';
        const decipher = crypto_1.default.createDecipheriv(algorithm, key, _iv);
        let decryptedData = decipher.update(encryptedData, outputEncoding, inputEncoding);
        decryptedData += decipher.final(inputEncoding);
        fs_1.default.writeFileSync(".env", decryptedData);
        //return location of .env file
        return process.cwd() + '/.env';
    }
    catch (error) {
        throw new Error(`Decryption failed: ${error}`);
    }
};
// decryptEnvFile(".env_enc", '@LCGCit123', '@LCGCit123');
