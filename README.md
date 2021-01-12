## Asymmetric
### Generate a Key Pair
```js
const { generateJoseKeyPair } = require('./generate')

generateJoseKeyPair('ES256', format='pem').then(keys => {
    console.log(keys.privateKey)
    console.log(keys.publicKey)
})
```
```
-----BEGIN EC PRIVATE KEY-----
MHcCAQEEIB/gHRw6zH5eM/gsEnEOtoMsJJ1hIBd0a1sH80CRX29foAoGCCqGSM49
AwEHoUQDQgAERVaEO2F5lBWz+YyiXbN3aL122u6rNNdD3n1m4IMxGAVPS1aXB/cx
O09MmwrVFxpm5RQ7bYB85/wXECQRPo3FeA==
-----END EC PRIVATE KEY-----

-----BEGIN PUBLIC KEY-----
MFkwEwYHKoZIzj0CAQYIKoZIzj0DAQcDQgAERVaEO2F5lBWz+YyiXbN3aL122u6r
NNdD3n1m4IMxGAVPS1aXB/cxO09MmwrVFxpm5RQ7bYB85/wXECQRPo3FeA==
-----END PUBLIC KEY-----
```
### Generate a Key Pair and Write to File
```js
const { generateJoseKeyPair, writeToFile } = require('./generate')

generateJoseKeyPair('ES256', format='pem').then((keys) => {
    // private key
    writeToFile('private.pem', keys.privateKey)
    // public key
    writeToFile('public.pem', keys.publicKey)
})
```

## Symmetric
### Generate a Secret Key (`Buffer`)
```js
const { generateJoseSecret } = require('./generate')

generateJoseSecret('HS256').then(key => {
    console.log(key)
})
```
```
<Buffer 8e 10 34 88 c2 7c 9f 72 d7 2a d2 ef 2e 24 19 57 dc 8f 30 5a 4f eb 4f 0f ad 90 50 a5 8a b9 ff 76>
```
### Generate a Secret Key (hex)
```js
generateJoseSecret('HS256', hex=true).then(key => {
    console.log(key)
})
```
```
b7b8c009f839860661aa51a70567a60c0645d7588c42e6cfb60a4cae28dd0866
```

### Generate a Secret Key and Write to File
```js
generateJoseSecret('HS256', hex=true).then(key => {
    writeToFile('secret.txt', key)
})
```

## Compatibility
If you want to use PEM files for signing and verifying your JWT/JWE/JWS with JOSEv3, you can use the `convertPEMToKeyObject()` function to convert them to `KeyObject` type:

```js
const { convertPEMToKeyObject } = require('./generator')

const jwt = {
    private: convertPEMToKeyObject('private.pem', 'private'),
    public: convertPEMToKeyObject('public.pem', 'public')
}
```
Once converted, you can now use them with JOSEv3:
```js
const { payload, protectedHeader } = await jwtVerify(token, jwt.public)
```