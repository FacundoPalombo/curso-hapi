'use strict'

const hapi = require('hapi')
const inert = require('inert')
const path = require('path')
const handlebars = require('handlebars')
const vision = require('vision')
const routes = require('./routes')

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
    try {
        await server.register(inert)
        await server.register(vision)
        server.state('user', {
            ttl: 1000 * 60 * 60 * 24 * 7,
            isSecure: process.env.NODE_ENV === 'prod',
            encoding: 'base64json',
            path: '/'
        })
        server.views({
            engines: {
                hbs: handlebars
            },
            relativeTo: __dirname,
            path: 'views',
            layout: true,
            layoutPath: 'views'
        })
        server.route(routes)
        await server.start()
    } catch (error) {
        console.error(error)
        process.exit(1)
    }

    console.log(`Server launched at ${server.info.uri}`)
}

init()