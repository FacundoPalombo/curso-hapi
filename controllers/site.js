'use strict'
const ask = require('../models').questions
// -------- Handlers -------- //
//---------- Home -------------//
async function home(req, h) {
  let data;
  try {
    data = await questions.getLast()
  } catch (error) {
    console.error(error)
  }
  return h.view('index', {
    title: 'home',
    user: req.state.user,
    questions: data
  })
}

//---------- Register -------------//
function register(req, h) {
  if (req.state.user) {
    return h.redirect('/')
  }
  return h.view('register', {
    title: 'Registro',
    user: req.state.user
  })
}

//---------- Login -------------//
function login(req, h) {
  if (req.state.user) {
    return h.redirect('/')
  }
  return h.view('login', {
    title: 'Ingrese',
    user: req.state.user
  })
}

//---------- Error404 -------------//
function notFound(req, h) {
  return h.view('404', {}, {
    layout: 'error-layout'
  }).code(404)
}
//---------- Error404 inert -------------//
function fileNotFound(req, h) {
  const res = req.response;
  if(res.isBoom && res.output.statusCode == 404) {
    return h.view('404', {}, {
      layout: 'error-layout'
    }).code(404)
  }
  return h.continue
}

//---------- Asks -------------//
function ask (req, h) {
  if(!req.state.user) {
    return h.redirect('/login')
  }
  return h.view('ask', {
    title: 'Crear pregunta',
    user: req.state.user
  })
}
module.exports = {
  home: home,
  login: login,
  register: register,
  notFound: notFound,
  fileNotFound: fileNotFound,
  ask: ask
}