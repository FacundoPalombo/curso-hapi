'use strict'

const hapi = require('hapi')

const server = hapi.server({
    port: process.env.PORT || 4200,
    host: 'localhost'
})

async function init() {
    server.route({
        method: 'GET',
        path: '/',
        handler: (req, h) => {
            return h.response('h mundo').code(200)
        }
    })
    server.route({
        method: 'GET',
        path: '/redirect',
        handler: (req, h) => {
            return h.redirect('localhost:4200/')
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