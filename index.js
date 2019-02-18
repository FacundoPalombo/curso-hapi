'use strict'

const hapi = require('hapi')

const server = hapi.server({
    port: process.env.PORT || 4200,
    host: localhost
})

async function init() {
    server.route({
        method: 'GET',
        path: '/',
        handler: (req, h) => {
            return 'Hello world!'
        }
    })
    try {
        await server.start()
    } catch (error) {
        console.error(error)
        process.exit(1)
    }

    console.log(`Server launched at ${server.info.uri}`)
}

init()