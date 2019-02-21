'use strict'

module.exports = {
    createUser: createUser
}

function createUser(req, h) {
    console.log(req.payload)
    return 'usuario creado'
}