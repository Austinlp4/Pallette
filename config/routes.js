const axios = require('axios');
const db = require('../database/dbConfig');
const { authenticate } = require('./middleware');
const bcrypt = require('bcryptjs');

const jwt = require('jsonwebtoken');

const jwtKey = require('../_secrets/keys').jwtKey;

module.exports = server => {
  server.post('/api/register', register);
  server.post('/api/login', login);
};

function register(req, res) {
  // implement user registration
  const credentials = req.body;

    const hash = bcrypt.hashSync(credentials.password, 10);
    credentials.password = hash;

    db('users')
      .insert(credentials)
      .then(ids => {
          const id = ids[0];
          res.status(201).json({ newUserId: id });
      })
      .catch(err => {
          res.status(500).json(err);
      });
}

function login(req, res) {
  // implement user login
  const creds = req.body;

    db('users')
      .where({ username: creds.username })
      .first()
      .then(user => {
          if(user && bcrypt.compareSync(creds.password, user.password)) {
              const token = generateToken(user);
              res.status(200).json({ welcome: user.username, token });
          } else {
              res.status(401).json({ message: 'You have been denied access' });
          }
      })
      .catch(err => {
          res.status(500).json({ err })
      });
}


function generateToken(user) {
  const jwtPayload = {
      ...user, 
      hello: 'User',
      role: 'admin'
  };

  const jwtOptions = {
      expiresIn: '5m',
  }

  return jwt.sign(jwtPayload, jwtKey, jwtOptions);
}