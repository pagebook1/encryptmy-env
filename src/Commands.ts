import yargs from 'yargs';
import Encrypt from '../src/Encrypt';
import ConvertToEnv from '../src/ConvertToEnv';

yargs
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
        const encryptedData = Encrypt({  filePath: argv.data ?argv.data as string: '.env', key: process.env.ENV_ENC_KEY ?? argv.key as unknown as string });
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
        const envData = ConvertToEnv({ filePath: argv.data ?argv.data as string: '.env_enc', encryptionKey: (argv.key as unknown as string)});
        console.log('ENV PATH:', envData);
    })
    .demandCommand()
    .help()
    .argv;
