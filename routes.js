'use strict'
const site = require('./controllers/site')
const user = require('./controllers/user')
const Joi = require('joi')
module.exports = [
    {
        method: 'GET',
        path: '/',
        handler: site.home
    },
    //register
    {
        method: 'GET',
        path: '/register',
        handler: site.register
    },
    {
        method: 'POST',
        options: {
            validate: {
                payload: {
                    name: Joi.string().required().min(3),
                    email: Joi.string().email().required(),
                    password: Joi.string().required().min(8)
                },
                failAction: user.failValidation
            }
        },
        path: '/create-user',
        handler: user.createUser
    },
    //Login
    {
        method: 'GET',
        path: '/login',
        handler: site.login
    },
    {
        path: '/validate-user',
        method: 'POST',
        options: {
            validate: {
                payload: {
                    email: Joi.string().email().required(),
                    password: Joi.string().required().min(8)
                }
            }
        },
        handler: user.validateUser
    },
    //Logout
    {
        path: '/logout',
        method: 'GET',
        handler: user.logout
    },
    {
        method: 'GET',
        path: '/{param*}',
        handler: {
            directory: {
                path: '.',
                index: ['index.html']
            }
        }
    }
];