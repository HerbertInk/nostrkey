// nostrkey.js
const bip39 = require('bip39');
const nacl = require('tweetnacl');
const naclUtil = require('tweetnacl-util');

document.getElementById('generateBtn').addEventListener('DOMContentLoaded', function() {
    try {
        const { mnemonic, privateKey, publicKey } = generateNostrKeys();
        document.getElementById('mnemonic').innerText = mnemonic;
        document.getElementById('publicKey').innerText = publicKey;
        document.getElementById('privateKey').innerText = privateKey;
        document.getElementById('keysDisplay').style.display = 'block';
    } catch (error) {
        console.error('Error generating keys:', error);
        alert('Failed to generate keys: ' + error.message);
    }
});

function generateNostrKeys() {

    // Convert mnemonic to seed
    const seed = bip39.mnemonicToSeedSync(bip39.generateMnemonic()).slice(0, 32);

    // Generate key pair from seed
    const keyPair = nacl.sign.keyPair.fromSeed(seed);

    // Public key is 32 bytes, convert to hex
    const publicKey = naclUtil.encodeHex(keyPair.publicKey);

    // Private key is also 32 bytes, convert to hex
    const privateKey = naclUtil.encodeHex(keyPair.secretKey);

    return {
        mnemonic: bip39.generateMnemonic(),
        privateKey,
        publicKey
    };
}