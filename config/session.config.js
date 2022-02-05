const expressSession = require('express-session');
const MongoStore = require('connect-mongo');
const mongoose = require('mongoose')
const User = require('../models/user.model')

const sessionMaxAge = process.env.SESSION_AGE || 7

module.exports.sessionConfig = expressSession({
  secret: process.env.COOKIE_SECRET || 'Super secret (change it!)',
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: false,
    maxAge: 24 * 3600 * 1000 * sessionMaxAge,
    httpOnly: true
  },
  store: new MongoStore({
    mongoUrl: mongoose.connection._connectionString,
    ttl: 24 * 3600 * sessionMaxAge,
  })
})

module.exports.loadUser = (req, res, next) => {
  const userId = req.session.userId;

  if (userId) {
    User.findById(userId)
      .then(user => {
        res.locals.currentUser = user
        req.user = user
        next()
      })
      .catch(err => next(err))
  } else {
    next()
  }
}






























// const expressSession = require('express-session');
// const MongoStore = require('connect-mongo');
// const mongoose = require('mongoose');
// const User = require('./../models/user.model')

// const sessionMaxAge = process.env.SESSION_MAX_AGE || 7

// module.exports.sessionConfig = expressSession({
//   secret: process.env.SUPER_SECRET || 'Super hiper secret(Change it)',
//   resave: false,
//   saveUninitialized: false,
//   cookie: {
//     secure: false,
//     maxAge: 24 * 3600 * 1000 * sessionMaxAge,
//     httpOnly: true
//   },
//   store: new MongoStore({
//     mongoUrl: mongoose.connection._connectionString,
//     ttl:  24 * 3600 * sessionMaxAge,
//   })
// })

// module.exports.loadUser = (req, res, next) => {
//     const userId = req.session.userId

//     if (userId) {
//       User.findById(userId)
//       .then(user => {
//         res.locals.currentUser = user
//         req.user = user
//         next()
//       })
//       .catch(err => next(err))
//     } else {
//       next()
//     }
// }







































// const expressSession = require('express-session');
// const MongoStore = require('connect-mongo');
// const mongoose = require('mongoose');
// const User = require('../models/user.model');

// const sessionMaxAge = Number(process.env.SESSION_MAX_AGE || 7)

// module.exports.sessionConfig = expressSession({
//   secret: process.env.SESSION_SECRET || 'super secret (change it)',
//   resave: false,
//   saveUninitialized: false,
//   cookie: {
//     httpOnly: true,
//     secure: process.env.SESSION_SECURE || false,
//     maxAge: 24 * 3600 * 1000 * sessionMaxAge
//   },
//   store: MongoStore.create({
//     mongoUrl: mongoose.connection._connectionString,
//     ttl: 24 * 3600 * sessionMaxAge
//   })
// });

// module.exports.loadUser = (req, res, next) => {
//   const userId = req.session.userId;

//   if (!userId) {
//     next()
//   } else {
//     User.findById(userId)
//       .then(user => {
//          res.locals.currentUser = user;
//          req.user = user
//          next()
//       })
//       .catch(error => next(error))
//   }
// }