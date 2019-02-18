'use strict'

const hapi = require('hapi')
const inert = require('inert')
const path = require('path')
const handlebars = require('handlebars')
const vision = require('vision')

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
            return h.view('index', {
                title: 'home'
            })
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
        await server.register(vision)

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

        server.views({
            engines: {
                hbs: handlebars
            },
            relativeTo: __dirname,
            path: 'views',
            layout: true,
            layoutPath: 'views'
        })
        await server.start()
    } catch (error) {
        console.error(error)
        process.exit(1)
    }

    console.log(`Server launched at ${server.info.uri}`)
}

init()