import fs from 'fs';
import crypto from 'crypto';

export function decryptEnvFile({ filePath, encryptionKey }: { filePath: string, encryptionKey: string | undefined}) {
    try {
        const encryptedData = fs.readFileSync(filePath || '.env_enc', 'utf8');
        const algorithm = 'aes-256-cbc';

        const key = crypto.scryptSync(encryptionKey || '1234', 'salt', 32);
        const _iv = crypto.scryptSync(encryptionKey || '1234', 'salt', 16);
        const inputEncoding = 'utf8';
        const outputEncoding = 'hex';

        const decipher = crypto.createDecipheriv(algorithm, key, _iv);
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
    } catch (error) {
        console.error('Decryption failed:', error);
    }
}
// decryptEnvFile(".env_enc", '@LCGCit123', '@LCGCit123');
