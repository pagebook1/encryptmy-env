import fs from 'fs';
import crypto from 'crypto';
/**
 * Decrypts an environment file.
 *
 * @param {Object} params - The parameters for the function.
 * @param {string} params.filePath - The path to the file to decrypt.
 * @param {string} [params.encryptionKey] - The encryption key to use. If not provided, a default key will be used.
 */
export default ({filePath, encryptionKey }: {filePath: string, encryptionKey: string | undefined}) => {
    try {
        const encryptedData = fs.readFileSync(filePath, 'utf8');
        const algorithm = 'aes-256-cbc';

        const key = crypto.scryptSync(encryptionKey || '1234', 'salt', 32);
        const _iv = crypto.scryptSync(encryptionKey || '1234', 'salt', 16);
        const inputEncoding = 'utf8';
        const outputEncoding = 'hex';
        const decipher = crypto.createDecipheriv(algorithm, key, _iv);
        let decryptedData = decipher.update(encryptedData, outputEncoding, inputEncoding);
        decryptedData += decipher.final(inputEncoding);
        fs.writeFileSync(".env", decryptedData)
        
       //return location of .env file
       return process.cwd() + '/.env';
    } catch (error) {
        throw new Error(`Decryption failed: ${error}` );
    }
}
// decryptEnvFile(".env_enc", '@LCGCit123', '@LCGCit123');