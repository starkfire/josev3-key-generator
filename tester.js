const {
    generateJoseSecret,
    generateJoseKeyPair,
    writeToFile
} = require('./generate')

// generate a secret key (buffer)
generateJoseSecret('HS256').then(key => {
    console.log(key)
})

// generate a secret key (hex)
generateJoseSecret('HS256', hex=true).then(key => {
    console.log(key)
})

// generate a secret key and write the output to a file
generateJoseSecret('HS256', hex=true).then(key => {
    writeToFile('secret.txt', key)
})

// generate a key pair (private and public key)
generateJoseKeyPair('ES256', format='pem').then((keys) => {
    // private key
    console.log(keys.privateKey)
    // public key
    console.log(keys.publicKey)
})