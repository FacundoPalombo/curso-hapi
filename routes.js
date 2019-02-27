'use strict'
const site = require('./controllers/site')
const user = require('./controllers/user')
const Joi = require('joi')
const question = require('./controllers/question')

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
        method: 'GET',
        path: '/logout',
        handler: user.logout
    },
    //Ask
    {
        method: 'GET',
        path: '/ask',
        handler: site.ask
    },
    
    {
        path: '/create-question',
        method: 'POST',
        options: {
            validate: {
                payload: {
                    title: Joi.string().required().min(10),
                    description: Joi.string().required().min(10)
                },
                failAction: user.failValidation
            }
        },
        handler: question.createQuestion
    },
    {
        method: 'GET',
        path: '/question/{id}',
        handler: site.viewQuestion
    },
//--------------- DANGER  Last routes -------------------//
    {
        method: 'GET',
        path: '/assets/{param*}',
        handler: {
            directory: {
                path: '.',
                index: ['index.html']
            }
        }
    },
    {
        method: ['GET','POST'],
        path: '/{any*}',
        handler: site.notFound
    }
];