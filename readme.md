


 
[![ko-fi](https://ko-fi.com/img/githubbutton_sm.svg)](https://ko-fi.com/pagebook1)  [![GitHub](https://img.shields.io/badge/-GitHub-181717?style=flat-square&logo=GitHub&logoColor=white)](https://github.com/pagebook1/encryptmy-env) 

 # ENCRYPT MY ENV - ENV ENCRYPTOR & DECRYPTOR


This project provides a command-line tool for encrypting and decrypting `.env` files, making it easy to protect sensitive configuration data, especially when storing `.env` files in less secure environments.

## Features:

- Encrypt an `.env` file to a `.env_enc` file.
- Decrypt a `.env_enc` file back to a `.env` file.
- Convert an encrypted file into a decrypted file.

## Installation:

```bash
npm install -g encryptmy-env
```



## Usage:

1. Set the `ENV_ENC_KEY` environment variable to your desired encryption key. You can do this by adding the following line to your `.env` file:

```
ENV_ENC_KEY=<your-desired-encryption-key>
```

```bash
npx encryptmyenv --help
```

### Encrypting an `.env` File:

```bash
npx encryptmyenv encrypt --file <path-to-env-file> --key <encryption-key>
```

### Decrypting a `.env_enc` File:

```bash
npx encryptmyenv decrypt --file <path-to-env-file> --key <encryption-key>
```

Note that the `--key` and `--file` options are optional. If you do not specify the `--key` option, the tool will generate a random encryption key for you. If there is no ENV_ENC_KEY in .env file . If you do not specify the `--file` option, the tool will look for an `.env` file in the root directory.

### SAMPLE

```bash
npx encryptmyenv convert --file '.env' --key 'MYGENERATEDKEY'
```

## HOW TO USE ENCRYPTED ENV ON PROCESS

```bash
import { DecryptEnvFile } from 'encryptmy-env'
DecryptEnvFile({encryptionKey:<your-encryption-key>})
```




