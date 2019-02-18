'use strict'

const hapi = require('hapi')
const inert = require('inert')
const path = require('path')

const server = hapi.server({
    port: process.env.PORT || 4200,
    host: 'localhost',
    routes: {
        files: {
            relativeTo: path.join(__dirname, 'public')
        }
    }
})

async function init() {
    server.route({
        method: 'GET',
        path: '/',
        handler: (req, h) => {
            return h.file('index.html')
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
        await server.register(inert)


        server.route({
            method: 'GET',
            path: '/{param*}',
            handler:  {
                directory: {
                    path: '.',
                    index: ['index.html']
                }
            }
        })

        await server.start()
    } catch (error) {
        console.error(error)
        process.exit(1)
    }

    console.log(`Server launched at ${server.info.uri}`)
}

init()