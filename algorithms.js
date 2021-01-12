module.exports = {
    SYNC_ALGS: [
        'HS256', 'HS384', 'HS512',
        'A128KW', 'A192KW', 'A256KW',
        'A128GCMKW', 'A192GCMKW', 'A256GCMKW',
        'A128GCM', 'A192GCM', 'A256GCM',
        'A128CBC-HS256', 'A192CBC-HS384', 'A256CBC-HS512'
    ],
    ASYNC_ALGS: [
        'RS256', 'RS384', 'RS512',
        'PS256', 'PS384', 'PS512',
        'ES256', 'ES256K', 'ES384', 'ES512',
        'EdDSA',
        'RSA-OAEP', 'RSA-OAEP-256', 'RSA-OAEP-384', 'RSA-OAEP-512',
        'RSA1_5',
        'ECDH-ES', 'ECDH-ES+A128KW', 'ECDH-ES+A192KW', 'ECDH-ES+A256KW'
    ],
    RSA_ALGS: [
        'RS256', 'RS384', 'RS512',
        'PS256', 'PS384', 'PS512',
        'RSA-OAEP', 'RSA-OAEP-256', 'RSA-OAEP-384', 'RSA-OAEP-512',
        'RSA1_5'
    ],
    EC_ALGS: [
        'ES256', 'ES256K', 'ES384', 'ES512',
        'ECDH-ES', 'ECDH-ES+A128KW', 'ECDH-ES+A192KW', 'ECDH-ES+A256KW'
    ]
}