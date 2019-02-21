'use strict'
const site = require('./public/controllers/site')
const user = require('./public/controllers/user')
module.exports = [
    server.route({
        method: 'GET',
        path: '/',
        handler: site.home
    }),
    server.route({
        method: 'GET',
        path: '/register',
        handler: site.register
    }),
    server.route({
        method: 'POST',
        path: '/create-user',
        handler: user.createUser
    }),
    server.route({
        method: 'GET',
        path: '/{param*}',
        handler: {
            directory: {
                path: '.',
                index: ['index.html']
            }
        }
    })
];