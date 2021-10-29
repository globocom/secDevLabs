var crypto = require('crypto')


function hash(password, salt) {
    const derivedKey = crypto.pbkdf2Sync(password, salt, 5000, 32, 'sha512')
    return derivedKey.toString('hex')
}

function generateSalt(){
    return crypto.randomBytes(16)
}

module.exports = {
    generateSalt,
    hash
}