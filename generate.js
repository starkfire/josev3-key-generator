const fs = require('fs')
const { default: generateKeyPair } = require('jose/util/generate_key_pair')
const { default: generateSecret } = require('jose/util/generate_secret')

const { SYNC_ALGS, ASYNC_ALGS, RSA_ALGS, EC_ALGS } = require('./algorithms')

/**
 * generates a secret key and returns it in buffer or hex format 
 * (if hex argument is true)
 * 
 * @param {string} alg Symmetric Algorithm
 * @param {boolean} [hex] If set to true, secret key will be returned in hex format.
 * Otherwise, it will be returned as buffer.
 * @returns {(Buffer| string)} secret key
 */
async function generateJoseSecret(alg, hex=false) {
    if (!SYNC_ALGS.includes(alg)) {
        console.error('Invalid symmetric algorithm')
    }

    let secret = await generateSecret(alg)

    secret = hex ? secret.export().toString('hex') : secret.export()
    
    return secret
}

/**
 * generates a private and public key
 * 
 * @param {string} alg Asymmetric Algorithm
 * @param {string} format Export format (can be 'pem' or 'der')
 */
async function generateJoseKeyPair(alg, format='pem') {
    let pubKeyExportType, pvtKeyExportType
    
    const valid_formats = ['pem', 'der']
    if (!valid_formats.includes(format)) {
        console.error('Invalid Export Format (must be "pem" or "der"')
    }

    if (!ASYNC_ALGS.includes(alg)) {
        console.error('Invalid asymmetric algorithm')
    }

    pubKeyExportType = RSA_ALGS.includes(alg) ? 'pkcs1' : 'spki'
    
    if (pubKeyExportType == 'pkcs1') {
        pvtKeyExportType = pubKeyExportType
    } else {
        pvtKeyExportType = EC_ALGS.includes(alg) ? 'sec1' : 'pkcs8'
    }

    let { publicKey, privateKey } = await generateKeyPair(alg)

    publicKey = publicKey.export({ type: pubKeyExportType, format: format }).toString('hex')
    privateKey = privateKey.export({ type: pvtKeyExportType, format: format }).toString('hex')

    return { publicKey, privateKey }
}

/*
    write the key to a file
*/
function writeToFile(filename, key) {
    fs.writeFileSync(filename, key, (err) => {
        if (err) console.error(err)
        console.log('write success')
    })
}

module.exports = {
    generateJoseKeyPair,
    generateJoseSecret,
    writeToFile
}