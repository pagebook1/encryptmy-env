import crypto from 'crypto';
import fs from 'fs';
import dotenv from 'dotenv';
dotenv.config();
import Encrypt from '../src/Encrypt';
export default ({ filePath, key } : { filePath: string, key: string | undefined }) => {
    try {
        const algorithm = 'aes-256-cbc';
        const inputEncoding = 'utf8';
        const outputEncoding = 'hex';

        const iv = crypto.scryptSync(key || '1234', 'salt', 16);
        const _key = crypto.scryptSync(key || '1234', 'salt', 32);
        const cipher = crypto.createCipheriv(algorithm, _key, iv);

        const input = fs.readFileSync(filePath, inputEncoding);
        const encrypted = cipher.update(input, inputEncoding, outputEncoding) + cipher.final(outputEncoding);
        console.log(encrypted)
        fs.writeFileSync(".env_enc", encrypted);
    } catch (e) {
        console.log(e)
    }
}
// Encrypt({ filePath: '.env', key: process.env.ENV_ENC_KEY })