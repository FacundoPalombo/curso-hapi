'use strict'

const users = require('../models/index').users
const Boom = require('boom')
//Register
async function createUser(req, h) {
  let result
  try {
    result = await users.create(req.payload)
  } catch (error) {
    console.error(error)
    return h.view('register', {
      title: 'Registro',
      error: 'Error creando el usuario',

    })
  }

  return h.view('register', {
    title: 'Registro',
    success: 'Usuario creado exitosamente',
  })
}

//Logout
async function logout(req, h) {
  return h.redirect('/login').unstate('user')
}
//User validation
async function validateUser(req, h) {
  let result
  try {
    result = await users.validateUser(req.payload)
    if (!result) {
      return h.view('login', {
        title: 'Login',
        error: 'Email y/o contraseña incorrecta',
      })
    }
  } catch (error) {
    console.error(error)
    return h.view('login', {
      title: 'Login',
      error: 'Problemas validando el usuario',
    })
  }
  return h.redirect('/')
  .state('user', {
    name: result.name,
    email: result.email
  });
}

async function failValidation(req, h, error) {
  const templates = {
    '/create-user': 'register',
    '/validate-user': 'login'
  }
  return h.view(templates[req.path], {
    title: 'Error de validacion',
    error: 'Por favor complete los campos solicitados.'
  }).code(400).takeover()
}

module.exports = {
  createUser: createUser,
  validateUser: validateUser,
  logout: logout,
  failValidation: failValidation
}